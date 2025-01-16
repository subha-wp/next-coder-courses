/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Suspense } from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";
import CoursePageContent from "./CoursePageContent";
import { MobileNav } from "@/components/MobileNav";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug: slug },
    include: {
      instructor: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!course) {
    return {
      title: "Course Not Found",
      description: "The requested course could not be found.",
    };
  }

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      type: "article",
      authors: [course.instructor.name],
    },
  };
}

async function getCourseData(slug: string) {
  const { user } = await validateRequest();
  const course = await prisma.course.findUnique({
    where: { slug: slug },
    include: {
      instructor: {
        select: {
          name: true,
          email: true,
        },
      },
      lessons: {
        orderBy: {
          order: "asc",
        },
        include: {
          videos: true,
          materials: true,
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  const isEnrolled = user
    ? await prisma.enrollment.findFirst({
        where: {
          userId: user.id,
          courseId: course.id,
        },
      })
    : null;

  const totalDuration = course.lessons.reduce(
    (acc, lesson) => acc + (lesson.duration || 0),
    0
  );

  return { course, user, isEnrolled, totalDuration };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { course, user, isEnrolled, totalDuration } = await getCourseData(slug);

  return (
    <div className="min-h-screen bg-muted/30 pb-20 md:pb-0">
      <Suspense fallback={<div>Loading...</div>}>
        <CoursePageContent
          course={course}
          user={user}
          isEnrolled={isEnrolled}
          totalDuration={totalDuration}
        />
      </Suspense>
      <MobileNav />
    </div>
  );
}
