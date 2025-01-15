import prisma from "@/lib/prisma";
import LessonForm from "../LessonForm";

export default async function NewLessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Check if this will be the first lesson
  const lessonCount = await prisma.lesson.count({
    where: { courseId: id },
  });

  const isFirstLesson = lessonCount === 0;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Lesson</h1>
      <LessonForm courseId={id} isFirstLesson={isFirstLesson} />
    </div>
  );
}
