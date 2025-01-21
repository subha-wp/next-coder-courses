/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";

type EnrolledCourseCardProps = {
  course: {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    instructor: {
      name: string;
    };
    slug: string;
    totalDuration: number;
    lessonCount: number;
    progress: number;
  };
};

export default function EnrolledCourseCard({
  course,
}: EnrolledCourseCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 border-primary p-1">
      <div className="relative aspect-video w-full border-b border-primary">
        <Image
          src={course.thumbnailUrl || "/course-placeholder.jpg"}
          alt={course.title}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{course.title}</CardTitle>
      </CardHeader>
      {/* <CardContent className="flex-grow">
        <div className="flex items-center gap-2">
          <BarChart className="w-4 h-4 text-primary" />
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {course.progress}%
          </span>
        </div>
      </CardContent> */}
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/user/courses/${course.slug}`}>Continue Learning</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
