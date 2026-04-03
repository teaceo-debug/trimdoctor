import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { subscriptions, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("[Stripe Webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan;
        if (userId && session.subscription) {
          const sub = await stripe.subscriptions.retrieve(
            session.subscription as string,
          );
          await db.insert(subscriptions).values({
            userId,
            stripeSubscriptionId: sub.id,
            stripePriceId: sub.items.data[0]?.price.id,
            plan: plan || "unknown",
            status: "active",
            currentPeriodStart: new Date(sub.start_date * 1000),
            currentPeriodEnd: sub.cancel_at
              ? new Date(sub.cancel_at * 1000)
              : null,
          });
        }
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId =
          invoice.parent?.subscription_details?.subscription;
        if (subId) {
          const id = typeof subId === "string" ? subId : subId.id;
          await db
            .update(subscriptions)
            .set({ status: "active" })
            .where(eq(subscriptions.stripeSubscriptionId, id));
        }
        // TODO: trigger Postmark confirmation email
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId =
          invoice.parent?.subscription_details?.subscription;
        if (subId) {
          const id = typeof subId === "string" ? subId : subId.id;
          await db
            .update(subscriptions)
            .set({ status: "past_due" })
            .where(eq(subscriptions.stripeSubscriptionId, id));
        }
        // TODO: trigger Postmark dunning email
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await db
          .update(subscriptions)
          .set({ status: "canceled", canceledAt: new Date() })
          .where(eq(subscriptions.stripeSubscriptionId, sub.id));
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        await db
          .update(subscriptions)
          .set({
            status: sub.status === "active" ? "active" : "past_due",
            stripePriceId: sub.items.data[0]?.price.id,
          })
          .where(eq(subscriptions.stripeSubscriptionId, sub.id));
        break;
      }

      default:
        console.log("[Stripe Webhook] Unhandled event:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Stripe Webhook] Handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}
