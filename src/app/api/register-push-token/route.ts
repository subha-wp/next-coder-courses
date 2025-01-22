/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { token } = body;

    if (!token) {
      console.log("Token is missing");
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    console.log("Attempting to upsert token:", token);

    const result = await prisma.pushToken.upsert({
      where: { token },
      update: { lastUsed: new Date() },
      create: {
        token,
        lastUsed: new Date(),
      },
    });

    console.log("Upsert result:", result);

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error("Error registering push token:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
