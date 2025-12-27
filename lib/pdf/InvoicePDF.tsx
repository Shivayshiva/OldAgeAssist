import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer"

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: 2,
    borderBottomColor: "#2563eb",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 10,
  },
  invoiceDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1e293b",
    borderBottom: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 4,
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    width: "40%",
    color: "#64748b",
  },
  value: {
    width: "60%",
    fontWeight: "bold",
    color: "#1e293b",
  },
  amountBox: {
    backgroundColor: "#f1f5f9",
    padding: 15,
    marginVertical: 15,
    borderRadius: 4,
  },
  amountLabel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 5,
  },
  amountValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 3,
  },
  amountWords: {
    fontSize: 10,
    color: "#64748b",
    fontStyle: "italic",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    borderTop: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 10,
  },
  footerText: {
    fontSize: 9,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 3,
  },
  taxNote: {
    backgroundColor: "#fef3c7",
    padding: 10,
    marginTop: 15,
    borderRadius: 4,
  },
  taxNoteText: {
    fontSize: 9,
    color: "#92400e",
    textAlign: "center",
  },
  signatureSection: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBox: {
    width: "45%",
    borderTop: 1,
    borderTopColor: "#94a3b8",
    paddingTop: 5,
  },
  signatureLabel: {
    fontSize: 9,
    color: "#64748b",
    textAlign: "center",
  },
})

interface InvoiceData {
  invoiceNumber: string
  invoiceDate: string
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
  paymentDate: string
  donationPurpose?: string
  receiptNumber?: string
  is80GEligible?: boolean
  foundationName?: string
  foundationAddress?: string
  foundationPAN?: string
}

export const InvoicePDFDocument = ({ data }: { data: InvoiceData }) => {
  const formatAddress = () => {
    const addr = data.donorAddress
    if (!addr) return "N/A"
    const parts = [
      addr.addressLine,
      addr.townVillage,
      addr.district,
      addr.state,
      addr.pincode,
    ].filter(Boolean)
    return parts.join(", ") || "N/A"
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {data.foundationName || "Sirsa Foundation"}
          </Text>
          <Text style={styles.subtitle}>Donation Receipt & Invoice</Text>
        </View>

        {/* Invoice Details */}
        <View style={styles.invoiceDetails}>
          <View>
            <View style={styles.row}>
              <Text style={styles.label}>Invoice No:</Text>
              <Text style={styles.value}>{data.invoiceNumber}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Invoice Date:</Text>
              <Text style={styles.value}>{data.invoiceDate}</Text>
            </View>
            {data.receiptNumber && (
              <View style={styles.row}>
                <Text style={styles.label}>Receipt No:</Text>
                <Text style={styles.value}>{data.receiptNumber}</Text>
              </View>
            )}
          </View>
          <View>
            <View style={styles.row}>
              <Text style={styles.label}>Payment Date:</Text>
              <Text style={styles.value}>{data.paymentDate}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Method:</Text>
              <Text style={styles.value}>{data.paymentMethod.toUpperCase()}</Text>
            </View>
            {data.transactionId && (
              <View style={styles.row}>
                <Text style={styles.label}>Transaction ID:</Text>
                <Text style={styles.value}>{data.transactionId}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Donor Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Donor Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{data.donorName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Mobile:</Text>
            <Text style={styles.value}>{data.donorMobile}</Text>
          </View>
          {data.donorEmail && (
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{data.donorEmail}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{formatAddress()}</Text>
          </View>
        </View>

        {/* Foundation Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Foundation Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>
              {data.foundationName || "Sirsa Foundation"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>
              {data.foundationAddress || "Old Age Home, Sirsa, Haryana"}
            </Text>
          </View>
          {data.foundationPAN && (
            <View style={styles.row}>
              <Text style={styles.label}>PAN:</Text>
              <Text style={styles.value}>{data.foundationPAN}</Text>
            </View>
          )}
        </View>

        {/* Amount Section */}
        <View style={styles.amountBox}>
          <Text style={styles.amountLabel}>Donation Amount</Text>
          <Text style={styles.amountValue}>₹ {data.amount.toFixed(2)}</Text>
          <Text style={styles.amountWords}>
            ({data.amountInWords})
          </Text>
        </View>

        {/* Purpose */}
        {data.donationPurpose && (
          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.label}>Purpose:</Text>
              <Text style={styles.value}>
                {data.donationPurpose.replace(/_/g, " ").toUpperCase()}
              </Text>
            </View>
          </View>
        )}

        {/* Tax Note */}
        {data.is80GEligible && (
          <View style={styles.taxNote}>
            <Text style={styles.taxNoteText}>
              ⭐ This donation is eligible for tax deduction under Section 80G
              of the Income Tax Act, 1961
            </Text>
          </View>
        )}

        {/* Signature Section */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Donor's Signature</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>
              Authorized Signatory
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for your generous contribution!
          </Text>
          <Text style={styles.footerText}>
            This is a computer-generated invoice and does not require a signature.
          </Text>
          <Text style={styles.footerText}>
            For queries, contact: info@sirsafoundation.org | +91-XXXXXXXXXX
          </Text>
        </View>
      </Page>
    </Document>
  )
}
