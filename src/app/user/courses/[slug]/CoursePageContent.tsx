"use client";

import { useState, useCallback } from "react";
import { CourseHero } from "./CourseHero";
import { CourseContent } from "./CourseContent";
import { CourseSidebar } from "./CourseSidebar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Course, User, Video } from "./types";

interface CoursePageContentProps {
  course: Course;
  user: User | null;
  isEnrolled: boolean;
  totalDuration: number;
}

export default function CoursePageContent({
  course,
  user,
  isEnrolled,
  totalDuration,
}: CoursePageContentProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const router = useRouter();

  const handleVideoSelect = useCallback((video: Video) => {
    setSelectedVideo(video);
  }, []);

  const handleCloseVideo = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  const handleEnroll = async () => {
    try {
      const response = await fetch("/api/courses/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: course.id,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      toast.success("Successfully enrolled in the course!");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to enroll in course"
      );
    }
  };

  return (
    <>
      <CourseHero
        course={course}
        totalDuration={totalDuration}
        isEnrolled={isEnrolled}
        user={user}
        selectedVideo={selectedVideo}
        onEnroll={handleEnroll}
      />
      <div className="container mx-auto px-2 py-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <CourseContent
              course={course}
              isEnrolled={isEnrolled}
              user={user}
              onVideoSelect={handleVideoSelect}
            />
          </div>
          <CourseSidebar
            isEnrolled={isEnrolled}
            course={course}
            selectedVideo={selectedVideo}
            onClose={handleCloseVideo}
          />
        </div>
      </div>
    </>
  );
}
