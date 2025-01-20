import { Award, FileText, Clock, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Course, Video } from "./types";

interface CourseSidebarProps {
  isEnrolled: boolean;
  course: Course;
  selectedVideo: Video | null;
  onClose: () => void;
}

export function CourseSidebar({
  isEnrolled,
  selectedVideo,
  onClose,
}: CourseSidebarProps) {
  if (selectedVideo) {
    return (
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold">Now Playing</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close video info"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          <h4 className="font-medium">{selectedVideo.title}</h4>
          {selectedVideo.duration && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{selectedVideo.duration} minutes</span>
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {isEnrolled && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Your Progress</h3>
          <Progress value={33} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            4 of 12 lessons completed
          </p>
        </Card>
      )}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Course Features</h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>Self-paced learning</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <Award className="w-4 h-4 text-muted-foreground" />
            <span>Certificate of completion</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span>Downloadable resources</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
