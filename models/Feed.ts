import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFeed extends Document {
  title: string;
  description: string;
  images: string[];
  author: mongoose.Types.ObjectId;
  category?: string;
  likes: mongoose.Types.ObjectId[];
  comments: {
    user: mongoose.Types.ObjectId;
    text: string;
    createdAt: Date;
  }[];
  viewMode: "grid" | "slide";
  createdAt: Date;
  updatedAt: Date;
}

const FeedSchema: Schema<IFeed> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
    },
    images: {
      type: [String],
      default: [],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    category: {
      type: String,
      trim: true,
      default: "General",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: "Member", required: true },
        text: { type: String, required: true, trim: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    viewMode: {
      type: String,
      enum: ["grid", "slide"],
      default: "grid",
    },
  },
  { timestamps: true }
);

const Feed: Model<IFeed> = mongoose.models.Feed || mongoose.model<IFeed>("Feed", FeedSchema);

export default Feed;