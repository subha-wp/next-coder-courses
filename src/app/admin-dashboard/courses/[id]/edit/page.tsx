import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import CourseForm from "../../CourseForm";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: { id },
  });

  if (!course) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Course</h1>
      <CourseForm course={course} />
    </div>
  );
}
