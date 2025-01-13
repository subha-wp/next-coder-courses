"use client";

import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function FeaturedCourses() {
  const animationRef = useScrollAnimation();

  const courses = [
    {
      title: "Strategic Management",
      category: "Leadership",
      duration: "8 weeks",
    },
    {
      title: "Advanced Data Analytics",
      category: "Data Science",
      duration: "10 weeks",
    },
    {
      title: "Cybersecurity for Executives",
      category: "Technology",
      duration: "6 weeks",
    },
    { title: "AI in Business", category: "Innovation", duration: "8 weeks" },
    {
      title: "Global Business Strategy",
      category: "Management",
      duration: "12 weeks",
    },
    {
      title: "Digital Marketing Mastery",
      category: "Marketing",
      duration: "8 weeks",
    },
  ];

  return (
    <section
      ref={animationRef}
      className="py-16 md:py-20 bg-gradient-to-b from-black to-gray-900 text-white animate-on-scroll"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
          World-Class Courses for Enterprise Success
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course, i) => (
            <div
              key={i}
              className="bg-black/50 backdrop-blur-sm text-white rounded-lg overflow-hidden transition-all duration-300 hover:bg-black/70 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <div className="p-6">
                <span className="text-sm text-white/80 font-semibold">
                  {course.category}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-4 text-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  {course.title}
                </h3>
                <p className="text-white/80 mb-4">
                  Duration: {course.duration}
                </p>
                <Button
                  variant="secondary"
                  className="w-full md:w-auto bg-white/10 text-white hover:bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300"
                >
                  Join Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
