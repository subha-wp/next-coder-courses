import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";
import { notFound } from "next/navigation";

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

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { user } = await validateRequest();
  const course = await prisma.course.findUnique({
    where: { slug: slug },
    include: {
      instructor: {
        select: {
          name: true,
        },
      },
      lessons: {
        orderBy: {
          createdAt: "asc",
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

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <div className="mb-6">
          <p className="text-lg mb-2">Instructor: {course.instructor.name}</p>
          <p className="text-gray-600">{course.description}</p>
          <p className="text-xl font-bold mt-4">
            Price: ${course.price.toFixed(2)}
          </p>
        </div>

        {!isEnrolled && user && <Button className="mb-8">Enroll Now</Button>}

        {isEnrolled && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Course Content</h2>
            <div className="space-y-4">
              {course.lessons.map((lesson) => (
                <Card key={lesson.id} className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
                  <Button variant="outline">Start Lesson</Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!user && (
          <Card className="p-6 text-center">
            <p className="text-lg mb-4">
              Please log in to enroll in this course.
            </p>
            <Button asChild>
              <a href="/auth/login">Log In</a>
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
