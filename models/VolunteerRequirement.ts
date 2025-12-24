import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVolunteerRequirement extends Document {
  volunteerWork: mongoose.Types.ObjectId; // Reference to VolunteerWork
  roleType: string;
  location: string;
  currentVolunteers: number;
  maxVolunteers: number;
  timeCommitment: string;
  date: Date;
  difficulty: "easy" | "moderate" | "challenging";
  status: "OPEN" | "CLOSED";
  participants: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const VolunteerRequirementSchema: Schema<IVolunteerRequirement> = new Schema(
  {
    volunteerWork: {
      type: Schema.Types.ObjectId,
      ref: "VolunteerWork",
      required: true,
    },
    roleType: {
      type: String,
      required: [true, "Role type is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    currentVolunteers: {
      type: Number,
      default: 0,
    },
    maxVolunteers: {
      type: Number,
      required: [true, "Max volunteers count is required"],
    },
    timeCommitment: {
      type: String,
      required: [true, "Time commitment is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    difficulty: {
      type: String,
      enum: ["easy", "moderate", "challenging"],
      default: "easy",
    },
    status: {
      type: String,
      enum: ["OPEN", "CLOSED"],
      default: "OPEN",
    },
    participants: [{
      type: Schema.Types.ObjectId,
      ref: "Member",
    }],
  },
  { timestamps: true }
);

const VolunteerRequirement: Model<IVolunteerRequirement> =
  mongoose.models.VolunteerRequirement ||
  mongoose.model<IVolunteerRequirement>("VolunteerRequirement", VolunteerRequirementSchema);

export default VolunteerRequirement;
