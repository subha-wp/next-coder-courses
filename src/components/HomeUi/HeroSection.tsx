"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Link from "next/link";

export function HeroSection() {
  const animationRef = useScrollAnimation();

  return (
    <section className="bg-black text-white py-16  relative overflow-hidden">
      {/* Neon light effect background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-violet-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-32 md:w-64 h-32 md:h-64 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={animationRef}
          className="max-w-5xl mx-auto text-center animate-on-scroll"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-glow">
            Revolutionize Your Workforce with nextCoder
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Empower your Skills with world-class corporate training and
            development solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#"
              className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-6 font-semibold rounded-md shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300"
            >
              Download App
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
