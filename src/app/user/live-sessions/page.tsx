/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import LiveSessionCard from "./LiveSessionCard";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function LiveSessionsPage() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/auth/login");
  }

  const liveSessions = await prisma.streamSession.findMany({
    where: {
      OR: [{ status: "SCHEDULED" }, { status: "LIVE" }],
    },
    include: {
      course: {
        select: {
          title: true,
        },
      },
      instructor: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      startTime: "asc",
    },
  });

  const canCreateSession = user.role === "ADMIN" || user.role === "INSTRUCTOR";

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Live Sessions</h1>
        {canCreateSession && (
          <Button asChild>
            <Link href="/live-sessions/new">Create Session</Link>
          </Button>
        )}
      </div>

      {liveSessions.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No upcoming live sessions scheduled.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveSessions.map((session) => (
            <LiveSessionCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
}
