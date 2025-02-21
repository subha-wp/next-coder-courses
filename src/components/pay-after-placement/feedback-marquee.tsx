import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      message: "यह प्लेटफार्म मेरे करियर को नई दिशा देने में मदद कर रहा है।",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sneha Patel",
      message: "सीखने के शानदार अवसर! मैंने यहां से कई नई स्किल्स सीखी हैं।",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Rohan Verma",
      message: "बेहद उपयोगी संसाधन और मार्गदर्शन, छात्रों के लिए बहुत लाभदायक।",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Ananya Iyer",
      message:
        "This platform has been a game-changer for my placement preparation!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Vikram Singh",
      message:
        "The internship and career counseling helped me choose the right path.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "Aditya Ghosh",
      message: "এই প্ল্যাটফর্মটি আমার শিক্ষাগত অগ্রগতির জন্য অত্যন্ত সহায়ক।",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 7,
      name: "Meera Das",
      message: "Great resources and live sessions! Helped me build confidence.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 8,
      name: "Soumya Mukherjee",
      message:
        "আমি এখানে অনেক নতুন স্কিল শিখেছি, যা আমার ক্যারিয়ারে কাজে লাগবে।",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 9,
      name: "Rahul Nair",
      message:
        "I found the mentorship program extremely helpful in career growth!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 10,
      name: "Priya Banerjee",
      message:
        "এই কোর্সগুলি সহজ ভাষায় বোঝানো হয়েছে, যা শেখার জন্য দুর্দান্ত!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const feedbackList2: Feedback[] = [
    {
      id: 11,
      name: "Kunal Kapoor",
      message:
        "The mock tests and interview tips helped me crack my dream job!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 12,
      name: "Tanvi Choudhary",
      message: "इस प्लेटफार्म के कोर्स बहुत अच्छे से डिज़ाइन किए गए हैं।",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 13,
      name: "Arindam Basu",
      message: "এই প্ল্যাটফর্মের লাইভ ক্লাসগুলি সত্যিই খুব কার্যকরী।",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 14,
      name: "Neha Malhotra",
      message:
        "I improved my coding skills significantly with their hands-on projects.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 15,
      name: "Soham Roy",
      message: "এই ওয়েবসাইটটি শিক্ষার্থীদের জন্য অসাধারণ সুযোগ তৈরি করেছে!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-muted/50 py-12">
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
