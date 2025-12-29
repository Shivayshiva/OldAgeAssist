import { Queue } from "bullmq";
import { redisConnection } from "@/lib/redis";

export const invoiceQueue = new Queue("invoice-queue", {
  connection: redisConnection,
});


