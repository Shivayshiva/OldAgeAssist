"use client"

import { useState } from "react"
import { Bell, BellDot } from "lucide-react"
import { Button } from "@/components/ui/button"
import NotificationListener from "@/components/NotificationListener"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NotificationsButton() {
  const [notifications, setNotifications] = useState<any[]>([])
  // Listen for new notifications from server
  const handleNewNotification = (data: any) => {
    setNotifications((prev) => [
      {
        id: data._id || Date.now(),
        title: data.title || "Notification",
        description: data.message || "",
        time: new Date(data.createdAt).toLocaleTimeString() || "now",
        read: false,
      },
      ...prev,
    ])
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <>
      <NotificationListener onNew={handleNewNotification} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
            {unreadCount > 0 ? <BellDot className="size-5 text-primary" /> : <Bell className="size-5" />}
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full p-0 text-[10px] shadow-md"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 p-0">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <span className="text-sm font-semibold">Notifications</span>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-2 text-xs text-primary hover:text-primary/80"
                onClick={(e) => {
                  e.preventDefault()
                  markAllAsRead()
                }}
              >
                Mark all as read
              </Button>
            )}
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="cursor-pointer flex-col items-start gap-1 border-b p-4 last:border-0 focus:bg-muted/50"
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex w-full items-start justify-between gap-2">
                    <span
                      className={`text-sm font-medium ${
                        !notification.read ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {notification.title}
                    </span>
                    {!notification.read && (
                      <span className="flex size-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {notification.description}
                  </p>
                  <span className="text-[10px] text-muted-foreground/70">
                    {notification.time}
                  </span>
                </DropdownMenuItem>
              ))
            )}
          </div>
          <div className="border-t p-2">
            <Button variant="ghost" className="w-full justify-center text-xs" size="sm">
              View all notifications
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}