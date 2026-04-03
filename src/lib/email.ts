import * as postmark from "postmark";

function getClient() {
  const apiKey = process.env.POSTMARK_API_KEY;
  if (!apiKey || apiKey === "xxxxxxxxxxxxx") {
    return null;
  }
  return new postmark.ServerClient(apiKey);
}

const FROM = process.env.POSTMARK_FROM_EMAIL || "hello@trimdoctor.com";

export async function sendWelcome(email: string, name: string) {
  const client = getClient();
  if (!client) {
    console.log(`[Email] Would send welcome to ${email}`);
    return;
  }

  const templateId = process.env.POSTMARK_TEMPLATE_WELCOME;
  if (templateId) {
    await client.sendEmailWithTemplate({
      From: FROM,
      To: email,
      TemplateId: Number(templateId),
      TemplateModel: { name, product_url: process.env.NEXT_PUBLIC_APP_URL },
    });
  } else {
    await client.sendEmail({
      From: FROM,
      To: email,
      Subject: "Welcome to TrimDoctor!",
      HtmlBody: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="color: #0B6E4F;">Welcome to TrimDoctor, ${name}!</h2>
          <p style="color: #666; line-height: 1.6;">
            Your health assessment has been received. A board-certified physician will review
            your information within 24-48 hours.
          </p>
          <p style="color: #666; line-height: 1.6;">
            We'll notify you by email as soon as your physician completes their review.
          </p>
          <p style="color: #999; font-size: 13px; margin-top: 32px;">
            Questions? Reply to this email or visit <a href="${process.env.NEXT_PUBLIC_APP_URL}">trimdoctor.com</a>.
          </p>
        </div>
      `,
      MessageStream: "outbound",
    });
  }
}

export async function sendApproved(
  email: string,
  name: string,
  medication: string,
) {
  const client = getClient();
  if (!client) {
    console.log(`[Email] Would send approval to ${email}`);
    return;
  }

  const templateId = process.env.POSTMARK_TEMPLATE_APPROVED;
  if (templateId) {
    await client.sendEmailWithTemplate({
      From: FROM,
      To: email,
      TemplateId: Number(templateId),
      TemplateModel: {
        name,
        medication,
        portal_url: `${process.env.NEXT_PUBLIC_APP_URL}/portal`,
      },
    });
  } else {
    await client.sendEmail({
      From: FROM,
      To: email,
      Subject: "You're Approved! - TrimDoctor",
      HtmlBody: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="color: #0B6E4F;">Great news, ${name}!</h2>
          <p style="color: #666; line-height: 1.6;">
            Your physician has approved your prescription for <strong>${medication}</strong>.
            Your medication is now being prepared by our pharmacy partner and will ship within 2-3 business days.
          </p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/portal" style="display: inline-block; background: #0B6E4F; color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; margin: 24px 0;">
            View Your Portal
          </a>
        </div>
      `,
      MessageStream: "outbound",
    });
  }
}

export async function sendShipped(
  email: string,
  name: string,
  trackingNumber: string,
) {
  const client = getClient();
  if (!client) {
    console.log(`[Email] Would send shipped notification to ${email}`);
    return;
  }

  const templateId = process.env.POSTMARK_TEMPLATE_SHIPPED;
  if (templateId) {
    await client.sendEmailWithTemplate({
      From: FROM,
      To: email,
      TemplateId: Number(templateId),
      TemplateModel: {
        name,
        tracking_number: trackingNumber,
        portal_url: `${process.env.NEXT_PUBLIC_APP_URL}/portal/shipments`,
      },
    });
  } else {
    await client.sendEmail({
      From: FROM,
      To: email,
      Subject: "Your Medication Has Shipped! - TrimDoctor",
      HtmlBody: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="color: #0B6E4F;">Your medication is on the way, ${name}!</h2>
          <p style="color: #666; line-height: 1.6;">
            Tracking number: <strong>${trackingNumber}</strong>
          </p>
          <p style="color: #666; line-height: 1.6;">
            Expected delivery: 3-5 business days via priority shipping.
          </p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/shipments" style="display: inline-block; background: #0B6E4F; color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; margin: 24px 0;">
            Track Shipment
          </a>
        </div>
      `,
      MessageStream: "outbound",
    });
  }
}

export async function sendPaymentFailed(email: string, name: string) {
  const client = getClient();
  if (!client) {
    console.log(`[Email] Would send payment failed to ${email}`);
    return;
  }

  await client.sendEmail({
    From: FROM,
    To: email,
    Subject: "Action Required: Payment Failed - TrimDoctor",
    HtmlBody: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #0B6E4F;">Payment Update Needed</h2>
        <p style="color: #666; line-height: 1.6;">
          Hi ${name}, we were unable to process your latest payment. Please update your payment method
          to ensure uninterrupted access to your medication.
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/billing" style="display: inline-block; background: #0B6E4F; color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; margin: 24px 0;">
          Update Payment Method
        </a>
      </div>
    `,
    MessageStream: "outbound",
  });
}
