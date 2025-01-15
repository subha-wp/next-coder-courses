"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  isLoggedIn: boolean;
  lessonTitle: string;
}

export function VideoPlayer({
  videoUrl,
  isLoggedIn,
  lessonTitle,
}: VideoPlayerProps) {
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handlePlayClick = () => {
    if (!isLoggedIn) {
      setShowLoginDialog(true);
    }
  };

  return (
    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
      <video
        src={videoUrl}
        className="w-full h-full object-cover"
        controls={isLoggedIn}
        onClick={handlePlayClick}
      />
      {!isLoggedIn && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Button
            onClick={handlePlayClick}
            size="lg"
            className="flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Play Video
          </Button>
        </div>
      )}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              Please log in to watch the video for the lesson: {lessonTitle}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button asChild>
              <a href="/auth/login">Log In</a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
