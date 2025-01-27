/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
      <div className="prose max-w-none">
        <p className="mb-6">Last updated: January 1, 2024</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="mb-4">
          By accessing and using nextCoder's services, including our courses and
          EMI payment options, you agree to be bound by these Terms and
          Conditions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          2. Course Access and Use
        </h2>
        <p className="mb-4">
          Upon successful payment or enrollment in an EMI plan, you will be
          granted access to the purchased course(s). This access is for
          personal, non-commercial use only.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          3. EMI Payment Terms
        </h2>
        <p className="mb-4">
          If you choose to pay via EMI (Equated Monthly Installments):
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>
            You agree to pay the full course fee in installments as per the
            selected EMI plan.
          </li>
          <li>
            Failure to pay any installment may result in suspension of course
            access.
          </li>
          <li>
            EMI plans are facilitated through our payment partner, Razorpay.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          4. Intellectual Property
        </h2>
        <p className="mb-4">
          All course content, including videos, texts, and assignments, is the
          property of nextCoder and protected by copyright laws. Reproduction or
          distribution without permission is prohibited.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. User Conduct</h2>
        <p className="mb-4">
          You agree to use our platform responsibly and not engage in any
          activity that may disrupt the learning experience of others or
          compromise the security of our systems.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          6. Refunds and Cancellations
        </h2>
        <p className="mb-4">
          Our refund and cancellation policies are detailed in our separate
          Refund Policy. Please refer to it for specific terms and conditions
          regarding course cancellations and refunds.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          7. Limitation of Liability
        </h2>
        <p className="mb-4">
          nextCoder is not liable for any indirect, incidental, or consequential
          damages arising from your use of our services or any content provided
          in our courses.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          8. Changes to Terms
        </h2>
        <p className="mb-4">
          We reserve the right to modify these terms at any time. Continued use
          of our services after changes constitutes acceptance of the new terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Governing Law</h2>
        <p className="mb-4">
          These terms are governed by the laws of [Your Country/State], without
          regard to its conflict of law principles.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          10. Contact Information
        </h2>
        <p className="mb-4">
          For any questions regarding these terms, please contact us at{" "}
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
