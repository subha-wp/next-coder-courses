import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-4 ">nextCoder</h3>
            <p className="text-sm ">
              Transform your skills with our expert-led online courses.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4 ">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm  hover:text-blue-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm  hover:text-blue-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4 ">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm  hover:text-blue-600"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm  hover:text-blue-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-sm  hover:text-blue-600"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-delivery"
                  className="text-sm  hover:text-blue-600"
                >
                  Shipping and Delivery
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4 ">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.youtube.com/@nextcoder8790"
                  className="text-sm  hover:text-blue-600"
                >
                  Youtube
                </a>
              </li>

              <li>
                <a
                  href="https://www.facebook.com/nextCoderbynextcode"
                  className="text-sm  hover:text-blue-600"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm ">
            &copy; 2019-2025 nextCoder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
