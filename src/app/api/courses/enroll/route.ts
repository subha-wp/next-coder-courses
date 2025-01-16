import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await request.json();
    const { courseId } = data;

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    // Check if user is already enrolled
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        userId: user.id,
        courseId,
      },
    });

    if (existingEnrollment) {
      return new NextResponse("Already enrolled in this course", {
        status: 400,
      });
    }

    // Determine enrollment type based on course settings
    const enrollmentType = course.isFree ? "FREE" : "PAID";

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId,
        enrollmentType,
      },
    });

    // If it's a paid course, create a payment record
    if (!course.isFree) {
      await prisma.payment.create({
        data: {
          userId: user.id,
          courseId,
          amount: course.price,
          status: "COMPLETED",
        },
      });
    }

    return NextResponse.json(enrollment);
  } catch (error) {
    console.error("Course enrollment error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
