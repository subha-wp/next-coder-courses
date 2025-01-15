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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface Video {
  id?: string;
  title: string;
  url: string;
  duration?: number;
  order: number;
}

interface Material {
  id?: string;
  title: string;
  type: string;
  url: string;
}

interface LessonFormProps {
  courseId: string;
  lesson?: any;
  isFirstLesson?: boolean;
}

export default function LessonForm({
  courseId,
  lesson,
  isFirstLesson,
}: LessonFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isFree, setIsFree] = useState(lesson?.isFree || false);
  const [videos, setVideos] = useState<Video[]>(
    lesson?.videos || [{ title: "", url: "", order: 1 }]
  );
  const [materials, setMaterials] = useState<Material[]>(
    lesson?.materials || [{ title: "", type: "PDF", url: "" }]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      content: formData.get("content"),
      duration: parseInt(formData.get("duration") as string) || null,
      isFree,
      courseId,
      videos: videos.filter((v) => v.title && v.url),
      materials: materials.filter((m) => m.title && m.url),
    };

    try {
      const url = lesson
        ? `/api/admin/lessons/${lesson.id}`
        : "/api/admin/lessons";
      const method = lesson ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
      }

      toast.success(lesson ? "Lesson updated" : "Lesson created");
      router.push(`/admin-dashboard/courses/${courseId}/lessons`);
      router.refresh();
    } catch (error) {
      toast.error("Failed to save lesson");
      console.error("Save lesson error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addVideo = () => {
    setVideos([...videos, { title: "", url: "", order: videos.length + 1 }]);
  };

  const removeVideo = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const updateVideo = (
    index: number,
    field: keyof Video,
    value: string | number
  ) => {
    const newVideos = [...videos];
    newVideos[index] = { ...newVideos[index], [field]: value };
    setVideos(newVideos);
  };

  const addMaterial = () => {
    setMaterials([...materials, { title: "", type: "PDF", url: "" }]);
  };

  const removeMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const updateMaterial = (
    index: number,
    field: keyof Material,
    value: string
  ) => {
    const newMaterials = [...materials];
    newMaterials[index] = { ...newMaterials[index], [field]: value };
    setMaterials(newMaterials);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            defaultValue={lesson?.title}
            required
          />
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            defaultValue={lesson?.content}
            required
            rows={5}
          />
        </div>

        <div>
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            name="duration"
            type="number"
            defaultValue={lesson?.duration}
          />
        </div>

        {isFirstLesson && (
          <div className="flex items-center space-x-2">
            <Switch id="isFree" checked={isFree} onCheckedChange={setIsFree} />
            <Label htmlFor="isFree">Make this lesson free (preview)</Label>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Tutorial Videos</h3>
            <Button type="button" onClick={addVideo} variant="outline">
              Add Video
            </Button>
          </div>
          {videos.map((video, index) => (
            <div
              key={index}
              className="space-y-4 p-4 border rounded-lg relative"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => removeVideo(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div>
                <Label>Video Title</Label>
                <Input
                  value={video.title}
                  onChange={(e) => updateVideo(index, "title", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Video URL</Label>
                <Input
                  type="url"
                  value={video.url}
                  onChange={(e) => updateVideo(index, "url", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Duration (minutes)</Label>
                <Input
                  type="number"
                  value={video.duration || ""}
                  onChange={(e) =>
                    updateVideo(index, "duration", parseInt(e.target.value))
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Course Materials</h3>
            <Button type="button" onClick={addMaterial} variant="outline">
              Add Material
            </Button>
          </div>
          {materials.map((material, index) => (
            <div
              key={index}
              className="space-y-4 p-4 border rounded-lg relative"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => removeMaterial(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div>
                <Label>Material Title</Label>
                <Input
                  value={material.title}
                  onChange={(e) =>
                    updateMaterial(index, "title", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label>Material Type</Label>
                <Select
                  value={material.type}
                  onValueChange={(value) =>
                    updateMaterial(index, "type", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="DOCUMENT">Document</SelectItem>
                    <SelectItem value="SPREADSHEET">Spreadsheet</SelectItem>
                    <SelectItem value="PRESENTATION">Presentation</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Material URL</Label>
                <Input
                  type="url"
                  value={material.url}
                  onChange={(e) => updateMaterial(index, "url", e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              router.push(`/admin-dashboard/courses/${courseId}/lessons`)
            }
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : lesson ? "Update Lesson" : "Create Lesson"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
