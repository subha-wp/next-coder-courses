"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AppleIcon, PlayIcon } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function MobileAppSection() {
  const sectionRef = useScrollAnimation();

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-black text-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Take Your Learning Journey
              <span className="block text-violet-400 text-shadow-[0_0_20px_rgba(167,139,250,0.5)]">
                Anywhere, Anytime
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Download the LearnHub mobile app and transform your professional
              skills on the go. Access courses, track progress, and learn at
              your convenience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="default"
                size="lg"
                className="relative overflow-hidden group w-full sm:w-auto"
              >
                <AppleIcon className="w-6 h-6 mr-2" />
                <div>
                  <span className="block text-xs">Download on the</span>
                  <span className="block text-base font-semibold">
                    App Store
                  </span>
                </div>
                <div className="absolute inset-0 bg-primary/10 translate-y-full transition-transform group-hover:translate-y-0" />
              </Button>
              <Button
                variant="default"
                size="lg"
                className="relative overflow-hidden group w-full sm:w-auto"
              >
                <PlayIcon className="w-6 h-6" />
                <div>
                  <span className="block text-xs">Get it on</span>
                  <span className="block text-base font-semibold">
                    Google Play
                  </span>
                </div>
                <div className="absolute inset-0 bg-primary/10 translate-y-full transition-transform group-hover:translate-y-0" />
              </Button>
            </div>
          </div>

          {/* Phone Mockups */}
          <div className="lg:w-1/2 relative mt-[250px] md:mt-1">
            <div className="relative w-full aspect-square max-w-[400px] lg:max-w-[600px] mx-auto">
              {/* First Phone */}
              <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-1/2 w-48 md:w-72 h-[350px] md:h-[600px] transform rotate-[-12deg] transition-all duration-700 ">
                <div className="relative w-full h-full bg-black rounded-[3rem] border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden">
                  <Image
                    src="/nextcoder-login-ui.png"
                    alt="LearnHub mobile app course screen"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Second Phone */}
              <div className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-1/2 w-48 md:w-72 h-[350px] md:h-[600px] transform rotate-[12deg] transition-all duration-700 delay-200 ">
                <div className="relative w-full h-full bg-black rounded-[3rem] border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden">
                  <Image
                    src="/nextcoder-login-ui.png"
                    alt="LearnHub mobile app progress screen"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/4 right-1/4 w-24 md:w-32 h-24 md:h-32 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 left-1/4 w-24 md:w-32 h-24 md:h-32 bg-white/20 rounded-full blur-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
