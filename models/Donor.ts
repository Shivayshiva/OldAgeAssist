import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },

    aadhaarNumber: {
      type: String,
      default: null,
    },

    photoUrl: {
      type: String,
      default: null,
    },

    isDonor: {
      type: Boolean,
      default: false,
    },

    donorType: {
      type: String,
      enum: ["individual", "organization", "corporate"],
      default: "individual",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Donor || mongoose.model("Donor", donorSchema);
