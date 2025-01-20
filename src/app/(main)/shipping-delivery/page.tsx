import { Card } from "@/components/ui/card";

export default function ShippingDeliveryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shipping & Delivery Policy</h1>
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Digital Delivery</h2>
          <p className="text-muted-foreground mb-4">
            nextCoder is an online learning platform. All our courses are
            delivered digitally through our secure platform. No physical
            shipping is involved.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Instant access to course content after successful payment</li>
            <li>24/7 availability of course materials</li>
            <li>Access through any device with internet connection</li>
            <li>No shipping or handling fees</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Payment Processing</h2>
          <p className="text-muted-foreground mb-4">
            We use Razorpay as our payment gateway to ensure secure and seamless
            transactions.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Secure payment processing through Razorpay</li>
            <li>
              Multiple payment options available (Credit/Debit Cards, UPI, Net
              Banking)
            </li>
            <li>Instant payment confirmation</li>
            <li>SSL encrypted transactions</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Access & Availability</h2>
          <p className="text-muted-foreground mb-4">
            After successful payment processing:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Immediate access to purchased courses</li>
            <li>Automatic enrollment in selected courses</li>
            <li>Email confirmation with access details</li>
            <li>Lifetime access to purchased course content</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Technical Requirements
          </h2>
          <p className="text-muted-foreground mb-4">
            To access our courses, you need:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>A stable internet connection</li>
            <li>A modern web browser (Chrome, Firefox, Safari, or Edge)</li>
            <li>Device with audio/video capabilities</li>
            <li>PDF reader for course materials (if applicable)</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Support</h2>
          <p className="text-muted-foreground mb-4">
            For any issues related to course access or payment processing:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>24/7 email support at support@nextcoder.com</li>
            <li>Live chat support during business hours</li>
            <li>Technical support for access issues</li>
            <li>Payment support through Razorpay</li>
          </ul>
        </Card>

        <div className="text-sm text-muted-foreground mt-8">
          <p>
            Note: This policy was last updated on January 1, 2024. For any
            queries, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
