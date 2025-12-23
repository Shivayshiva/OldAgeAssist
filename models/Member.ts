import mongoose from "mongoose"

const MemberSchema = new mongoose.Schema(
  {
    // 🔑 AUTH METHODS
    auth: {
      provider: {
        type: String,
        enum: ["credentials", "google"],
        required: true
      },
      googleId: {
        type: String,
        index: true,
        sparse: true
      },
      email: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        sparse: true
      },
      password: {
        type: String,
        select: false
      },
      isEmailVerified: { type: Boolean, default: false }
    },

    // 👤 BASIC PROFILE
    profile: {
      fullName: { type: String, trim: true },
      age: { type: Number, min: 18 },
      gender: { type: String, enum: ["male", "female", "other"] },
      profilePhoto: { type: String } // S3 / Cloudinary URL
    },

    // 🏠 ADDRESS INFO
    address: {
      addressLine: { type: String },
      townOrVillage: { type: String },
      district: { type: String },
      state: { type: String },
      pincode: { type: String }
    },

    // 🪪 KYC DETAILS (Sensitive)
    kyc: {
      aadhaarNumber: {
        type: String,
        select: false // 🚨 VERY IMPORTANT
      },
      panNumber: {
        type: String,
        uppercase: true,
        select: false
      },
      aadhaarPhoto: { type: String },
      panPhoto: { type: String },
      isKycVerified: { type: Boolean, default: false },
      kycSubmittedAt: { type: Date }
    },

    // 👔 ROLE & ACCESS
    role: {
      type: String,
      enum: ["superAdmin", "admin", "staff", "volunteer", "finance"],
      default: "staff"
    },

    // 🟢 STATUS FLAGS
    status: {
      isActive: { type: Boolean, default: true },
      isBlocked: { type: Boolean, default: false },
      joinedAt: { type: Date, default: Date.now }
    },

    // 📊 META
    lastLoginAt: { type: Date },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member"
    }
  },
  { timestamps: true }
)



MemberSchema.index({ "auth.googleId": 1 }, { unique: true, sparse: true })
MemberSchema.index({ "kyc.panNumber": 1 }, { unique: true, sparse: true })


export default mongoose.models.Member ||
  mongoose.model("Member", MemberSchema)
