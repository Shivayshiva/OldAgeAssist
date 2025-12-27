import mongoose from "mongoose";

const donationInvoiceSchema = new mongoose.Schema(
  {
    // Invoice Details
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    invoiceDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    financialYear: {
      type: String,
      required: true,
    },

    // Donor Information
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
      required: true,
    },

    donorName: {
      type: String,
      required: true,
      trim: true,
    },

    donorMobile: {
      type: String,
      required: true,
    },

    donorEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },

    donorAddress: {
      addressLine: { type: String },
      townVillage: { type: String },
      district: { type: String },
      state: { type: String },
      pincode: { type: String },
    },

    donorPAN: {
      type: String,
      trim: true,
      uppercase: true,
    },

    donorAadhaar: {
      type: String,
      trim: true,
    },

    donorType: {
      type: String,
      enum: ["individual", "organization", "corporate"],
      default: "individual",
    },

    // Donation Information
    donationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    amountInWords: {
      type: String,
      required: true,
    },

    // Payment Details
    paymentMethod: {
      type: String,
      enum: ["cash", "upi", "card", "netbanking", "cheque", "other"],
      required: true,
    },

    razorpayOrderId: {
      type: String,
    },

    razorpayPaymentId: {
      type: String,
    },

    transactionId: {
      type: String,
    },

    paymentDate: {
      type: Date,
      required: true,
    },

    // Tax & Receipt Details
    receiptNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    is80GEligible: {
      type: Boolean,
      default: true,
    },

    section80GDetails: {
      registrationNumber: { type: String },
      validFrom: { type: Date },
      validTo: { type: Date },
    },

    taxExemptionPercentage: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },

    // Purpose & Category
    donationPurpose: {
      type: String,
      enum: [
        "general",
        "medical",
        "food",
        "infrastructure",
        "education",
        "emergency",
        "monthly_support",
        "other",
      ],
      default: "general",
    },

    donationCategory: {
      type: String,
      enum: ["one-time", "monthly", "annual"],
      default: "one-time",
    },

    notes: {
      type: String,
      trim: true,
    },

    // Foundation Details
    foundationName: {
      type: String,
      default: "Sirsa Foundation",
    },

    foundationAddress: {
      type: String,
      default: "Sirsa Foundation, Gorakhpur, Uttar Pradesh, India",
    },

    foundationPAN: {
      type: String,
      default: "AAATS1234F",
    },

    foundationGSTIN: {
      type: String,
    },

    foundationContact: {
      phone: { type: String },
      email: { type: String },
      website: { type: String },
    },

    // Status & Generation
    status: {
      type: String,
      enum: ["draft", "generated", "sent", "downloaded"],
      default: "generated",
    },

    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },

    sentTo: {
      type: String,
      trim: true,
      lowercase: true,
    },

    sentAt: {
      type: Date,
    },

    downloadCount: {
      type: Number,
      default: 0,
    },

    lastDownloadedAt: {
      type: Date,
    },

    // PDF Storage
    pdfUrl: {
      type: String,
    },

    pdfGeneratedAt: {
      type: Date,
    },

    // Metadata
    remarks: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
donationInvoiceSchema.index({ invoiceNumber: 1 }, { unique: true });
donationInvoiceSchema.index({ donorId: 1 });
donationInvoiceSchema.index({ donationId: 1 });
donationInvoiceSchema.index({ invoiceDate: -1 });
donationInvoiceSchema.index({ financialYear: 1 });
donationInvoiceSchema.index({ status: 1 });
donationInvoiceSchema.index({ receiptNumber: 1 }, { unique: true, sparse: true });

// Pre-save hook to generate invoice number if not provided
donationInvoiceSchema.pre("save", async function () {
  if (!this.invoiceNumber) {
    const year = new Date().getFullYear();
    const count = await mongoose.models.DonationInvoice.countDocuments();
    this.invoiceNumber = `INV-${year}-${String(count + 1).padStart(6, "0")}`;
  }

  // Set financial year if not provided
  if (!this.financialYear) {
    const date = this.invoiceDate || new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    this.financialYear =
      month >= 3 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
  }
});

// Virtual for invoice age in days
donationInvoiceSchema.virtual("ageInDays").get(function () {
  return Math.floor(
    (Date.now() - this.invoiceDate.getTime()) / (1000 * 60 * 60 * 24)
  );
});

export default mongoose.models.DonationInvoice ||
  mongoose.model("DonationInvoice", donationInvoiceSchema);
