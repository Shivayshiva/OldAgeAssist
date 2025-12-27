import { resend } from "@/lib/resend"

export async function sendVerificationEmail(
  email: string,
  name: string,
  token: string
) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: "Verify your email address",
    html: `
      <p>Hi ${name},</p>
      <p>Thanks for joining as a volunteer.</p>
      <p>Please verify your email by clicking below:</p>
      <p>
        <a href="${verifyUrl}" style="padding:10px 16px;background:#000;color:#fff;text-decoration:none;">
          Verify Email
        </a>
      </p>
      <p>This link will expire in 24 hours.</p>
    `
  })
}
