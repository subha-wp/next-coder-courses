import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-16">Common Questions</h2>
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
    </div>
  );
}
