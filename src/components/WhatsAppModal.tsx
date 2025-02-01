"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, MessageCircleMore } from "lucide-react";

interface WhatsAppModalProps {
  whatsAppLink: string;
}

export default function WhatsAppModal({ whatsAppLink }: WhatsAppModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="relative p-6">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <div className="mb-4 p-2">
                <Image
                  src="/poster.png"
                  alt="WhatsApp Community"
                  width={400}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <h2 className="text-2xl font-bold text-black mb-4 text-center">
                Join Our Community!
              </h2>
              <Link
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      )}
      <div
        className="fixed bottom-4 flex flex-col items-center right-4 bg-green-500 text-white p-4 rounded-full cursor-pointer shadow-lg hover:bg-green-600 transition duration-300 z-40"
        onClick={openModal}
      >
        <MessageCircleMore size={24} />
        <span className="text-white text-xs">Join Free Courses</span>
      </div>
    </>
  );
}
