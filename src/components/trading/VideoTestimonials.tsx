"use client";

import { useState } from "react";

interface VideoTestimonial {
  id: number;
  name: string;
  videoUrl: string;
  description: string;
}

export default function VideoTestimonials() {
  const testimonials: VideoTestimonial[] = [
    {
      id: 1,
      name: "Somnath Mondal",
      videoUrl:
        "https://gist.github.com/user-attachments/assets/13e33740-2c81-4d30-98e0-c1455ba02e4c", // Placeholder URL
      description:
        "এই প্রোগ্রাম আমার ট্রেডিং দক্ষতাকে নতুন উচ্চতায় নিয়ে গেছে!",
    },
    {
      id: 2,
      name: "Aditya Naskar",
      videoUrl:
        "https://gist.github.com/user-attachments/assets/766d4f08-1c8c-4806-9df0-17d2ef7a6355", // Placeholder URL
      description: "আমি ক্রিপ্টো ট্রেডিংয়ে দক্ষ হয়েছি।",
    },
    {
      id: 3,
      name: "Barun Das",
      videoUrl:
        "https://gist.github.com/user-attachments/assets/786a85eb-c8b1-4149-8f6d-fddc4f5a1efc", // Placeholder URL
      description: "ইন্ট্রাডে ট্রেডিংয়ের জন্য অসাধারণ কৌশল শিখেছি।",
    },
  ];

  const [playing, setPlaying] = useState<number | null>(null);

  const handlePlay = (id: number) => {
    setPlaying(id);
  };

  return (
    <div className="py-12 bg-gray-900">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          আমাদের ছাত্রদের ভিডিও প্রশংসাপত্র
        </h2>
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-none">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-40 bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div
                className="relative w-full"
                style={{ paddingTop: "177.78%" /* 16/9 inverse for 9:16 */ }}
              >
                <video
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src={testimonial.videoUrl}
                  controls
                  playsInline
                  muted={playing !== testimonial.id}
                  onPlay={() => handlePlay(testimonial.id)}
                />
              </div>
              <div className="p-2">
                <h3 className="text-sm font-semibold text-white truncate">
                  {testimonial.name}
                </h3>
                <p className="text-xs text-gray-300 truncate">
                  {testimonial.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
