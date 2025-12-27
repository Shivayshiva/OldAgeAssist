import { Resend } from "resend"
import fs from "fs/promises"
import path from "path"

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendInvoiceEmailParams {
  to: string
  donorName: string
  amount: number
  invoiceNumber: string
  pdfPath: string
  transactionId?: string
}

export async function sendInvoiceEmail(
  params: SendInvoiceEmailParams
): Promise<boolean> {
  try {
    // Read PDF file
    const fullPath = path.join(process.cwd(), "public", params.pdfPath)
    const pdfBuffer = await fs.readFile(fullPath)

    // Send email with attachment
    const { data, error } = await resend.emails.send({
      from: "Sirsa Foundation <noreply@sirsafoundation.org>",
      to: params.to,
      subject: `Donation Receipt - ${params.invoiceNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(to right, #2563eb, #7c3aed);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .amount {
                background: white;
                padding: 20px;
                margin: 20px 0;
                border-left: 4px solid #2563eb;
                border-radius: 4px;
              }
              .amount-value {
                font-size: 28px;
                font-weight: bold;
                color: #2563eb;
              }
              .button {
                display: inline-block;
                background: #2563eb;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 6px;
                margin-top: 20px;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
              }
              .tax-note {
                background: #fef3c7;
                border: 1px solid #fbbf24;
                padding: 15px;
                border-radius: 6px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0;">Thank You for Your Donation!</h1>
            </div>
            <div class="content">
              <p>Dear ${params.donorName},</p>
              
              <p>Thank you for your generous donation to Sirsa Foundation. Your contribution makes a significant difference in the lives of our elderly residents.</p>
              
              <div class="amount">
                <div style="color: #6b7280; font-size: 14px; margin-bottom: 5px;">Donation Amount</div>
                <div class="amount-value">₹ ${params.amount.toFixed(2)}</div>
                <div style="color: #6b7280; font-size: 12px; margin-top: 10px;">
                  Invoice No: ${params.invoiceNumber}
                </div>
                ${
                  params.transactionId
                    ? `<div style="color: #6b7280; font-size: 12px;">
                    Transaction ID: ${params.transactionId}
                  </div>`
                    : ""
                }
              </div>
              
              <div class="tax-note">
                <strong>⭐ Tax Benefit:</strong> This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961. Please find your official receipt attached.
              </div>
              
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Your donation will directly support our elderly residents</li>
                <li>You will receive regular updates about our activities</li>
                <li>Keep this receipt for your tax filing records</li>
              </ul>
              
              <p>Your official donation receipt is attached to this email. Please save it for your records and tax purposes.</p>
              
              <div style="text-align: center;">
                <p style="margin-bottom: 10px;">Once again, thank you for your kindness and support!</p>
                <p style="color: #6b7280; font-size: 14px;">With gratitude,<br><strong>Team Sirsa Foundation</strong></p>
              </div>
              
              <div class="footer">
                <p>Sirsa Foundation - Old Age Home<br>
                Sirsa, Haryana, India</p>
                <p style="font-size: 12px; margin-top: 10px;">
                  For any queries, please contact us at info@sirsafoundation.org
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: `${params.invoiceNumber.replace(/\//g, "-")}.pdf`,
          content: pdfBuffer,
        },
      ],
    })

    if (error) {
      console.error("Error sending invoice email:", error)
      return false
    }

    console.log("Invoice email sent successfully:", data)
    return true
  } catch (error) {
    console.error("Error in sendInvoiceEmail:", error)
    return false
  }
}
