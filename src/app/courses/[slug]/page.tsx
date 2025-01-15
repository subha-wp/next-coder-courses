/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Clock,
  BookOpen,
  Award,
  Play,
  FileText,
  Lock,
  Link,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

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

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <div className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-lg mb-6">{course.description}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{Math.ceil(totalDuration / 60)}h total</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.lessons.length} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>Certificate</span>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={
                    course.instructor.email
                      ? `https://www.gravatar.com/avatar/${Buffer.from(
                          course.instructor.email
                        ).toString("hex")}?d=identicon`
                      : "/avatar-placeholder.png"
                  }
                  alt={course.instructor.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{course.instructor.name}</p>
                  <p className="text-sm text-gray-300">Course Instructor</p>
                </div>
              </div>
              {!isEnrolled && user && (
                <Button size="lg" className="w-full md:w-auto">
                  Enroll for ${course.price.toFixed(2)}
                </Button>
              )}
            </div>
            <div className="relative aspect-video">
              <Image
                src={course.thumbnailUrl || "/course-placeholder.jpg"}
                alt={course.title}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="md:col-span-2">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Course Content</h2>
              <div className="space-y-6">
                {course.lessons.map((lesson, index) => {
                  const isFirstLesson = index === 0;
                  const isLessonAccessible = isEnrolled || lesson.isFree;

                  return (
                    <div
                      key={lesson.id}
                      className="border-b last:border-0 pb-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <div>
                            <h3 className="font-semibold">
                              {index + 1}. {lesson.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {lesson.duration
                                ? `${lesson.duration} minutes`
                                : "Duration not set"}
                            </p>
                          </div>
                          {!isLessonAccessible && (
                            <Lock className="w-4 h-4 text-muted-foreground" />
                          )}
                          {lesson.isFree && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              Free
                            </span>
                          )}
                        </div>
                        {isLessonAccessible ? (
                          <Button variant="outline" size="sm" asChild>
                            <Link
                              href={`/courses/${slug}/lessons/${lesson.id}`}
                            >
                              {isEnrolled ? "Continue" : "Preview"}
                            </Link>
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled>
                            Locked
                          </Button>
                        )}
                      </div>
                      {isLessonAccessible && (
                        <>
                          {lesson.videos.length > 0 && (
                            <div className="space-y-2 mb-4">
                              {lesson.videos.map((video) => (
                                <div
                                  key={video.id}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <Play className="w-4 h-4" />
                                  <span>{video.title}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {lesson.materials.length > 0 && (
                            <div className="space-y-2">
                              {lesson.materials.map((material) => (
                                <div
                                  key={material.id}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <FileText className="w-4 h-4" />
                                  <span>{material.title}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Progress & Info */}
          <div>
            {isEnrolled && (
              <Card className="p-6 mb-6">
                <h3 className="font-semibold mb-4">Your Progress</h3>
                <Progress value={33} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  4 of 12 lessons completed
                </p>
              </Card>
            )}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Course Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>Self-paced learning</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <span>Certificate of completion</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span>Downloadable resources</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
