import { renderToBuffer } from "@react-pdf/renderer"
import { InvoicePDFDocument } from "./InvoicePDF"
import imagekit from "@/lib/imagekit"

interface GeneratePDFParams {
  invoiceNumber: string
  invoiceDate: Date
  donorName: string
  donorMobile: string
  donorEmail?: string
  donorAddress?: {
    addressLine?: string
    townVillage?: string
    district?: string
    state?: string
    pincode?: string
  }
  amount: number
  amountInWords: string
  paymentMethod: string
  transactionId?: string
  paymentDate: Date
  donationPurpose?: string
  receiptNumber?: string
  is80GEligible?: boolean
  foundationName?: string
  foundationAddress?: string
  foundationPAN?: string
}

export async function generateInvoicePDF(
  params: GeneratePDFParams
): Promise<string> {
  try {
    // Format dates
    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    };

    // Prepare PDF data
    const pdfData = {
      ...params,
      invoiceDate: formatDate(params.invoiceDate),
      paymentDate: formatDate(params.paymentDate),
    };

    // Generate PDF buffer
    const pdfBuffer = await renderToBuffer(
      InvoicePDFDocument({ data: pdfData })
    );

    // Generate filename
    const filename = `${params.invoiceNumber.replace(/\//g, "-")}.pdf`;

    // Upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: pdfBuffer,
      fileName: filename,
      folder: "/invoices",
      useUniqueFileName: false,
      tags: ["invoice", params.invoiceNumber],
    });

    console.log("PDF uploaded to ImageKit:", uploadResponse.url);

    // Return ImageKit URL
    return uploadResponse.url;
  } catch (error) {
    console.error("Error generating invoice PDF:", error);
    throw new Error("Failed to generate invoice PDF");
  }
}

// Helper function to convert number to words (Indian format)
export function numberToWords(amount: number): string {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ]
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ]
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ]

  if (amount === 0) return "Zero Rupees Only"

  const convertLessThanThousand = (n: number): string => {
    if (n === 0) return ""
    if (n < 10) return ones[n]
    if (n < 20) return teens[n - 10]
    if (n < 100) {
      return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "")
    }
    return (
      ones[Math.floor(n / 100)] +
      " Hundred" +
      (n % 100 ? " " + convertLessThanThousand(n % 100) : "")
    )
  }

  const integerPart = Math.floor(amount)
  const decimalPart = Math.round((amount - integerPart) * 100)

  if (integerPart >= 10000000) {
    // Crore
    const crores = Math.floor(integerPart / 10000000)
    const remaining = integerPart % 10000000
    let result = convertLessThanThousand(crores) + " Crore"
    if (remaining > 0) {
      result += " " + numberToWords(remaining).replace(" Rupees Only", "")
    }
    return result + " Rupees Only"
  } else if (integerPart >= 100000) {
    // Lakh
    const lakhs = Math.floor(integerPart / 100000)
    const remaining = integerPart % 100000
    let result = convertLessThanThousand(lakhs) + " Lakh"
    if (remaining > 0) {
      result += " " + numberToWords(remaining).replace(" Rupees Only", "")
    }
    return result + " Rupees Only"
  } else if (integerPart >= 1000) {
    // Thousand
    const thousands = Math.floor(integerPart / 1000)
    const remaining = integerPart % 1000
    let result = convertLessThanThousand(thousands) + " Thousand"
    if (remaining > 0) {
      result += " " + convertLessThanThousand(remaining)
    }
    return result + " Rupees Only"
  } else {
    return convertLessThanThousand(integerPart) + " Rupees Only"
  }
}
