import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  providers: [
    {
      id: "postmark",
      name: "Email",
      type: "email",
      from: process.env.POSTMARK_FROM_EMAIL || "hello@trimdoctor.com",
      maxAge: 60 * 60, // 1 hour
      async sendVerificationRequest({ identifier: email, url }) {
        const apiKey = process.env.POSTMARK_API_KEY;
        if (!apiKey) {
          console.log(`[Auth] Magic link for ${email}: ${url}`);
          return;
        }
        await fetch("https://api.postmarkapp.com/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Postmark-Server-Token": apiKey,
          },
          body: JSON.stringify({
            From: process.env.POSTMARK_FROM_EMAIL || "hello@trimdoctor.com",
            To: email,
            Subject: "Sign in to TrimDoctor",
            HtmlBody: `
              <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
                <h2 style="color: #0B6E4F; margin-bottom: 24px;">Sign in to TrimDoctor</h2>
                <p style="color: #666; line-height: 1.6;">Click the button below to sign in to your patient portal.</p>
                <a href="${url}" style="display: inline-block; background: #0B6E4F; color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; margin: 24px 0;">
                  Sign In
                </a>
                <p style="color: #999; font-size: 13px; margin-top: 32px;">
                  If you didn't request this email, you can safely ignore it.
                  This link expires in 1 hour.
                </p>
              </div>
            `,
            MessageStream: "outbound",
          }),
        });
      },
    },
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/login?verify=1",
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
