import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">nextCoder</h3>
            <p className="text-sm text-gray-600">
              Transform your skills with our expert-led online courses.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4 text-black">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4 text-black">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4 text-black">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Twitter
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            &copy; 2019-2025 nextCoder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
