/* eslint-disable react/no-unescaped-entities */
"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Testimonials() {
  const animationRef = useScrollAnimation();

  const testimonials = [
    {
      quote:
        "nextCoder has been instrumental in our digital transformation journey. Their cutting-edge courses and personalized approach have accelerated our workforce's capabilities.",
      author: "Emily Chen",
      position: "CTO, TechNova Industries",
    },
    {
      quote:
        "The ROI on our nextCoder partnership has been exceptional. We've seen a 40% increase in employee productivity and innovation output.",
      author: "Michael Okoye",
      position: "Chief Learning Officer, GlobalCorp",
    },
  ];

  return (
    <section ref={animationRef} className="py-20 bg-muted animate-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Global Leaders Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-card p-8 rounded-lg shadow-lg">
              <blockquote className="text-lg text-card-foreground mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div className="font-semibold">{testimonial.author}</div>
              <div className="text-sm text-muted-foreground">
                {testimonial.position}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
