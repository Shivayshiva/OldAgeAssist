import mongoose, { Schema, Document, Model } from "mongoose"

export interface IResident extends Document {
  // Personal Information
  fullName: string
  gender: "male" | "female" | "other"
  dateOfBirth: Date
  age: number
  profilePhoto?: string
  religion?: string
  caste?: string
  language?: string[]

  // Identity Documents
  aadhaarNumber?: string
  panCard?: string
  voterId?: string
  pensionNumber?: string

  // Contact Information
  mobileNumber?: string
  alternatePhone?: string
  email?: string
  emergencyContact: {
    name: string
    relation: string
    phone: string
    alternatePhone?: string
  }

  // Address
  address: {
    villageOrTown: string
    district: string
    state: string
    pincode: string
    landmark?: string
  }

  // Medical Information
  bloodGroup?: string
  medicalConditions: string[]
  disabilities: string[]
  currentMedications: string[]
  allergies: string[]
  mobilityStatus: "independent" | "assisted" | "wheelchair" | "bedridden"
  mentalHealthStatus: "normal" | "dementia" | "alzheimer" | "depression" | "other"
  lastMedicalCheckup?: Date
  doctorName?: string
  doctorContact?: string
  insuranceDetails?: {
    provider: string
    policyNumber: string
    validTill: Date
  }

  // Care Requirements
  requiresCaregiver: boolean
  careLevel: "low" | "medium" | "high" | "critical"
  dietType?: string
  dietaryRestrictions?: string[]
  specialNeeds?: string[]

  // Admission Details
  admissionDate?: Date
  admissionReason?: string
  admittedBy?: string
  roomNumber?: string
  bedNumber?: string
  floor?: string

  // Financial Information
  monthlyFee?: number
  paymentStatus?: "paid" | "pending" | "overdue"
  lastPaymentDate?: Date
  financialSponsor?: {
    name: string
    relation: string
    phone: string
    address: string
  }

  // Legal Guardian
  hasLegalGuardian: boolean
  guardianDetails?: {
    name: string
    relation: string
    phone: string
    address: string
    email?: string
    aadhaar?: string
  }

  // Family Details
  familyMembers?: Array<{
    name: string
    relation: string
    phone?: string
    address?: string
    visitFrequency?: string
  }>

  // Social & Activity
  hobbies?: string[]
  previousOccupation?: string
  education?: string
  maritalStatus?: "single" | "married" | "widowed" | "divorced"
  numberOfChildren?: number
  languagesSpoken?: string[]

  // Additional Information
  notes?: string
  behaviorNotes?: string
  preferences?: string
  lastVisitDate?: Date
  lastVisitorName?: string

  // Status & Tracking
  status: "active" | "inactive" | "deceased" | "transferred"
  statusReason?: string
  dischargeDate?: Date
  deceasedDate?: Date

