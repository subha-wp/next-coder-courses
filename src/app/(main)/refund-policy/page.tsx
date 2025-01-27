/* eslint-disable react/no-unescaped-entities */
import React from "react";

const RefundAndCancellationPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        Refund and Cancellation Policy
      </h1>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. Refund Policy</h2>
      <h3 className="text-xl font-semibold mt-6 mb-3">
        2.1 Eligible for Refund
      </h3>
      <ul className="list-disc pl-6 mb-6">
        <li>Request made within 7 days of purchase for full course payments</li>
        <li>
          For EMI payments, refund requests must be made before the second
          installment is due
        </li>
        <li>Less than 25% of course content accessed</li>
        <li>Technical issues preventing course access</li>
        <li>Significant course content mismatch with description</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        2.2 Not Eligible for Refund
      </h3>
      <ul className="list-disc pl-6 mb-6">
        <li>More than 7 days since purchase for full course payments</li>
        <li>For EMI payments, after the second installment has been paid</li>
        <li>More than 25% of course content accessed</li>
        <li>Downloaded course materials</li>
        <li>Completed assignments or received certification</li>
        <li>Account suspended due to policy violations</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        8. Cancellation Policy
      </h2>
      <p className="mb-4">
        Our cancellation policy is closely tied to our refund policy. Here are
        the key points:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>
          You may cancel your course enrollment within 7 days of purchase for a
          full refund, provided you've accessed less than 25% of the course
          content.
        </li>
        <li>
          For EMI payments, cancellation requests must be made before the second
          installment is due. Any paid installments will be refunded, minus a
          processing fee.
        </li>
        <li>
          To cancel your enrollment, email your request to
          info.nextcoder@gmail.com with your order number and reason for
          cancellation.
        </li>
        <li>
          After the cancellation period, you may still cancel your enrollment,
          but refunds will not be issued.
        </li>
        <li>
          If you're experiencing issues with the course, please contact our
          support team before requesting a cancellation. We're committed to
          ensuring a positive learning experience.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        9. EMI-Specific Policies
      </h2>
      <p className="mb-4">For courses purchased with EMI options:</p>
      <ul className="list-disc pl-6 mb-6">
        <li>
          Cancellation of EMI plan must be done through both nextCoder and your
          EMI provider (Razorpay).
        </li>
        <li>
          Refunds for EMI purchases will be processed back to the original
          payment method used for installments.
        </li>
        <li>
          Cancellation of EMI plan may affect your credit score or future EMI
          eligibility with the provider.
        </li>
        <li>
          If you default on EMI payments, your course access may be suspended
          until payments are brought current.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        10. Contact Information
      </h2>
      <p className="mb-4">
        For refund requests, cancellations, or questions about this policy,
        please contact us at{" "}
        <a
          href="mailto:info.nextcoder@gmail.com"
          className="text-primary hover:underline"
        >
          info.nextcoder@gmail.com
        </a>
      </p>
    </div>
  );
};

export default RefundAndCancellationPolicy;
