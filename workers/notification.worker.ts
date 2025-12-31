import { Worker } from "bullmq";
import { redis } from "@/lib/redis";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { pub } from "@/lib/redis-pubsub";

connectDB();

new Worker(
  "notifications",
  async (job) => {
    const { name, data } = job;

    if (name === "DONATION_SUCCESS") {
      await Notification.create({
        userId: data.userId,
        email: data.email,
        subject: "Donation Successful",
        message: `Thank you for donating ₹${data.amount}`,
        type: "donation_success",
        sent: false,
        data: {
          donationId: data.donationId,
          amount: data.amount,
          currency: data.currency,
        },
      });

    await pub.publish(
        "notifications",
        JSON.stringify({
            userId: data.userId,
            title: "Donation Successful",
            message: `₹${data.amount} donated`,
        })
    );
    }
  },
  {
    connection: redis,
  }
);

