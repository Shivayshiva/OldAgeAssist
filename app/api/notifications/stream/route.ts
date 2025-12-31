export const dynamic = "force-dynamic";

import { sub } from "@/lib/redis-pubsub";

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      sub.subscribe("notifications");

      sub.on("message", (_, message) => {
        controller.enqueue(
          encoder.encode(`data: ${message}\n\n`)
        );
      });
    },
    cancel() {
      sub.unsubscribe("notifications");
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
