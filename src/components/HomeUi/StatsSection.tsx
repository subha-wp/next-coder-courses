"use client";

import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export function StatsSection() {
  const animationRef = useScrollAnimation();

  return (
    <section
      ref={animationRef}
      className="py-20 bg-background animate-on-scroll"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-card p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <h3 className="text-4xl font-bold text-primary mb-2">1000+</h3>
            <p className="text-xl text-card-foreground">Global Enterprises</p>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <h3 className="text-4xl font-bold text-primary mb-2">1M+</h3>
            <p className="text-xl text-card-foreground">
              Professionals Trained
            </p>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <h3 className="text-4xl font-bold text-primary mb-2">99%</h3>
            <p className="text-xl text-card-foreground">
              Client Retention Rate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
