// src/app/courses/page.tsx
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { Suspense, use } from "react";
import CourseCard from "@/components/course/CourseCard";
import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

import { MobileNav } from "@/components/MobileNav";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Search } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

async function getCourses() {
  return await prisma.course.findMany({
    include: {
      instructor: {
        select: { name: true },
      },
      lessons: {
        select: {
          duration: true,
        },
      },
      _count: {
        select: { lessons: true },
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
        <CourseCard
          key={course.id}
          course={{
            ...course,
            totalDuration: course.lessons.reduce(
              (acc, lesson) => acc + (lesson.duration || 0),
              0
            ),
            lessonCount: course._count.lessons,
          }}
        />
      ))}
    </div>
  );
}

export default async function CoursesPage() {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/auth/login");
  }
  return (
    <div className="container mx-auto py-8 px-2">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
        <LogoutButton />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-10 w-full max-w-md"
          />
        </div>
      </div>
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
      <MobileNav />
    </div>
  );
}