  // System Fields
  createdBy?: mongoose.Types.ObjectId
  updatedBy?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const ResidentSchema: Schema = new Schema(
  {
    // Personal Information
    fullName: { 
      type: String, 
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    gender: { 
      type: String,
      enum: ["male", "female", "other"],
      lowercase: true,
    },
    dateOfBirth: { 
      type: Date,
      required: [true, "Date of birth is required"],
    },
    age: { 
      type: Number,
      min: [0, "Age must be positive"],
    },
    profilePhoto: { type: String },
    religion: { type: String, trim: true },
    caste: { type: String, trim: true },
    language: [{ type: String }],

    // Identity Documents
    aadhaarNumber: { 
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    panCard: { type: String, trim: true },
    voterId: { type: String, trim: true },
    pensionNumber: { type: String, trim: true },

    // Contact Information
    mobileNumber: { type: String, trim: true },
    alternatePhone: { type: String, trim: true },
    email: { 
      type: String,
      lowercase: true,
      trim: true,
    },
    emergencyContact: {
      name: { type: String, required: true },
      relation: { type: String, required: true },
      phone: { type: String, required: true },
      alternatePhone: { type: String },
    },

    // Address
    address: {
      villageOrTown: { type: String, trim: true },
      district: { type: String, trim: true },
      state: { type: String, trim: true },
      pincode: { type: String, trim: true },
      landmark: { type: String, trim: true },
    },

    // Medical Information
    bloodGroup: { 
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    medicalConditions: [{ type: String }],
    disabilities: [{ type: String }],
    currentMedications: [{ type: String }],
    allergies: [{ type: String }],
    mobilityStatus: {
      type: String,
      enum: ["independent", "assisted", "wheelchair", "bedridden"],
      default: "independent",
    },
    mentalHealthStatus: {
      type: String,
      enum: ["normal", "dementia", "alzheimer", "depression", "other"],
      default: "normal",
    },
    lastMedicalCheckup: { type: Date },
    doctorName: { type: String, trim: true },
    doctorContact: { type: String, trim: true },
    insuranceDetails: {
      provider: { type: String },
      policyNumber: { type: String },
      validTill: { type: Date },
    },

    // Care Requirements
    requiresCaregiver: { 
      type: Boolean,
      default: false,
    },
    careLevel: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "low",
    },
    dietType: { type: String, trim: true },
    dietaryRestrictions: [{ type: String }],
    specialNeeds: [{ type: String }],

    // Admission Details
    admissionDate: { 
      type: Date,
    },
    admissionReason: { 
      type: String,
      trim: true,
    },
    admittedBy: { type: String, trim: true },
    roomNumber: { type: String, trim: true },
    bedNumber: { type: String, trim: true },
    floor: { type: String, trim: true },

    // Financial Information
    monthlyFee: { 
      type: Number,
      min: [0, "Monthly fee must be positive"],
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "pending", "overdue"],
      default: "pending",
    },
    lastPaymentDate: { type: Date },
    financialSponsor: {
      name: { type: String },
      relation: { type: String },
      phone: { type: String },
      address: { type: String },
    },

    // Legal Guardian
    hasLegalGuardian: { 
      type: Boolean,
      default: false,
    },
    guardianDetails: {
      name: { type: String },
      relation: { type: String },
      phone: { type: String },
      address: { type: String },
      email: { type: String },
      aadhaar: { type: String },
    },

    // Family Details
    familyMembers: [
      {
        name: { type: String },
        relation: { type: String },
        phone: { type: String },
        address: { type: String },
        visitFrequency: { type: String },
      },
    ],

    // Social & Activity
    hobbies: [{ type: String }],
    previousOccupation: { type: String, trim: true },
    education: { type: String, trim: true },
    maritalStatus: {
      type: String,
      enum: ["single", "married", "widowed", "divorced"],
    },
    numberOfChildren: { 
      type: Number,
      min: [0, "Number of children must be positive"],
    },
    languagesSpoken: [{ type: String }],

    // Additional Information
    notes: { type: String },
    behaviorNotes: { type: String },
    preferences: { type: String },
    lastVisitDate: { type: Date },
    lastVisitorName: { type: String, trim: true },

    // Status & Tracking
    status: {
      type: String,
      enum: ["active", "inactive", "deceased", "transferred"],
      default: "active",
    },
    statusReason: { type: String },
    dischargeDate: { type: Date },
    deceasedDate: { type: Date },

    // System Fields
    createdBy: { 
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: { 
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Indexes for better query performance
ResidentSchema.index({ fullName: 1 })
ResidentSchema.index({ aadhaarNumber: 1 })
ResidentSchema.index({ status: 1 })
ResidentSchema.index({ admissionDate: -1 })
ResidentSchema.index({ roomNumber: 1, bedNumber: 1 })

const Resident: Model<IResident> =
  mongoose.models.Resident || mongoose.model<IResident>("Resident", ResidentSchema)

export default Resident
