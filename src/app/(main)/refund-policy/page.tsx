import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
      <div className="prose max-w-none">
        <p className="mb-6">Last updated: January 1, 2024</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          1. Refund Eligibility
        </h2>
        <p className="mb-4">
          We want you to be satisfied with your learning experience at
          nextCoder. Our refund policy is designed to be fair and transparent.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          2. Refund Conditions
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3">
          2.1 Eligible for Refund
        </h3>
        <ul className="list-disc pl-6 mb-6">
          <li>Request made within 7 days of purchase</li>
          <li>Less than 25% of course content accessed</li>
          <li>Technical issues preventing course access</li>
          <li>Significant course content mismatch with description</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          2.2 Not Eligible for Refund
        </h3>
        <ul className="list-disc pl-6 mb-6">
          <li>More than 7 days since purchase</li>
          <li>More than 25% of course content accessed</li>
          <li>Downloaded course materials</li>
          <li>Completed assignments or received certification</li>
          <li>Account suspended due to policy violations</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Refund Process</h2>
        <p className="mb-4">To request a refund:</p>
        <ol className="list-decimal pl-6 mb-6">
          <li>Email your request to info.nextcoder@gmail.com</li>
          <li>Include your order number and reason for refund</li>
          <li>Our team will review your request within 48 hours</li>
          <li>
            If approved, refund will be processed within 5-7 business days
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Refund Methods</h2>
        <p className="mb-4">
          Refunds will be issued to the original payment method used for the
          purchase. Processing times may vary depending on your payment
          provider.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          5. Special Circumstances
        </h2>
        <h3 className="text-xl font-semibold mt-6 mb-3">
          5.1 Bundle Purchases
        </h3>
        <p className="mb-4">
          For course bundles, partial refunds may be calculated based on the
          courses accessed and the bundle discount applied.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          5.2 Technical Issues
        </h3>
        <p className="mb-4">
          If you experience technical issues, please contact our support team
          first. We will attempt to resolve any technical problems before
          processing a refund.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          6. Currency and Exchange Rates
        </h2>
        <p className="mb-4">
          Refunds will be processed in the original currency of purchase. Any
          currency exchange rates or fees are beyond our control.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          7. Contact Information
        </h2>
        <p className="mb-4">
          For refund requests or questions about this policy, please contact us
          at{" "}
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
                href="/privacy-policy"
                className="text-primary hover:underline"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
