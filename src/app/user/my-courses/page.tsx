import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { EnrolledCourseCard } from "@/components/course/EnrolledCourseCard";

export default async function MyCoursesPage() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/auth/login");
  }

  const enrolledCourses = await prisma.enrollment.findMany({
    where: {
      userId: user.id,
    },
    include: {
      course: {
        include: {
          instructor: {
            select: {
              name: true,
            },
          },
          lessons: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      {enrolledCourses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            You haven&apos;t enrolled in any courses yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((enrollment) => (
            <EnrolledCourseCard
              key={enrollment.id}
              course={enrollment.course}
            />
          ))}
        </div>
      )}
    </div>
  );
}
