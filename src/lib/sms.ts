import twilio from "twilio";

function getClient() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token || sid === "ACxxxxxxxxxxxxx") {
    return null;
  }
  return twilio(sid, token);
}

const FROM = process.env.TWILIO_PHONE_NUMBER || "";

export async function sendSMS(to: string, body: string) {
  const client = getClient();
  if (!client) {
    console.log(`[SMS] Would send to ${to}: ${body}`);
    return;
  }

  await client.messages.create({
    from: FROM,
    to,
    body,
  });
}

export async function sendShippedSMS(to: string, name: string, tracking: string) {
  await sendSMS(
    to,
    `Hi ${name}! Your TrimDoctor medication has shipped. Tracking: ${tracking}. Track at trimdoctor.com/portal/shipments`,
  );
}

export async function sendApprovalSMS(to: string, name: string) {
  await sendSMS(
    to,
    `Great news, ${name}! Your TrimDoctor prescription has been approved. Your medication is being prepared. Check your portal for details.`,
  );
}
