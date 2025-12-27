import mongoose from "mongoose"

const MemberSchema = new mongoose.Schema(
  {
    // 🔑 AUTH & LOGIN
    auth: {
      provider: {
        type: String,
        enum: ["credentials", "google", "email"],
        required: true
      },

      googleId: {
        type: String,
        index: true,
        sparse: true
      },

      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
      },

      password: {
        type: String,
        select: false
      },

      isEmailVerified: {
        type: Boolean,
        default: false
      },

      emailVerificationToken: {
        type: String,
        select: false
      },

      emailVerificationExpires: {
        type: Date,
        select: false
      }
    },

    // 👤 BASIC PROFILE
    profile: {
      fullName: { type: String, trim: true },
      age: { type: Number, min: 18 },
      gender: { type: String, enum: ["male", "female", "other"] },
      profilePhoto: { type: String }
    },

    // 🏠 ADDRESS INFO
    address: {
      addressLine: { type: String },
      townOrVillage: { type: String },
      district: { type: String },
      state: { type: String },
      pincode: { type: String }
    },

    // 🧑‍🤝‍🧑 VOLUNTEER DETAILS
    volunteer: {
      onboardingCompleted: {
        type: Boolean,
        default: false
      },

      skills: [{
        type: String // caregiver, medical, event, transport
      }],

      availability: {
        days: [{
          type: String,
          enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
        }],
        timeSlots: [{
          type: String // morning, afternoon, evening
        }]
      },

      volunteerStatus: {
        type: String,
        enum: [
          "new",
          "onboarding_pending",
          "pending_verification",
          "verified",
          "active",
          "blocked"
        ],
        default: "new"
      }
    },

    // 🪪 KYC DETAILS (SENSITIVE)
    kyc: {
      aadhaarNumber: {
        type: String,
        select: false
      },
      panNumber: {
        type: String,
        uppercase: true,
        select: false
      },
      aadhaarPhoto: { type: String },
      panPhoto: { type: String },
      isKycVerified: {
        type: Boolean,
        default: false
      },
      kycSubmittedAt: { type: Date },
      kycVerifiedAt: { type: Date }
    },

    // 👔 ROLE & ACCESS
    role: {
      type: String,
      enum: ["superAdmin", "admin", "staff", "volunteer", "finance"],
      default: "volunteer"
    },

    // 🟢 ACCOUNT STATUS
    status: {
      isActive: { type: Boolean, default: true },
      isBlocked: { type: Boolean, default: false },
      joinedAt: { type: Date, default: Date.now }
    },

    // 📊 META & AUDIT
    meta: {
      lastLoginAt: { type: Date },
      onboardingCompletedAt: { type: Date }
      
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member"
    }
  },
  { timestamps: true }
)

/* 🔐 INDEXES */
MemberSchema.index({ "auth.googleId": 1 }, { unique: true, sparse: true })
MemberSchema.index({ "auth.email": 1 }, { unique: true })
MemberSchema.index({ "kyc.panNumber": 1 }, { unique: true, sparse: true })

export default mongoose.models.Member ||
  mongoose.model("Member", MemberSchema)
