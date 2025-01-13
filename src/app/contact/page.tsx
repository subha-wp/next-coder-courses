/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="max-w-2xl mx-auto">
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
    </div>
  );
}
