/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CourseCard from "@/components/course/CourseCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useDebounce } from "@/hooks/useDebounce";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  instructor: {
    name: string;
  };
  slug: string;
  lessons: { duration: number }[];
  _count: {
    lessons: number;
  };
}

interface SearchableCourseListProps {
  initialCourses: Course[];
}

function LoadingSkeleton() {
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

export function SearchableCourseList({
  initialCourses,
}: SearchableCourseListProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();
  const debouncedSearch = useDebounce(searchQuery, 500);

  const lastCourseElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setCourses(initialCourses);
    setPage(1);
    setHasMore(true);
  }, [debouncedSearch, initialCourses]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/courses?page=${page}&limit=4&search=${encodeURIComponent(
            debouncedSearch
          )}`
        );
        const data = await response.json();

        setCourses((prevCourses) =>
          page === 1 ? data.courses : [...prevCourses, ...data.courses]
        );
        setHasMore(data.hasMore);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (page > 1 || debouncedSearch) {
      fetchCourses();
    }
  }, [page, debouncedSearch]);

  return (
    <div>
      <div className="relative mb-6 border-b border-primary rounded-b-3xl shadow-sm shadow-lime-200 p-4 ">
        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search courses..."
          className="pl-10 w-full max-w-md border-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {courses.length === 0 && !loading ? (
        <div className="text-center py-8 px-2">
          <p className="text-muted-foreground">
            No courses found matching your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
          {courses.map((course, index) => (
            <div
              key={course.id}
              ref={
                index === courses.length - 1 ? lastCourseElementRef : undefined
              }
            >
              <CourseCard
                course={{
                  ...course,
                  totalDuration: course.lessons.reduce(
                    (acc, lesson) => acc + (lesson.duration || 0),
                    0
                  ),
                  lessonCount: course._count.lessons,
                }}
              />
            </div>
          ))}
          {loading && (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          )}
        </div>
      )}
    </div>
  );
}
