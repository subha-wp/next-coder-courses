"use client";

import { useState, useEffect } from "react";
import JoinNowButton from "./JoinNowButton";

interface StickyJoinNowProps {
  amount: number; // Discounted amount in rupees
}

export default function StickyJoinNow({ amount }: StickyJoinNowProps) {
  const [isSticky, setIsSticky] = useState(false);
  const originalPrice = 999; // Actual price in rupees

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollThreshold = windowHeight * 0.2; // 20% of page height

      setIsSticky(scrollPosition > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  return (
    <div className="relative">
      {isSticky && (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-gray-800 shadow-lg border-t border-gray-700">
          <div className="flex justify-center items-center h-16 max-w-5xl mx-auto px-4">
            <div className="flex items-center space-x-4">
              <p className=" text-sm md:text-base">
                <span className="line-through font-semibold">
                  ₹{originalPrice}
                </span>{" "}
                <span className="text-yellow-400">Limited Time Offer!</span>
              </p>
              <JoinNowButton amount={amount} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
