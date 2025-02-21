"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(window.scrollY > 10);
      setIsScrolled(scrollPosition > 10);

      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const progress = (scrollPosition / maxScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 p-4">
        <nav
          className={`container mx-auto transition-all duration-300 ease-in-out
          ${
            isScrolled
              ? "bg-background/50 backdrop-blur-sm shadow-md rounded-full px-4 py-2"
              : "bg-transparent px-0 py-0"
          }`}
        >
          <div
            className="absolute top-0 left-0 mx-6 h-0.5 bg-primary transition-all duration-300 ease-out rounded-2xl"
            style={{ width: `${scrollProgress}%` }}
            role="progressbar"
            aria-valuenow={scrollProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              nextCoder
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                className="rounded-sm bg-white py-2 px-4 text-primary-foreground font-semibold"
                href="https://play.google.com/store/apps/details?id=com.devcodersubha.nextcodercourses"
              >
                Download Now
              </Link>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 mx-6 h-0.5 bg-primary transition-all duration-300 ease-out rounded-2xl"
            style={{ width: `${scrollProgress}%` }}
            role="progressbar"
            aria-valuenow={scrollProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </nav>
      </header>
      <div className="pt-20">{/* Your main content goes here */}</div>
    </>
  );
}
