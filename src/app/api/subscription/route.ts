/* eslint-disable @typescript-eslint/no-unused-vars */
import { validateRequest } from "@/lib/auth";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  try {
    // Create a subscription token
    const subscription = await razorpay.subscriptions.create({
      plan_id: "plan_Q6JdUo0bbA58ni", // Monthly plan ID
      customer_notify: 1,
      quantity: 1,
      total_count: 12, // 12 months
      notes: {
        userId: "tst23445",
      },
    });

    return NextResponse.json({ subscriptionId: subscription.id });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
