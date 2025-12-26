import mongoose, { Schema, Document } from "mongoose"

export interface IVolunteerAssignment extends Document {
  foundationWork: mongoose.Types.ObjectId
  volunteer: mongoose.Types.ObjectId
  volunteerType: string
  status: "Applied" | "Approved" | "Rejected" | "Completed"
  joinedAt: Date
  checkInTime?: Date
  checkOutTime?: Date
  remarks?: string
}

const VolunteerAssignmentSchema = new Schema(
  {
    foundationWork: {
      type: Schema.Types.ObjectId,
      ref: "FoundationWork",
      required: true,
    },
    volunteer: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    volunteerType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Approved", "Rejected", "Completed"],
      default: "Applied",
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    checkInTime: Date,
    checkOutTime: Date,
    remarks: String,
  },
  { timestamps: true }
)

export default mongoose.models.VolunteerAssignment ||
  mongoose.model<IVolunteerAssignment>(
    "VolunteerAssignment",
    VolunteerAssignmentSchema
  )
