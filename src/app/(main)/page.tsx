import AnimatedBrand from "@/components/HomeUi/AnimatedBrand";
import { CTASection } from "@/components/HomeUi/CTASection";
import { FeaturedCourses } from "@/components/HomeUi/FeaturedCourses";
import { FeaturedSolutions } from "@/components/HomeUi/FeaturedSolutions";
import { GlobalReach } from "@/components/HomeUi/GlobalReach";
import { HeroSection } from "@/components/HomeUi/HeroSection";
import { MobileAppSection } from "@/components/HomeUi/MobileAppSection";
import { StatsSection } from "@/components/HomeUi/StatsSection";
import { Testimonials } from "@/components/HomeUi/Testimonials";
import { TrustedCompanies } from "@/components/HomeUi/TrustedCompanies";
import { WhyChooseUs } from "@/components/HomeUi/WhyChooseUs";

export default function Home() {
  return (
    <div className="min-h-screen">
      <AnimatedBrand />
      <HeroSection />
      <TrustedCompanies />
      <StatsSection />
      <FeaturedSolutions />
      <FeaturedCourses />
      <GlobalReach />
      <Testimonials />
      <WhyChooseUs />
      <MobileAppSection />
      <CTASection />
    </div>
  );
}
