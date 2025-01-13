"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CheckCircle, Globe } from "lucide-react";

export function GlobalReach() {
  const animationRef = useScrollAnimation();

  const features = [
    "Customized content for regional markets",
    "24/7 global support",
    "Localized learning paths",
    "Cross-cultural leadership training",
  ];

  return (
    <section
      ref={animationRef}
      className="py-20 bg-background animate-on-scroll"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-3xl font-bold mb-6">
              Global Reach, Local Impact
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              LearnHub delivers tailored learning experiences to enterprises
              across 50+ countries, supporting 30+ languages.
            </p>
            <ul className="space-y-4">
              {features.map((item, i) => (
                <li key={i} className="flex items-center">
                  <CheckCircle className="text-primary mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2">
            <Globe className="w-full h-auto text-primary animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
}
