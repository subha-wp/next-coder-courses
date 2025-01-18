/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import prisma from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { EnrollUserDialog } from "./EnrollUserDialog";

export default async function CourseEnrollmentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [course, enrollments, users] = await Promise.all([
    prisma.course.findUnique({
      where: { id },
      select: {
        title: true,
      },
    }),
    prisma.enrollment.findMany({
      where: { courseId: id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.user.findMany({
      where: {
        role: "STUDENT",
        enrollments: {
          none: {
            courseId: id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    }),
  ]);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Enrollments for {course.title}</h1>
        <EnrollUserDialog courseId={id} users={users} />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrolled On
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {enrollment.user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {enrollment.user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {enrollment.enrollmentType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(enrollment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {enrollment.status}
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
