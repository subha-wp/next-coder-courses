/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
}

export default function LessonForm({ courseId, lesson }: LessonFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

      if (!res.ok) throw new Error("Failed to save lesson");

      toast.success(lesson ? "Lesson updated" : "Lesson created");
      router.push(`/admin-dashboard/courses/${courseId}/lessons`);
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

  const addMaterial = () => {
    setMaterials([...materials, { title: "", type: "PDF", url: "" }]);
  };

  const removeMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <Input
            id="title"
            name="title"
            defaultValue={lesson?.title}
            required
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <Textarea
            id="content"
            name="content"
            defaultValue={lesson?.content}
            required
            rows={5}
          />
        </div>

        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700"
          >
            Duration (minutes)
          </label>
          <Input
            id="duration"
            name="duration"
            type="number"
            defaultValue={lesson?.duration}
          />
        </div>

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
                <label className="block text-sm font-medium text-gray-700">
                  Video Title
                </label>
                <Input
                  value={video.title}
                  onChange={(e) => {
                    const newVideos = [...videos];
                    newVideos[index].title = e.target.value;
                    setVideos(newVideos);
                  }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Video URL
                </label>
                <Input
                  type="url"
                  value={video.url}
                  onChange={(e) => {
                    const newVideos = [...videos];
                    newVideos[index].url = e.target.value;
                    setVideos(newVideos);
                  }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duration (minutes)
                </label>
                <Input
                  type="number"
                  value={video.duration || ""}
                  onChange={(e) => {
                    const newVideos = [...videos];
                    newVideos[index].duration = parseInt(e.target.value);
                    setVideos(newVideos);
                  }}
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
                <label className="block text-sm font-medium text-gray-700">
                  Material Title
                </label>
                <Input
                  value={material.title}
                  onChange={(e) => {
                    const newMaterials = [...materials];
                    newMaterials[index].title = e.target.value;
                    setMaterials(newMaterials);
                  }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Material Type
                </label>
                <Select
                  value={material.type}
                  onValueChange={(value) => {
                    const newMaterials = [...materials];
                    newMaterials[index].type = value;
                    setMaterials(newMaterials);
                  }}
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
                <label className="block text-sm font-medium text-gray-700">
                  Material URL
                </label>
                <Input
                  type="url"
                  value={material.url}
                  onChange={(e) => {
                    const newMaterials = [...materials];
                    newMaterials[index].url = e.target.value;
                    setMaterials(newMaterials);
                  }}
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
