import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LiveSessionCardProps {
  session: {
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    course: {
      title: string;
    };
    instructor: {
      name: string;
    };
  };
}

export default function LiveSessionCard({ session }: LiveSessionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{session.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">
          Course: {session.course.title}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          Instructor: {session.instructor.name}
        </p>
        <p className="mb-2">Start: {session.startTime.toLocaleString()}</p>
        <p>End: {session.endTime.toLocaleString()}</p>
      </CardContent>
      <CardFooter>
        <Button>Join Session</Button>
      </CardFooter>
    </Card>
  );
}
