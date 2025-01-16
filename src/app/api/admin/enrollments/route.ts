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
    const { userId, courseId, enrollmentType } = data;

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return new NextResponse("User not found", { status: 404 });
    }

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
        userId,
        courseId,
      },
    });

    if (existingEnrollment) {
      return new NextResponse("User already enrolled in this course", {
        status: 400,
      });
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        enrollmentType,
        enrolledBy: user.id,
      },
    });

    // If it's a paid enrollment, create a completed payment record
    if (enrollmentType === "PAID") {
      await prisma.payment.create({
        data: {
          userId,
          courseId,
          amount: course.price,
          status: "COMPLETED",
        },
      });
    }

    return NextResponse.json(enrollment);
  } catch (error) {
    console.error("Create enrollment error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
