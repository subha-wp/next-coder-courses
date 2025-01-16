/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { BookOpen, Award, Clock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { VideoHero } from "@/components/VideoHero";

interface Instructor {
  name: string;
  email?: string;
}

interface Lesson {
  id: string;
  title: string;
  // Add other lesson properties as needed
}

interface Course {
  title: string;
  description: string;
  instructor: Instructor;
  lessons: Lesson[];
  price: number;
  isFree: boolean;
}

interface CourseHeroProps {
  course: Course;
  totalDuration: number;
  isEnrolled: boolean;
  user: any; // Replace with proper user type if available
  selectedVideo: any; // Replace with proper video type if available
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
  return (
    <div className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <VideoHero
              course={course}
              isLoggedIn={!!user}
              selectedVideo={selectedVideo}
            />
          </div>

          <div className="">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {course.title}
            </h1>
            <p className="text-lg mb-6">{course.description}</p>
            <div className="flex flex-wrap gap-4 mb-6">
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
            <div className="flex items-center gap-4 mb-6">
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
            {!isEnrolled && user && (
              <Button
                size="lg"
                className="w-full md:w-auto border"
                onClick={onEnroll}
              >
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
