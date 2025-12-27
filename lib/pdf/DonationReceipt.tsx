import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 11 },
  title: { fontSize: 18, marginBottom: 10 },
  section: { marginBottom: 8 },
  label: { fontWeight: "bold" },
})

export interface DonationReceiptProps {
  receiptNumber: string
  donorName: string
  amount: number
  paymentId: string
  date: string
  organizationName: string
}

export const DonationReceipt = ({
  receiptNumber,
  donorName,
  amount,
  paymentId,
  date,
  organizationName,
}: DonationReceiptProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Donation Receipt</Text>

      <View style={styles.section}>
        <Text><Text style={styles.label}>Organization:</Text> {organizationName}</Text>
        <Text><Text style={styles.label}>Receipt No:</Text> {receiptNumber}</Text>
        <Text><Text style={styles.label}>Date:</Text> {date}</Text>
      </View>

      <View style={styles.section}>
        <Text><Text style={styles.label}>Donor Name:</Text> {donorName}</Text>
        <Text><Text style={styles.label}>Amount:</Text> ₹{amount}</Text>
        <Text><Text style={styles.label}>Payment ID:</Text> {paymentId}</Text>
      </View>

      <View style={styles.section}>
        <Text>
          This receipt acknowledges the donation received. Thank you for your support.
        </Text>
      </View>
    </Page>
  </Document>
)
