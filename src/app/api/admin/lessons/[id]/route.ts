/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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

    // First, update the lesson
    const lesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        title: data.title,
        content: data.content,
        duration: data.duration,
        isFree: data.isFree,
      },
    });

    // Delete existing videos and materials
    await prisma.lessonVideo.deleteMany({
      where: { lessonId },
    });

    await prisma.lessonMaterial.deleteMany({
      where: { lessonId },
    });

    // Create new videos
    if (data.videos && data.videos.length > 0) {
      await prisma.lessonVideo.createMany({
        data: data.videos.map((video: any, index: number) => ({
          title: video.title,
          url: video.url,
          duration: video.duration,
          order: index + 1,
          lessonId,
        })),
      });
    }

    // Create new materials
    if (data.materials && data.materials.length > 0) {
      await prisma.lessonMaterial.createMany({
        data: data.materials.map((material: any) => ({
          title: material.title,
          type: material.type,
          url: material.url,
          lessonId,
        })),
      });
    }

    // Fetch the updated lesson with its relations
    const updatedLesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        videos: {
          orderBy: {
            order: "asc",
          },
        },
        materials: true,
      },
    });

    return NextResponse.json(updatedLesson);
  } catch (error) {
    console.error("Update lesson error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
