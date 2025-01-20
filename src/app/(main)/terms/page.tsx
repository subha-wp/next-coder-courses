/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
      <div className="prose max-w-none">
        <p className="mb-6">Last updated: January 1, 2024</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p className="mb-4">
          Welcome to nextCoder. These Terms and Conditions govern your use of
          our website and services. By accessing or using nextCoder, you agree
          to be bound by these terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Definitions</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>"Platform" refers to nextCoder website and services</li>
          <li>
            "User" refers to any individual accessing or using the Platform
          </li>
          <li>
            "Content" refers to courses, materials, and resources available on
            the Platform
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          3. Account Registration
        </h2>
        <p className="mb-4">
          Users must provide accurate and complete information when creating an
          account. You are responsible for maintaining the confidentiality of
          your account credentials.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          4. Course Access and Usage
        </h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Course access is limited to registered and paid users</li>
          <li>Course materials may not be shared, copied, or distributed</li>
          <li>Access duration varies by course and package selected</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Payment Terms</h2>
        <p className="mb-4">
          All payments are processed securely. Course fees are non-refundable
          except as specified in our Refund Policy. Prices are subject to change
          without notice.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          6. Intellectual Property
        </h2>
        <p className="mb-4">
          All content on the Platform is protected by copyright and other
          intellectual property rights owned by nextCoder or its licensors.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. User Conduct</h2>
        <p className="mb-4">Users agree to:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Not share account credentials</li>
          <li>Not engage in unauthorized copying or distribution of content</li>
          <li>
            Maintain respectful communication in all platform interactions
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Termination</h2>
        <p className="mb-4">
          nextCoder reserves the right to terminate or suspend accounts for
          violations of these terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          9. Contact Information
        </h2>
        <p className="mb-4">
          For questions about these Terms and Conditions, please contact us at{" "}
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
              <Link
                href="/privacy-policy"
                className="text-primary hover:underline"
              >
                Privacy Policy
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
