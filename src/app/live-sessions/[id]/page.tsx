import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import LiveSessionContent from "./LiveSessionContent";

export default async function LiveSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user } = await validateRequest();

  if (!user) {
    redirect("/auth/login");
  }

  const session = await prisma.streamSession.findUnique({
    where: { id: id },
    include: {
      instructor: {
        select: {
          id: true,
          name: true,
        },
      },
      course: {
        select: {
          title: true,
        },
      },
      participants: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!session) {
    redirect("/live-sessions");
  }

  // Add participant if not already added
  const existingParticipant = await prisma.streamParticipant.findUnique({
    where: {
      sessionId_userId: {
        sessionId: session.id,
        userId: user.id,
      },
    },
  });

  if (!existingParticipant) {
    await prisma.streamParticipant.create({
      data: {
        sessionId: session.id,
        userId: user.id,
      },
    });
  }

  const isAdmin = user.role === "ADMIN" || user.id === session.instructorId;

  return (
    <LiveSessionContent
      session={session}
      currentUser={user}
      isAdmin={isAdmin}
    />
  );
}
