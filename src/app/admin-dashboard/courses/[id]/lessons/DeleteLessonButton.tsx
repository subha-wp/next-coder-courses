"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DeleteLessonButton({ lessonId }: { lessonId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/lessons/${lessonId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete lesson");

      toast.success("Lesson deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete lesson");
      console.error("Delete lesson error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
}
