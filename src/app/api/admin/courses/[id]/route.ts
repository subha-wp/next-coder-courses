import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();

    if (!user || user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await request.json();
    const courseId = params.id;

    const course = await prisma.course.update({
      where: { id: courseId },
      data,
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("Update course error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { user } = await validateRequest();

    if (!user || user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseId = id;

    // Delete related records first
    await prisma.enrollment.deleteMany({
      where: { courseId },
    });

    await prisma.lesson.deleteMany({
      where: { courseId },
    });

    await prisma.streamSession.deleteMany({
      where: { courseId },
    });

    // Delete the course
    await prisma.course.delete({
      where: { id: courseId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Delete course error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
