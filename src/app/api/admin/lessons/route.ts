import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { user } = await validateRequest();

    if (!user || user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await request.json();

    const lesson = await prisma.lesson.create({
      data: {
        title: data.title,
        content: data.content,
        courseId: data.courseId,
      },
    });

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("Create lesson error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
