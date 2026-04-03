import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { assessments, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sendWelcome } from "@/lib/email";

const assessmentSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  state: z.string().max(2).optional(),
  dateOfBirth: z.string().optional(),
  sex: z.string().optional(),
  heightInches: z.number().optional(),
  weight: z.number().optional(),
  goalWeight: z.number().optional(),
  medication: z.string().min(1),
  conditions: z.array(z.string()).default([]),
  currentMedications: z.string().optional(),
  previousGlp1: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = assessmentSchema.parse(body);

    // Find or create user
    let [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));

    if (!user) {
      [user] = await db
        .insert(users)
        .values({
          email: data.email,
          name: `${data.firstName} ${data.lastName}`,
          phone: data.phone,
          role: "patient",
        })
        .returning();
    }

    // Save assessment
    const [assessment] = await db
      .insert(assessments)
      .values({
        userId: user.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        state: data.state,
        dateOfBirth: data.dateOfBirth,
        sex: data.sex,
        heightInches: data.heightInches,
        weight: data.weight,
        goalWeight: data.goalWeight,
        medication: data.medication,
        conditions: data.conditions,
        currentMedications: data.currentMedications,
        previousGlp1: data.previousGlp1,
        status: "pending",
      })
      .returning();

    // Send welcome email (non-blocking)
    sendWelcome(data.email, data.firstName).catch((err) =>
      console.error("[Assessment] Email error:", err),
    );
    // TODO: submit to OpenLoop Health for physician review

    return NextResponse.json({
      success: true,
      assessmentId: assessment.id,
      message:
        "Assessment received. Physician review within 24-48 hours.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 },
      );
    }
    console.error("[Assessment] Error:", error);
    return NextResponse.json(
      { error: "Failed to process assessment" },
      { status: 500 },
    );
  }
}
