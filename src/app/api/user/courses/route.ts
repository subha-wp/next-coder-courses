import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const enrolledCourses = await prisma.enrollment.findMany({
      where: {
        userId: user.id,
      },
      include: {
        course: {
          include: {
            instructor: {
              select: {
                name: true,
              },
            },
            lessons: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(enrolledCourses);
  } catch (error) {
    console.error("Get enrolled courses error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
