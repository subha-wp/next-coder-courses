"use client";

import { Award } from "lucide-react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export function WhyChooseUs() {
  const animationRef = useScrollAnimation();

  const features = [
    {
      title: "AI-Powered Personalization",
      description: "Tailored learning experiences for each employee.",
    },
    {
      title: "Enterprise-Grade Security",
      description: "SOC 2 and ISO 27001 certified platform.",
    },
    {
      title: "Seamless Integration",
      description: "Works with your existing LMS and HR systems.",
    },
    {
      title: "Real-Time Analytics",
      description: "Comprehensive dashboards for tracking ROI and performance.",
    },
  ];

  return (
    <section
      ref={animationRef}
      className="py-20 bg-black text-white animate-on-scroll"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          Why Global Enterprises Choose LearnHub
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="text-center bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300"
            >
              <Award className="w-16 h-16 text-white mx-auto mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
              <h3 className="text-xl font-semibold mb-2 text-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                {feature.title}
              </h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
