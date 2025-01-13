import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EnrolledCourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
  };
}

export function EnrolledCourseCard({ course }: EnrolledCourseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{course.description}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/courses/${course.id}`}>
          <Button>Continue Learning</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
