import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { hash, verify } from "@node-rs/argon2";

export async function PUT(request: Request) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await request.json();
    const { currentPassword, newPassword } = data;

    // Get user with password
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        hashedPassword: true,
      },
    });

    if (!dbUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Verify current password
    const validPassword = await verify(dbUser.hashedPassword, currentPassword);
    if (!validPassword) {
      return new NextResponse("Invalid current password", { status: 400 });
    }

    // Hash new password
    const hashedPassword = await hash(newPassword);

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: {
        hashedPassword,
      },
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Update password error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
