import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";

const SYSTEM_PROMPT = `You are the AI customer support agent for TrimDoctor, a telehealth platform for GLP-1 weight loss medication.

KEY FACTS:
- Semaglutide injection: $179 first month, $299/mo ongoing
- Semaglutide tablets: $149 first month, $249/mo ongoing
- Tirzepatide injection: $249 first month, $399/mo ongoing
- Free priority shipping. Arrives 3-5 business days after approval.
- Physician review: 24-48 hours after assessment.
- Cancel anytime. No long-term contracts.
- Refund: Full if not approved. No refund after medication ships.
- Common side effects: nausea, decreased appetite. Usually subside in 1-2 weeks.
- Storage: Refrigerate injectable vials (36-46°F). Tablets at room temp.

RULES:
- Be concise, friendly, professional. 2-3 sentences max.
- For medical concerns: say "I'm connecting you with your care provider" and do NOT give medical advice.
- For billing disputes: empathize, explain policy, offer to connect with billing team.
- Never make up information.`;

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const { messages: chatMessages } = await req.json();

    const latestUserMsg = chatMessages[chatMessages.length - 1];

    // Persist the user message if authenticated
    if (session?.user?.id && latestUserMsg) {
      await db.insert(messages).values({
        userId: session.user.id,
        sender: "patient",
        body: latestUserMsg.content,
      });
    }

    let aiText: string;

    if (process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY !== "sk-ant-xxxxxxxxxxxxx") {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 500,
          system: SYSTEM_PROMPT,
          messages: chatMessages.map((m: { role: string; content: string }) => ({
            role: m.role === "ai" ? "assistant" : "user",
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      aiText = data.content?.[0]?.text || "I'm having trouble responding. Please email help@trimdoctor.com.";
    } else {
      aiText = "Thanks for your message! In production, this connects to Claude AI for instant support. For now, email help@trimdoctor.com for assistance.";
    }

    // Persist the AI response if authenticated
    if (session?.user?.id) {
      await db.insert(messages).values({
        userId: session.user.id,
        sender: "system",
        body: aiText,
      });
    }

    return NextResponse.json({ response: aiText });
  } catch (error) {
    console.error("[Chat] Error:", error);
    return NextResponse.json({
      response: "I'm temporarily unavailable. Please email help@trimdoctor.com.",
    });
  }
}
