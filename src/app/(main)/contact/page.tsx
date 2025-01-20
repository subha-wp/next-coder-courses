/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="text-lg mb-6">
            Have a question or need assistance? We're here to help! Fill out the
            form below, and we'll get back to you as soon as possible.
          </p>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <Input type="text" id="name" name="name" required />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Input type="email" id="email" name="email" required />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subject
              </label>
              <Input type="text" id="subject" name="subject" required />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <Textarea id="message" name="message" rows={5} required />
            </div>
            <Button type="submit" size="lg">
              Send Message
            </Button>
          </form>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5" />
            <span>info.nextcoder@gmail.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5" />
            <span>+91 7076855311</span>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 mt-1" />
            <span>
              Singherhat bus stand, Kakdwip Road,
              <br />
              South 24 Parganas, West Bengal,
              <br />
              India - 743348
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
