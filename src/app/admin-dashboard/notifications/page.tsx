"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { sendNotification } from "@/lib/notifications";

export default function NotificationsPage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [userIds, setUserIds] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      await sendNotification({
        title,
        subtitle,
        message,
        imageUrl: imageUrl.trim() || undefined,
        userIds: userIds
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean),
        data: data ? JSON.parse(data) : undefined,
      });

      toast.success("Notification sent successfully!");
      setTitle("");
      setSubtitle("");
      setMessage("");
      setImageUrl("");
      setUserIds("");
      setData("");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send notification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Send Push Notification</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="title">
                Notification Title *
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter notification title"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="subtitle">
                Subtitle (iOS only)
              </label>
              <Input
                id="subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Enter subtitle (optional)"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="message">
                Notification Message *
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter notification message"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="imageUrl">
                Image URL
              </label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL (optional)"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="userIds">
                User IDs
              </label>
              <Input
                id="userIds"
                value={userIds}
                onChange={(e) => setUserIds(e.target.value)}
                placeholder="Enter user IDs, comma-separated (optional)"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="data">
                Additional Data (JSON)
              </label>
              <Textarea
                id="data"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Enter additional data as JSON (optional)"
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Notification"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
