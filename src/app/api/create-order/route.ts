/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Razorpay from "razorpay";

export async function POST(request) {
  try {
    const { amount } = await request.json(); // Amount in paisa (e.g., 50000 for ₹500)

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount, // Amount in paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return new Response(JSON.stringify({ orderId: order.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response(JSON.stringify({ error: "Failed to create order" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
