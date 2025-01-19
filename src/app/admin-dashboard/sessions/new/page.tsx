import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import SessionForm from "./SessionForm";

export default async function NewSessionPage() {
  const { user } = await validateRequest();

  if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
    redirect("/live-sessions");
  }

  const courses = await prisma.course.findMany({
    where: user.role === "INSTRUCTOR" ? { instructorId: user.id } : undefined,
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      title: "asc",
    },
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create New Live Session</h1>
      <SessionForm courses={courses} />
    </div>
  );
}
