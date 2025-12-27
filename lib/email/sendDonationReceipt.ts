import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function sendDonationReceiptEmail({
  to,
  pdfBuffer,
  receiptNumber,
}: {
  to: string
  pdfBuffer: Buffer
  receiptNumber: string
}) {
  await resend.emails.send({
    from: "Donations <donations@yourdomain.com>",
    to,
    subject: `Donation Receipt – ${receiptNumber}`,
    html: `<p>Thank you for your donation. Please find your receipt attached.</p>`,
    attachments: [
      {
        filename: `receipt-${receiptNumber}.pdf`,
        content: pdfBuffer,
      },
    ],
  })
}
