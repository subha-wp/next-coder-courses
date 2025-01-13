import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    price: number;
    instructor: {
      name: string;
    };
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">
          Instructor: {course.instructor.name}
        </p>
        <p className="mb-4">{course.description}</p>
        <p className="font-bold">Price: ${course.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/courses/${course.id}`}>
          <Button>View Course</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
