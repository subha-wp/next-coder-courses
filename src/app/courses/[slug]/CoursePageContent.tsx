/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";

import { useState, useCallback } from "react";
import { CourseHero } from "./CourseHero";
import { CourseContent } from "./CourseContent";
import { CourseSidebar } from "./CourseSidebar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CoursePageContent({
  course,
  user,
  isEnrolled,
  totalDuration,
}) {
  const [selectedVideo, setSelectedVideo] = useState();
  const router = useRouter();

  const handleVideoSelect = useCallback((video) => {
    setSelectedVideo(video);
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
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <CourseContent
              course={course}
              isEnrolled={isEnrolled}
              user={user}
              onVideoSelect={handleVideoSelect}
            />
          </div>
          <CourseSidebar isEnrolled={isEnrolled} course={course} />
        </div>
      </div>
    </>
  );
}
