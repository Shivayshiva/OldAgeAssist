import { notificationQueue } from "@/lib/queues/notification.queue";

export async function emitNotification(event: string, payload: any) {
  await notificationQueue.add(event, payload);
}