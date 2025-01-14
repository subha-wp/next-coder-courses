import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";

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

    const sessionId = id;

    await prisma.streamSession.delete({
      where: { id: sessionId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Delete session error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

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
    const sessionId = id;

    const session = await prisma.streamSession.update({
      where: { id: sessionId },
      data,
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error("Update session error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
