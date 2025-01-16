import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteCourseButton from "./DeleteCourseButton";
import { CopyPlus, FilePenLine, UserPlus } from "lucide-react";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      instructor: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Button asChild>
          <Link href="/admin-dashboard/courses/new">Add Course</Link>
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
                  Instructor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
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
              {courses.map((course) => (
                <tr key={course.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.instructor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${course.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(course.createdAt).toLocaleDateString("en-GB", {
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
                        href={`/admin-dashboard/courses/${course.id}/enrollments`}
                      >
                        <UserPlus />
                      </Link>
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="mr-2"
                      asChild
                    >
                      <Link
                        href={`/admin-dashboard/courses/${course.id}/lessons`}
                      >
                        <CopyPlus />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      asChild
                    >
                      <Link href={`/admin-dashboard/courses/${course.id}/edit`}>
                        <FilePenLine />
                      </Link>
                    </Button>
                    <DeleteCourseButton courseId={course.id} />
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
