import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteLessonButton from "./DeleteLessonButton";

export default async function CourseLessonsPage({
  params,
}: {
  params: { id: string };
}) {
  // Destructure and await the id from params
  const { id } = await params;

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      lessons: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lessons for {course.title}</h1>
        <Button asChild>
          <Link href={`/admin-dashboard/courses/${id}/lessons/new`}>
            Add Lesson
          </Link>
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {course.lessons.map((lesson) => (
                <tr key={lesson.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lesson.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(lesson.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      asChild
                    >
                      <Link
                        href={`/admin-dashboard/courses/${id}/lessons/${lesson.id}/edit`}
                      >
                        Edit
                      </Link>
                    </Button>
                    <DeleteLessonButton lessonId={lesson.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
