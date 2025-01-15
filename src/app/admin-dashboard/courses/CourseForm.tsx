/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

export default function CourseForm({ course }: { course?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      thumbnailUrl: formData.get("thumbnailUrl"),
      price: parseFloat(formData.get("price") as string),
      hasFreeTrial: formData.get("hasFreeTrial") === "on",
    };

    try {
      const url = course
        ? `/api/admin/courses/${course.id}`
        : "/api/admin/courses";
      const method = course ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save course");

      toast.success(course ? "Course updated" : "Course created");
      router.push("/admin-dashboard/courses");
    } catch (error) {
      toast.error("Failed to save course");
      console.error("Save course error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            defaultValue={course?.title}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={course?.description}
            required
          />
        </div>

        <div>
          <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
          <Input
            id="thumbnailUrl"
            name="thumbnailUrl"
            type="url"
            defaultValue={course?.thumbnailUrl}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            defaultValue={course?.price}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="hasFreeTrial"
            name="hasFreeTrial"
            defaultChecked={course?.hasFreeTrial}
          />
          <Label htmlFor="hasFreeTrial">Enable free trial (first lesson)</Label>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin-dashboard/courses")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : course ? "Update Course" : "Create Course"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
