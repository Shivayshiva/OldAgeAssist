import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVolunteerWork extends Document {
  title: string;
  description: string;
  camp: string; // Organization or Camp Name
  category: string;
  image?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const VolunteerWorkSchema: Schema<IVolunteerWork> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    camp: {
      type: String,
      required: [true, "Camp/Organization name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    image: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
  },
  { timestamps: true }
);

const VolunteerWork: Model<IVolunteerWork> =
  mongoose.models.VolunteerWork ||
  mongoose.model<IVolunteerWork>("VolunteerWork", VolunteerWorkSchema);

export default VolunteerWork;