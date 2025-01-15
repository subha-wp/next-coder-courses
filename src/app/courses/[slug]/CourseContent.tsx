/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Lock, Play } from "lucide-react";
import Link from "next/link";

export function CourseContent({ course, isEnrolled, user, onVideoSelect }) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Course Content</h2>
      <div className="space-y-6">
        {course.lessons.map((lesson, index) => {
          const isLessonAccessible = isEnrolled || lesson.isFree;

          return (
            <div key={lesson.id} className="border-b last:border-0 pb-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div>
                    <h3 className="font-semibold">
                      {index + 1}. {lesson.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {lesson.duration
                        ? `${lesson.duration} minutes`
                        : "Duration not set"}
                    </p>
                  </div>
                  {!isLessonAccessible && (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                  {lesson.isFree && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      Free
                    </span>
                  )}
                </div>
                {isLessonAccessible ? (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/courses/${course.slug}/lessons/${lesson.id}`}>
                      {isEnrolled ? "Continue" : "Preview"}
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    Locked
                  </Button>
                )}
              </div>
              {isLessonAccessible && (
                <>
                  {lesson.videos.length > 0 && (
                    <div className="space-y-2 mt-4 mb-4">
                      <h4 className="font-medium">Videos</h4>
                      {lesson.videos.map((video: any) => (
                        <div
                          key={video.id}
                          className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary"
                          onClick={() => onVideoSelect(video)}
                        >
                          <Play className="w-4 h-4" />
                          <span>{video.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {lesson.materials.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <h4 className="font-medium">Materials</h4>
                      {lesson.materials.map((material) => (
                        <div
                          key={material.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <FileText className="w-4 h-4" />
                          <span>{material.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
