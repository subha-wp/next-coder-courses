"use client";

import { BarChart, Users, Zap } from "lucide-react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export function FeaturedSolutions() {
  const animationRef = useScrollAnimation();

  const solutions = [
    {
      title: "Executive Leadership",
      icon: Users,
      description: "Develop visionary leaders to drive organizational success.",
    },
    {
      title: "Data Science & AI",
      icon: BarChart,
      description:
        "Harness the power of data and AI for strategic decision-making.",
    },
    {
      title: "Digital Transformation",
      icon: Zap,
      description: "Navigate the digital landscape and drive innovation.",
    },
  ];

  return (
    <section ref={animationRef} className="py-20 bg-muted animate-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Enterprise-Grade Learning Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, i) => (
            <div
              key={i}
              className="bg-card rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="p-8">
                <solution.icon className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-2xl font-semibold mb-4">
                  {solution.title}
                </h3>
                <p className="text-card-foreground mb-6">
                  {solution.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
