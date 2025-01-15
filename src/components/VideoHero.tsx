/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { VideoPlayer } from "@/components/VideoPlayer";

interface VideoHeroProps {
  course: any;
  isLoggedIn: boolean;
  selectedVideo: { url: string; title: string } | null;
}

export function VideoHero({
  course,
  isLoggedIn,
  selectedVideo,
}: VideoHeroProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = useCallback(() => {
    setIsPlaying(true);
  }, []);

  if (selectedVideo && isPlaying) {
    return (
      <div className="relative aspect-video">
        <VideoPlayer
          videoUrl={selectedVideo.url}
          isLoggedIn={isLoggedIn}
          lessonTitle={selectedVideo.title}
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video">
      <Image
        src={course.thumbnailUrl || "/course-placeholder.jpg"}
        alt={course.title}
        fill
        className="rounded-lg object-cover"
      />
      {selectedVideo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <button
            onClick={handlePlayClick}
            className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Play Video: {selectedVideo.title}
          </button>
        </div>
      )}
    </div>
  );
}
