"use client";

import React from "react";

export default function AnimatedBrand() {
  return (
    <div className="flex items-center justify-center pt-10 bg-black overflow-hidden">
      <h1
        className="text-6xl md:text-8xl font-bold relative animate-gradient"
        aria-label="nextCoder"
      >
        nextCoder
      </h1>
      <style jsx>{`
        .animate-gradient {
          background: linear-gradient(to right, #333333, #ffffff, #333333);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: gradient 6s linear infinite;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
