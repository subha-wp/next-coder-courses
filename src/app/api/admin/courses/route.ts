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

    const course = await prisma.course.create({
      data: {
        ...data,
        instructorId: user.id,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("Create course error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
