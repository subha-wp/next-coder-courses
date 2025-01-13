/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";

export default function CoursePage({ params }: { params: { slug: string } }) {
  // In a real application, you would fetch the course data based on the slug
  const course = {
    title: "Web Development Fundamentals",
    description:
      "Learn the basics of web development, including HTML, CSS, and JavaScript.",
    instructor: "Jane Doe",
    duration: "8 weeks",
    level: "Beginner",
    price: "$99.99",
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
        <p className="text-xl text-gray-600 mb-8">{course.description}</p>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Course Details</h2>
          <ul className="space-y-2">
            <li>
              <strong>Instructor:</strong> {course.instructor}
            </li>
            <li>
              <strong>Duration:</strong> {course.duration}
            </li>
            <li>
              <strong>Level:</strong> {course.level}
            </li>
            <li>
              <strong>Price:</strong> {course.price}
            </li>
          </ul>
        </div>
        <Button size="lg">Enroll Now</Button>
      </div>
    </div>
  );
}
