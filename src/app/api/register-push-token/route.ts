/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Store the token in your database
    await prisma.pushToken.upsert({
      where: { token },
      update: { lastUsed: new Date() },
      create: {
        token,
        lastUsed: new Date(),
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error registering push token:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
