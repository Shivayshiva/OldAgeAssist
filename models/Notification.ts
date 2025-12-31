import mongoose, { Schema, Document, Types } from "mongoose";

export interface INotification extends Document {
	userId?: Types.ObjectId | string; // Optional for email-only notifications
	email: string; // Recipient email address
	subject: string; // Email subject
	message: string; // Email body/message
	type: "donation_success" | "info" | "success" | "warning" | "error" | "custom";
	sent: boolean; // Whether the email was sent
	data?: Record<string, any>; // Extra context (e.g., donationId, amount)
	createdAt: Date;
	updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User" },
		email: { type: String, required: true },
		subject: { type: String, required: true },
		message: { type: String, required: true },
		type: { type: String, enum: ["donation_success", "info", "success", "warning", "error", "custom"], default: "donation_success" },
		sent: { type: Boolean, default: false },
		data: { type: Schema.Types.Mixed },
	},
	{ timestamps: true }
);

export default mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema);
