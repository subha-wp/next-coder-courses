import { Suspense, use } from "react";
import CourseCard from "@/components/course/CourseCard";
import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

async function getCourses() {
  return await prisma.course.findMany({
    include: {
      instructor: {
        select: { name: true },
      },
    },
  });
}

function CourseSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <Skeleton className="h-[200px] w-full rounded-lg" />
        <Skeleton className="h-4 w-2/3 mt-4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
        <Skeleton className="h-4 w-1/4 mt-2" />
      </CardContent>
    </Card>
  );
}

function CourseList() {
  const courses = use(getCourses());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

export default function CoursesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <CourseSkeleton key={i} />
            ))}
          </div>
        }
      >
        <CourseList />
      </Suspense>
    </div>
  );
}
