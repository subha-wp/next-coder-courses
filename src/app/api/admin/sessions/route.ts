import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { user } = await validateRequest();

    if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await request.json();
    const { title, description, thumbnailUrl, courseId, price, startTime } =
      data;

    // Validate course exists and user has access
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    if (user.role === "INSTRUCTOR" && course.instructorId !== user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const session = await prisma.streamSession.create({
      data: {
        title,
        description,
        thumbnailUrl,
        courseId,
        price,
        startTime: new Date(startTime),
        instructorId: user.id,
        status: "SCHEDULED",
      },
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error("Create session error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
