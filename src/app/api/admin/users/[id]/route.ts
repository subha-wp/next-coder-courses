import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();

    if (!user || user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = params.id;

    // Delete user's sessions first
    await prisma.session.deleteMany({
      where: { userId },
    });

    // Delete user's enrollments
    await prisma.enrollment.deleteMany({
      where: { userId },
    });

    // Delete user's payments
    await prisma.payment.deleteMany({
      where: { userId },
    });

    // Delete user's stream sessions
    await prisma.streamSession.deleteMany({
      where: { instructorId: userId },
    });

    // Delete user's courses
    await prisma.course.deleteMany({
      where: { instructorId: userId },
    });

    // Finally, delete the user
    await prisma.user.delete({
      where: { id: userId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Delete user error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
