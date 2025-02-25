"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Navigation } from "lucide-react";
import { useRouter } from "next/navigation";

export default function JoinNowButton({ amount }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    // Load Razorpay checkout script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load Razorpay SDK. Please try again.");
      setLoading(false);
      return;
    }

    // Fetch order from API
    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount * 100 }), // Convert to paisa
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Client-side key (public)
        amount: amount * 100, // Amount in paisa
        currency: "INR",
        name: "NextCoder",
        image: "/nextcoder-logo-512.png",
        description: "Join Our 7-Day Intensive Program",
        order_id: data.orderId,
        handler: (response) => {
          // Handle successful payment
          console.log("Payment Successful:", response);
          router.push("/trading-course/thank-you");
        },
        theme: {
          color: "#9333ea", // Blue for a professional dark theme
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="bg-purple-600 hover:bg-purple-700 text-white px-8"
    >
      <Navigation className="mr-2 h-5 w-5" />
      {loading ? "Processing..." : `Join Now - ₹${amount}`}
    </Button>
  );
}
