"use client";

import {
  ChartBarIcon,
  ClockIcon,
  CloudLightning,
  StarIcon,
  Users,
} from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: CloudLightning,
      title: "Ai-চালিত কৌশল",
      description:
        "আমাদের উন্নত AI টুলস বাজার বিশ্লেষণ করে দ্রুত ও নির্ভুল সিদ্ধান্ত নিতে সাহায্য করে।",
    },
    {
      icon: StarIcon,
      title: "প্রমাণিত সাফল্য",
      description:
        "আমাদের কৌশলগুলি ভারতীয় শেয়ার ও ক্রিপ্টো বাজারে লাভজনক ফলাফল দিয়েছে।",
    },
    {
      icon: ClockIcon,
      title: "৩ দিনের গভীর প্রশিক্ষণ",
      description: "মাত্র ৩ দিনে ইন্ট্রাডে থেকে সুইং ট্রেডিংয়ের সবকিছু শিখুন।",
    },
    {
      icon: ChartBarIcon,
      title: "ব্যবহারিক দক্ষতা",
      description:
        "বাস্তব বাজারের অভিজ্ঞতা দিয়ে হাতে-কলমে ট্রেডিং শেখানো হয়।",
    },
    {
      icon: Users,
      title: "বিশেষজ্ঞদের গাইডেন্স",
      description: "অভিজ্ঞ ট্রেডারদের কাছ থেকে ব্যক্তিগত পরামর্শ ও সমর্থন পান।",
    },
  ];

  return (
    <div className="py-16 ">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 ">
          কেন আমাদের বেছে নেবেন?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:bg-gray-700"
              style={{ boxShadow: "0 4px 20px rgba(59, 130, 246, 0.2)" }} // Subtle blue shadow for professionalism
            >
              <reason.icon className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {reason.title}
              </h3>
              <p className="text-gray-300">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
