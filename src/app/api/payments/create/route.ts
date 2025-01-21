import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseId } = await request.json();

    // Get course details
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    if (course.isFree) {
      return new NextResponse("Course is free", { status: 400 });
    }

    // Create Razorpay order
    const amount = Math.round(course.price * 100); // Convert to smallest currency unit (paise)
    const currency = "INR";
    const options = {
      amount,
      currency,
      receipt: `course_${courseId}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
