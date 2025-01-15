import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { user } = await validateRequest();

    if (!user || user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await request.json();
    const lessonId = id;

    const lesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        title: data.title,
        content: data.content,
        duration: data.duration,
      },
    });

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("Update lesson error:", error);
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

    const lessonId = id;

    await prisma.lesson.delete({
      where: { id: lessonId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Delete lesson error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
