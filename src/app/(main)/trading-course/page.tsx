import FAQ from "@/components/trading/Faq";
import FeedbackMarquee from "@/components/trading/feedback-marquee";
import Hero from "@/components/trading/hero";
import Marquee from "@/components/trading/Marquee";
import Skills from "@/components/trading/Skills";
import StickyJoinNow from "@/components/trading/StickyJoinNow";
import WhyChooseUs from "@/components/trading/WhyChooseUs";
import React from "react";

export default function page() {
  return (
    <div>
      <Hero />
      <Skills />
      <Marquee />
      <WhyChooseUs />
      <FeedbackMarquee />
      <FAQ />
      <StickyJoinNow amount={199} />
    </div>
  );
}
