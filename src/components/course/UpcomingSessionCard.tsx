import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UpcomingSessionCardProps {
  session: {
    id: string;
    title: string;
    startTime: Date;
    course: {
      title: string;
    };
    instructor: {
      name: string;
    };
  };
}

export function UpcomingSessionCard({ session }: UpcomingSessionCardProps) {
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
        <p className="text-sm">
          Starts at: {session.startTime.toLocaleString()}
        </p>
      </CardContent>
      <CardFooter>
        <Button>Join Session</Button>
      </CardFooter>
    </Card>
  );
}
