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
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await sendNotification({
        title,
        message,
      });

      toast.success("Notification sent successfully!");
      setTitle("");
      setMessage("");
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
                Notification Title
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
              <label className="text-sm font-medium" htmlFor="message">
                Notification Message
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Notification"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
