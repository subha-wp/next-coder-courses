"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Code2,
  GraduationCap,
  MessageSquare,
  Rocket,
  Users2,
} from "lucide-react";
import { motion } from "framer-motion";
import Marquee from "@/components/Marquee";
import Skills from "@/components/Skills";
import { SparklesCore } from "@/components/sparkles";
import Hero from "@/components/pay-after-placement/hero";
import FeedbackMarquee from "@/components/pay-after-placement/feedback-marquee";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-4000" />
        </div>
      </div>

      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="relative z-10">
        <Hero />
      </div>

      {/* Tech Stack */}
      <Skills />
      <Marquee />
      {/* Projects */}
      <motion.section
        className="container mx-auto px-4 py-20"
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-16"
          variants={fadeIn}
        >
          Build Industry-Level Projects
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Social Platform",
              description:
                "Build a full-featured social network with real-time updates, friend systems, and content sharing",
              icon: <Users2 className="h-8 w-8 text-purple-400" />,
            },
            {
              title: "E-commerce Platform",
              description:
                "Create a modern shopping experience with payment integration and order management",
              icon: <Rocket className="h-8 w-8 text-pink-400" />,
            },
            {
              title: "Real-time Chat",
              description:
                "Develop a messaging platform with instant updates and multimedia support",
              icon: <MessageSquare className="h-8 w-8 text-blue-400" />,
            },
          ].map((project) => (
            <motion.div
              key={project.title}
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <Card className="p-8 bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 h-full">
                <div className="mb-4">{project.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        className="container mx-auto px-4 py-20"
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeIn} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get everything you need to launch your development career
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <BookOpen className="h-8 w-8 text-purple-400" />,
              title: "Expert-Led Training",
              description:
                "Learn from industry experts with years of experience in top tech companies",
            },
            {
              icon: <Code2 className="h-8 w-8 text-pink-400" />,
              title: "Practical Learning",
              description:
                "Build real-world projects that employers are looking for",
            },
            {
              icon: <GraduationCap className="h-8 w-8 text-blue-400" />,
              title: "Career Support",
              description:
                "Get placement assistance, interview prep, and resume building support",
            },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <Card className="p-8 bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 h-full">
                {feature.icon}
                <h3 className="text-xl font-semibold my-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <FeedbackMarquee />

      {/* FAQ */}
      <motion.section
        className="container mx-auto px-4 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center mb-16">
          Common Questions
        </h2>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {[
            {
              question: "What is the duration of the course?",
              answer:
                "The course is intensive and spans over 6 months with daily hands-on coding sessions and project work.",
            },
            {
              question: "How does Pay After Placement work?",
              answer:
                "You only pay the course fee after securing a job with a minimum package. We're committed to your success!",
            },
            {
              question: "What kind of support do you provide?",
              answer:
                "You'll get 1:1 mentorship, interview preparation, resume building, and continuous support until placement.",
            },
            {
              question: "Do I need prior coding experience?",
              answer:
                "No prior coding experience is required. Our curriculum is designed to take you from basics to advanced concepts.",
            },
          ].map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-gray-800"
            >
              <AccordionTrigger className="text-left hover:text-purple-400">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="container mx-auto px-4 py-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-500 p-12 rounded-2xl ">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our program and pay only after you get placed. Limited seats
            available!
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className=" text-lg px-8 py-6">
              Apply Now
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
