import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AnimatedSectionHeader from "../AnimatedSectionHeader";

interface Feedback {
  id: number;
  name: string;
  message: string;
  avatar: string;
}

export default function FeedbackMarquee() {
  const feedbackList1: Feedback[] = [
    {
      id: 1,
      name: "Aarav Sharma",
      message: "এই প্ল্যাটফর্ম আমার ট্রেডিং ক্যারিয়ারকে নতুন দিক দিচ্ছে।",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sneha Patel",
      message:
        "ট্রেডিং শেখার দারুণ সুযোগ! আমি এখান থেকে অনেক নতুন কৌশল শিখেছি।",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Rohan Verma",
      message: "খুবই উপযোগী সংস্থান এবং গাইডেন্স, ট্রেডারদের জন্য খুব লাভজনক।",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Ananya Iyer",
      message:
        "এই প্ল্যাটফর্মটি আমার ট্রেডিং প্রস্তুতির জন্য গেম-চেঞ্জার হয়েছে!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Vikram Singh",
      message:
        "৩ দিনের প্রোগ্রামটি আমাকে সঠিক ট্রেডিং পথ বেছে নিতে সাহায্য করেছে।",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const feedbackList2: Feedback[] = [
    {
      id: 6,
      name: "প্রিয়া দাস", // Priya Das
      message: "ক্রিপ্টো ট্রেডিং শিখতে এই প্রোগ্রামটি আমার জন্য সেরা ছিল।",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 7,
      name: "অর্জুন রায়", // Arjun Roy
      message: "ইন্ট্রাডে ট্রেডিংয়ের কৌশল এখানে শিখে আমি ধারাবাহিক লাভ করছি।",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 8,
      name: "মিতা চৌধুরী", // Mita Choudhury
      message: "এআই-চালিত ট্রেডিং টুলস শিখে আমার আত্মবিশ্বাস বেড়েছে।",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 9,
      name: "কৌশিক মুখার্জি", // Kaushik Mukherjee
      message:
        "ভারতীয় শেয়ার বাজারে লাভের জন্য এটি একটি দুর্দান্ত প্ল্যাটফর্ম।",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 10,
      name: "সুপ্রিয়া ঘোষ", // Supriya Ghosh
      message: "৩ দিনের প্রশিক্ষণে সুইং ট্রেডিং শিখে আমি বড় লাভ করেছি।",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-muted/50 py-12">
      <AnimatedSectionHeader title="Success Stories" />
      <div className="relative flex flex-col gap-12">
        {/* First Marquee */}
        <div className="relative flex gap-4 overflow-hidden">
          <div className="animate-marquee flex min-w-full shrink-0 items-center gap-4">
            {feedbackList1.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))}
          </div>
          <div className="animate-marquee flex min-w-full shrink-0 items-center gap-4">
            {feedbackList1.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))}
          </div>
        </div>

        {/* Second Marquee (Reverse) */}
        <div className="relative flex gap-4 overflow-hidden">
          <div className="animate-marquee-reverse flex min-w-full shrink-0 items-center gap-4">
            {feedbackList2.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))}
          </div>
          <div className="animate-marquee-reverse flex min-w-full shrink-0 items-center gap-4">
            {feedbackList2.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedbackCard({ feedback }: { feedback: Feedback }) {
  return (
    <div className="flex w-[350px] shrink-0 items-center gap-4 rounded-xl bg-background p-4 shadow-sm">
      <Avatar>
        <AvatarImage src={feedback.avatar} alt={feedback.name} />
        <AvatarFallback>
          {feedback.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <h3 className="font-semibold leading-none">{feedback.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {feedback.message}
        </p>
      </div>
    </div>
  );
}
