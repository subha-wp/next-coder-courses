/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  BookOpen,
  Award,
  Clock,
  Play,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { VideoHero } from "@/components/VideoHero";
import { Course, User, Video } from "./types";
import { toast } from "sonner";

interface CourseHeroProps {
  course: Course;
  totalDuration: number;
  isEnrolled: boolean;
  user: User | null;
  selectedVideo: Video | null;
  onEnroll: () => void;
}

export function CourseHero({
  course,
  totalDuration,
  isEnrolled,
  user,
  selectedVideo,
  onEnroll,
}: CourseHeroProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      // Initialize payment
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: course.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initialize payment");
      }

      const { orderId, amount, currency, keyId } = await response.json();

      // Create Razorpay payment
      const options = {
        key: keyId,
        amount,
        currency,
        name: "nextCoder",
        description: `Enrollment for ${course.title}`,
        order_id: orderId,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch("/api/payments/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseId: course.id,
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error("Payment verification failed");
            }

            toast.success(
              "Payment successful! You are now enrolled in the course."
            );
            onEnroll();
          } catch (error) {
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#000000",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error("Failed to initialize payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-black text-white py-4 md:py-12">
      <div className="container mx-auto ">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <VideoHero
              course={course}
              isLoggedIn={!!user}
              selectedVideo={selectedVideo}
            />
          </div>

          <div className="space-y-6 px-2">
            <div className="flex items-start justify-between">
              {selectedVideo ? (
                <h2 className="font-sembold">Now Playing</h2>
              ) : (
                <h1 className="md:text-xl font-bold">{course.title}</h1>
              )}
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="md:hidden"
              >
                {isExpanded ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </Button>
            </div>
            {isExpanded && (
              <div>
                {selectedVideo ? (
                  <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <h3 className="mb-2">{selectedVideo.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Play className="w-4 h-4" />
                      <span>{selectedVideo.duration} minutes</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-lg mb-4">{course.description}</p>
                )}
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{Math.ceil(totalDuration / 60)}h total</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span>{course.lessons.length} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    <span>Certificate</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={
                      course.instructor.email
                        ? `https://www.gravatar.com/avatar/${Buffer.from(
                            course.instructor.email
                          ).toString("hex")}?d=identicon`
                        : "/avatar-placeholder.png"
                    }
                    alt={course.instructor.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{course.instructor.name}</p>
                    <p className="text-sm text-gray-300">Course Instructor</p>
                  </div>
                </div>
              </div>
            )}

            {!isEnrolled && user && (
              <Button
                size="lg"
                className="w-full border"
                onClick={course.isFree ? onEnroll : handlePayment}
                disabled={isProcessing}
              >
                {isProcessing
                  ? "Processing..."
                  : course.isFree
                  ? "Enroll Now (Free)"
                  : `Enroll for ₹${course.price.toFixed(2)}`}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
