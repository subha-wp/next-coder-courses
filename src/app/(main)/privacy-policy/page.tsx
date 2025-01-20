import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose max-w-none">
        <p className="mb-6">Last updated: January 1, 2024</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p className="mb-4">
          At nextCoder, we take your privacy seriously. This Privacy Policy
          explains how we collect, use, and protect your personal information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          2. Information We Collect
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3">
          2.1 Personal Information
        </h3>
        <ul className="list-disc pl-6 mb-6">
          <li>Name and contact information</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Payment information</li>
          <li>Course progress and completion data</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          2.2 Technical Information
        </h3>
        <ul className="list-disc pl-6 mb-6">
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Device information</li>
          <li>Usage data and analytics</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          3. How We Use Your Information
        </h2>
        <p className="mb-4">We use your information to:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Provide and manage your course access</li>
          <li>Process payments and refunds</li>
          <li>Send important updates about your courses</li>
          <li>Improve our services and user experience</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
        <p className="mb-4">
          We implement appropriate security measures to protect your personal
          information from unauthorized access, alteration, or disclosure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Sharing</h2>
        <p className="mb-4">We may share your information with:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Payment processors to handle transactions</li>
          <li>Course instructors (limited to necessary information)</li>
          <li>Legal authorities when required by law</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Access your personal information</li>
          <li>Request corrections to your data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Cookies</h2>
        <p className="mb-4">
          We use cookies to enhance your browsing experience and analyze website
          traffic. You can control cookie preferences through your browser
          settings.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          8. Changes to Privacy Policy
        </h2>
        <p className="mb-4">
          We may update this policy periodically. Significant changes will be
          notified to users via email or website announcement.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          9. Contact Information
        </h2>
        <p className="mb-4">
          For privacy-related inquiries, please contact us at{" "}
          <a
            href="mailto:info.nextcoder@gmail.com"
            className="text-primary hover:underline"
          >
            info.nextcoder@gmail.com
          </a>
        </p>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="font-semibold">Related Policies:</p>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/terms" className="text-primary hover:underline">
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/refund-policy"
                className="text-primary hover:underline"
              >
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
