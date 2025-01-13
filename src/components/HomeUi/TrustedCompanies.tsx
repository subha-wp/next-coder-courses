"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

export function TrustedCompanies() {
  const animationRef = useScrollAnimation();

  const companies = [
    { name: "Google", logo: "/brands/google.svg" },
    { name: "Microsoft", logo: "/brands/microsoft.svg" },
    { name: "Amazon", logo: "/brands/amazon.svg" },
    { name: "Facebook", logo: "/brands/facebook.svg" },
    { name: "IBM", logo: "/brands/ibm.svg" },
    { name: "flipkart", logo: "/brands/flipkart.svg" },
    { name: "meesho", logo: "/brands/meesho.svg" },
    { name: "uber", logo: "/brands/uber.svg" },
    { name: "upwork", logo: "/brands/upwork.svg" },
  ];

  return (
    <section
      ref={animationRef}
      className="py-12 bg-muted overflow-hidden animate-on-scroll"
    >
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Trusted by Industry Leaders
        </h2>
        <div className="relative">
          <div className="flex overflow-x-hidden max-w-5xl">
            <div className="flex animate-marquee whitespace-nowrap items-center space-x-8">
              {companies.map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="mx-4 flex items-center justify-center w-32 h-20"
                >
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={100}
                    height={50}
                    className="opacity-60 hover:opacity-100 transition-opacity duration-300 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
