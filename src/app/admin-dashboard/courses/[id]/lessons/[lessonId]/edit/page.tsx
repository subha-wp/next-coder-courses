import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import LessonForm from "../../LessonForm";

export default async function EditLessonPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) {
  const { id, lessonId } = await params;
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      videos: {
        orderBy: {
          order: "asc",
        },
      },
      materials: true,
    },
  });

  if (!lesson) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Lesson</h1>
      <LessonForm courseId={id} lesson={lesson} />
    </div>
  );
}
