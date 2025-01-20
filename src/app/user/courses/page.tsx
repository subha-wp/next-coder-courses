/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { Suspense } from "react";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { SearchableCourseList } from "./searchable-course-list";
import LogoutButton from "@/components/LogoutButton";
import { validateRequest } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Courses | nextcoder",
  description: "Browse our collection of professional development courses",
  keywords: [
    "online courses",
    "professional development",
    "learning",
    "education",
    "skills development",
  ],
  openGraph: {
    title: "Courses | nextcoder",
    description: "Browse our collection of professional development courses",
    type: "website",
    images: [
      {
        url: "/og-courses.jpg",
        width: 1200,
        height: 630,
        alt: "nextcoder Courses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Courses | nextcoder",
    description: "Browse our collection of professional development courses",
  },
};

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

export default async function CoursesPage() {
  const { user } = await validateRequest();
  const courses = await getCourses();

  return (
    <div className="container mx-auto py-4 mb-12 bg-black">
      <div className="mb-4">
        <div className="flex justify-between items-start px-4">
          <h1 className="text-xl font-bold mb-2">Hi,{user.name}</h1>
          <div>
            <LogoutButton />
          </div>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
              {[...Array(6)].map((_, i) => (
                <CourseSkeleton key={i} />
              ))}
            </div>
          }
        >
          <SearchableCourseList initialCourses={courses} />
        </Suspense>
      </div>
    </div>
  );
}
