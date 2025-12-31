"use client";

import { useEffect } from "react";

export default function NotificationListener({ onNew }: { onNew: (data: any) => void }) {
  useEffect(() => {
    const eventSource = new EventSource(
      "/api/notifications/stream"
    );

    eventSource.onmessage = (event) => {
      onNew(JSON.parse(event.data));
    };

    return () => eventSource.close();
  }, []);

  return null;
}
