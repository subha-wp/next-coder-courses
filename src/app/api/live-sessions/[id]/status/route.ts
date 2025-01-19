import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { user } = await validateRequest();

    if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { status } = await request.json();

    if (!["SCHEDULED", "LIVE", "ENDED"].includes(status)) {
      return new NextResponse("Invalid status", { status: 400 });
    }

    const session = await prisma.streamSession.findUnique({
      where: { id: id },
    });

    if (!session) {
      return new NextResponse("Session not found", { status: 404 });
    }

    // Only allow instructors to update their own sessions
    if (user.role === "INSTRUCTOR" && session.instructorId !== user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedSession = await prisma.streamSession.update({
      where: { id: id },
      data: {
        status,
        endTime: status === "ENDED" ? new Date() : undefined,
      },
    });

    return NextResponse.json(updatedSession);
  } catch (error) {
    console.error("Update session status error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
