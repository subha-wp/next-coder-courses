/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";

import { useState, useCallback } from "react";
import { CourseHero } from "./CourseHero";
import { CourseContent } from "./CourseContent";
import { CourseSidebar } from "./CourseSidebar";

export default function CoursePageContent({
  course,
  user,
  isEnrolled,
  totalDuration,
}) {
  const [selectedVideo, setSelectedVideo] = useState();

  const handleVideoSelect = useCallback((video) => {
    setSelectedVideo(video);
  }, []);

  return (
    <>
      <CourseHero
        course={course}
        totalDuration={totalDuration}
        isEnrolled={isEnrolled}
        user={user}
        selectedVideo={selectedVideo}
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
