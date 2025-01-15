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
import { Clock, BookOpen } from "lucide-react";

type CourseCardProps = {
  course: {
    id: string;
    title: string;
    description: string;
    price: number;
    thumbnailUrl: string;
    instructor: {
      name: string;
    };
    slug: string;
    totalDuration: number;
    lessonCount: number;
  };
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-video w-full">
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
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-2">
          By {course.instructor.name}
        </p>
        <p className="text-sm line-clamp-2 mb-4">{course.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{Math.ceil(course.totalDuration / 60)}h</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.lessonCount} lessons</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="font-bold text-lg">${course.price.toFixed(2)}</span>
        <Button asChild>
          <Link href={`/courses/${course.slug}`}>View Course</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
