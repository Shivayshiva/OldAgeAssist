import mongoose, { Schema, Document, Types } from "mongoose";

export interface IStaff extends Document {
  staffId: string;
  fullName: string;
  gender: "male" | "female" | "other";
  dateOfBirth: Date;
  photo?: string;
  profilePhoto?: string;
  aadhaarNumber?: string;
  panNumber?: string;

  mobileNumber: string;
  alternateMobileNumber?: string;
  email?: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };

  designation: string;
  department: string;
  employmentType: "full-time" | "part-time" | "contract";
  joiningDate: Date;
  shift: "morning" | "evening" | "night" | "rotational";
  workLocation: string | Types.ObjectId;
  reportingTo: Types.ObjectId;

  salary: number;
  salaryType: "monthly" | "daily" | "hourly";
  paymentMode: "cash" | "bank" | "upi";
  bankDetails?: {
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    upiId?: string;
  };
  lastPaidOn?: Date;

  attendanceType: "manual" | "biometric" | "app";
  attendance: Array<{
    date: Date;
    checkIn: string;
    checkOut: string;
    status: "present" | "absent" | "leave";
  }>;
  leaves: Array<{
    fromDate: Date;
    toDate: Date;
    reason: string;
    approvedBy: Types.ObjectId;
  }>;


  role: "staff";
  permissions: string[];
  isActive: boolean;
  lastLoginAt?: Date;

  documents: {
    aadhaarFileUrl?: string;
    panFileUrl?: string;
    policeVerificationFileUrl?: string;
    medicalFitnessCertificateUrl?: string;
  };
  isVerified: boolean;
  verifiedAt?: Date;

  status: "active" | "inactive" | "suspended" | "resigned";
  resignationDate?: Date;
  terminationReason?: string;

  createdAt: Date;
  updatedAt: Date;
  createdBy: Types.ObjectId;
}

const StaffSchema: Schema = new Schema({
  staffId: { type: String, unique: true, required: true, default: () => new mongoose.Types.ObjectId().toString() },
  fullName: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  dateOfBirth: { type: Date, required: true },
  photo: { type: String },
  profilePhoto: { type: String, required: true },
  aadhaarNumber: { type: String },
  panNumber: { type: String },

  mobileNumber: { type: String, required: true },
  alternateMobileNumber: { type: String },
  email: { type: String },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  emergencyContact: {
    name: { type: String, required: true },
    relation: { type: String, required: true },
    phone: { type: String, required: true },
  },

  designation: { type: String, required: true },
  department: { type: String, required: true },
  employmentType: { type: String, enum: ["full-time", "part-time", "contract"], required: true },
  joiningDate: { type: Date, required: true },
  shift: { type: String, enum: ["morning", "evening", "night", "rotational"], required: true },
  workLocation: { type: Schema.Types.Mixed, required: true },
  reportingTo: { type: Schema.Types.ObjectId, ref: "Staff" },

  salary: { type: Number, required: true },
  salaryType: { type: String, enum: ["monthly", "daily", "hourly"], required: true },
  paymentMode: { type: String, enum: ["cash", "bank", "upi"], required: true },
  bankDetails: {
    accountHolderName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    bankName: { type: String },
    upiId: { type: String },
  },
  lastPaidOn: { type: Date },

  attendanceType: { type: String, enum: ["manual", "biometric", "app"], required: true },
  attendance: [
    {
      date: { type: Date, required: true },
      checkIn: { type: String },
      checkOut: { type: String },
      status: { type: String, enum: ["present", "absent", "leave"], required: true },
    }
  ],
  leaves: [
    {
      fromDate: { type: Date, required: true },
      toDate: { type: Date, required: true },
      reason: { type: String, required: true },
      approvedBy: { type: Schema.Types.ObjectId, ref: "Staff" },
    }
  ],

  role: { type: String, enum: ["staff"], default: "staff" },
  permissions: [{ type: String }],
  isActive: { type: Boolean, default: true },
  lastLoginAt: { type: Date },

  documents: {
    aadhaarFileUrl: { type: String },
    panFileUrl: { type: String },
    policeVerificationFileUrl: { type: String },
    medicalFitnessCertificateUrl: { type: String },
  },
  isVerified: { type: Boolean, default: false },
  verifiedAt: { type: Date },

  status: { type: String, enum: ["active", "inactive", "suspended", "resigned"], default: "active" },
  resignationDate: { type: Date },
  terminationReason: { type: String },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: "Admin" },
}, {
  timestamps: true,
})

export default mongoose.models.Staff || mongoose.model<IStaff>("Staff", StaffSchema)
