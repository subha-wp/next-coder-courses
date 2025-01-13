"use client";

import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function CTASection() {
  const animationRef = useScrollAnimation();

  return (
    <section
      ref={animationRef}
      className="bg-black text-white py-16 md:py-24 relative overflow-hidden animate-on-scroll"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-primary/10" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          Ready to Elevate Your Workforce?
        </h2>
        <p className="text-lg md:text-xl mb-6 md:mb-8 text-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          Join the ranks of Fortune 500 companies transforming their teams with
          LearnHub&apos;s enterprise solutions.
        </p>
        <div className="flex justify-center">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300 font-bold text-lg"
          >
            Join Now
          </Button>
        </div>
      </div>
    </section>
  );
}
