// app/thank-you/page.tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // shadcn/ui Card
import { CheckCircle2, MessageCircle } from "lucide-react"; // Icons

import { motion } from "framer-motion"; // Animations

export default function ThankYouPage() {
  // Facebook Pixel tracking
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Purchase", {
        value: 10.0, // Replace with dynamic value if needed
        currency: "INR",
      });
    }
  }, []);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // WhatsApp URL with pre-filled message
  const whatsappNumber = "7001070713";
  const whatsappMessage = encodeURIComponent(
    "Hi! I just completed my purchase and would like to follow up. Thanks!"
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg"
      >
        <Card className="bg-gray-800 border-gray-700 shadow-xl rounded-xl overflow-hidden">
          {/* Header */}
          <CardHeader className="relative text-center bg-gradient-to-b from-gray-700 to-gray-800 py-8">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-20 h-20 text-green-400 drop-shadow-md" />
            </div>
            <CardTitle className="text-3xl font-semibold text-white tracking-tight">
              Thank You!
            </CardTitle>
            <p className="text-sm text-gray-400 mt-1">
              Your purchase was successful.
            </p>
          </CardHeader>

          {/* Content */}
          <CardContent className="text-center py-8 space-y-6">
            <div className="space-y-2">
              <p className="text-gray-200 text-lg">
                We’re excited to have you on board! Please Message on WhatsApp
                we will give course credentilas
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-700/50 p-4 rounded-lg text-left text-gray-300 text-sm"></div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Message Us on WhatsApp
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
