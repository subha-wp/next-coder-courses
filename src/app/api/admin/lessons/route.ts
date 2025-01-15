/* eslint-disable @typescript-eslint/no-explicit-any */
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

    // Create the lesson
    const lesson = await prisma.lesson.create({
      data: {
        title: data.title,
        content: data.content,
        courseId: data.courseId,
        duration: data.duration,
        isFree: data.isFree,
      },
    });

    // Create videos if provided
    if (data.videos && data.videos.length > 0) {
      await prisma.lessonVideo.createMany({
        data: data.videos.map((video: any, index: number) => ({
          title: video.title,
          url: video.url,
          duration: video.duration,
          order: index + 1,
          lessonId: lesson.id,
        })),
      });
    }

    // Create materials if provided
    if (data.materials && data.materials.length > 0) {
      await prisma.lessonMaterial.createMany({
        data: data.materials.map((material: any) => ({
          title: material.title,
          type: material.type,
          url: material.url,
          lessonId: lesson.id,
        })),
      });
    }

    // Fetch the created lesson with its relations
    const createdLesson = await prisma.lesson.findUnique({
      where: { id: lesson.id },
      include: {
        videos: {
          orderBy: {
            order: "asc",
          },
        },
        materials: true,
      },
    });

    return NextResponse.json(createdLesson);
  } catch (error) {
    console.error("Create lesson error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
