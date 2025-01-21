import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = await request.json();

    // Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return new NextResponse("Invalid payment signature", { status: 400 });
    }

    // Create enrollment and payment records
    const [enrollment, payment] = await prisma.$transaction([
      prisma.enrollment.create({
        data: {
          userId: user.id,
          courseId,
          enrollmentType: "PAID",
        },
      }),
      prisma.payment.create({
        data: {
          userId: user.id,
          courseId,
          amount: 0,
          status: "COMPLETED",
        },
      }),
    ]);

    return NextResponse.json({ enrollment, payment });
  } catch (error) {
    console.error("Payment verification error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
