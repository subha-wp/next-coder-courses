import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import LessonForm from "../../LessonForm";

export default async function EditLessonPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) {
  const { id, lessonId } = await params;

  // Get the lesson and check if it's the first lesson
  const [lesson, lessonCount] = await Promise.all([
    prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        videos: {
          orderBy: {
            order: "asc",
          },
        },
        materials: true,
      },
    }),
    prisma.lesson.count({
      where: { courseId: id },
    }),
  ]);

  if (!lesson) {
    notFound();
  }

  // Check if this is the first lesson
  const isFirstLesson = lessonCount === 1;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Lesson</h1>
      <LessonForm courseId={id} lesson={lesson} isFirstLesson={isFirstLesson} />
    </div>
  );
}
