"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, DollarSign } from "lucide-react";

interface LiveSessionCardProps {
  session: {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    price: number;
    startTime: Date;
    endTime: Date | null;
    status: "SCHEDULED" | "LIVE" | "ENDED";
    course: {
      title: string;
    };
    instructor: {
      name: string;
    };
  };
}

export default function LiveSessionCard({ session }: LiveSessionCardProps) {
  const router = useRouter();

  const isLive = session.status === "LIVE";
  const startTime = new Date(session.startTime);
  const endTime = session.endTime ? new Date(session.endTime) : null;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="relative aspect-video">
        <Image
          src={session.thumbnailUrl || "/session-placeholder.jpg"}
          alt={session.title}
          fill
          className="object-cover rounded-t-lg"
        />
        {isLive && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
            LIVE
          </span>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{session.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {session.description}
        </p>
        <p className="text-muted-foreground mb-4">
          Course: {session.course.title}
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Instructor: {session.instructor.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(startTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              {formatTime(startTime)}
              {endTime && ` - ${formatTime(endTime)}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>${session.price.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => router.push(`/live-sessions/${session.id}`)}
          variant={isLive ? "default" : "secondary"}
        >
          {isLive ? "Join Session" : "View Details"}
        </Button>
      </CardFooter>
    </Card>
  );
}
