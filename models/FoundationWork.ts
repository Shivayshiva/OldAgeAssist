import mongoose, { Schema, Document, Model } from "mongoose"

export interface IVolunteerRequirement {
  type: string
  count: number
}

export interface IFoundationWork extends Document {
  title: string
  description: string
  category: string
  status: "Planning" | "Active" | "Completed" | "On Hold"
  startDate: Date
  endDate?: Date
  budget: number
  beneficiaries: number
  impact: "Critical" | "High" | "Medium" | "Low"
  volunteerRequirement: IVolunteerRequirement[]
  location: string
  googleMapLocation?: string
  requirement: string
  rewards: string[]
  facilities: string[]
  organizedBy: mongoose.Types.ObjectId
  startTime: string
  endTime: string
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
}

const FoundationWorkSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Planning", "Active", "Completed", "On Hold"],
      default: "Planning",
      required: [true, "Status is required"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
    },
    budget: {
      type: Number,
      required: [true, "Budget is required"],
      min: [0, "Budget must be a positive number"],
    },
    beneficiaries: {
      type: Number,
      required: [true, "Beneficiaries count is required"],
      min: [0, "Beneficiaries must be a positive integer"],
    },
    impact: {
      type: String,
      required: [true, "Impact level is required"],
      enum: ["Critical", "High", "Medium", "Low"],
      default: "Medium",
    },
    volunteerRequirement: [
       {
        _id: { type: Schema.Types.ObjectId, auto: true, ref: 'VolunteerParticipation' },
        type: { type: String, required: true },
        requiredCount: { type: Number, required: true, min: 1 }
       }
    ],
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    googleMapLocation: {
      type: String,
    },
    requirement: {
      type: String,
      required: [true, "Requirement description is required"],
    },
    rewards: {
      type: [String],
      default: [],
    },
    facilities: {
      type: [String],
      default: [],
    },
    organizedBy: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: [true, "Organized By is required"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)


FoundationWorkSchema.index({ status: 1 })
FoundationWorkSchema.index({ startDate: 1 })
FoundationWorkSchema.index({ category: 1 })
FoundationWorkSchema.index({ "volunteerRequirement.type": 1 })

// Check if the model is already defined to prevent overwriting during hot reloads in Next.js
const FoundationWork: Model<IFoundationWork> =
  mongoose.models.FoundationWork ||
  mongoose.model<IFoundationWork>("FoundationWork", FoundationWorkSchema)

export default FoundationWork