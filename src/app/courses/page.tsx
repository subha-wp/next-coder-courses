/* eslint-disable @typescript-eslint/no-explicit-any */

import CourseCard from "@/components/course/CourseCard";

export default async function CoursesPage() {
  const courses: any[] = [];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
