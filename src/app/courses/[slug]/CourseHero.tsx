import { useState } from "react";
import {
  BookOpen,
  Award,
  Clock,
  Play,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { VideoHero } from "@/components/VideoHero";
import { Course, User, Video } from "./types";

interface CourseHeroProps {
  course: Course;
  totalDuration: number;
  isEnrolled: boolean;
  user: User | null;
  selectedVideo: Video | null;
  onEnroll: () => void;
}

export function CourseHero({
  course,
  totalDuration,
  isEnrolled,
  user,
  selectedVideo,
  onEnroll,
}: CourseHeroProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-black text-white py-4 md:py-12">
      <div className="container mx-auto px-2">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <VideoHero
              course={course}
              isLoggedIn={!!user}
              selectedVideo={selectedVideo}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-start justify-between">
              {selectedVideo ? (
                <h2 className="font-sembold">Now Playing</h2>
              ) : (
                <h1 className="md:text-xl font-bold">{course.title}</h1>
              )}
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="md:hidden"
              >
                {isExpanded ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </Button>
            </div>
            {isExpanded && (
              <div>
                {selectedVideo ? (
                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <h3 className="mb-2">{selectedVideo.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Play className="w-4 h-4" />
                      <span>{selectedVideo.duration} minutes</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-lg mb-4">{course.description}</p>
                )}
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{Math.ceil(totalDuration / 60)}h total</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span>{course.lessons.length} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    <span>Certificate</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={
                      course.instructor.email
                        ? `https://www.gravatar.com/avatar/${Buffer.from(
                            course.instructor.email
                          ).toString("hex")}?d=identicon`
                        : "/avatar-placeholder.png"
                    }
                    alt={course.instructor.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{course.instructor.name}</p>
                    <p className="text-sm text-gray-300">Course Instructor</p>
                  </div>
                </div>
              </div>
            )}

            {!isEnrolled && user && (
              <Button size="lg" className="w-full border" onClick={onEnroll}>
                {course.isFree
                  ? "Enroll Now (Free)"
                  : `Enroll for $${course.price.toFixed(2)}`}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
