import { Award, FileText, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Course } from "./types";

interface CourseSidebarProps {
  isEnrolled: boolean;
  course: Course;
}

export function CourseSidebar({ isEnrolled }: CourseSidebarProps) {
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
