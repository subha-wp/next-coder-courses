import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "4");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const courses = await prisma.course.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { instructor: { name: { contains: search, mode: "insensitive" } } },
        ],
      },
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
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.course.count({
      where: {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { instructor: { name: { contains: search, mode: "insensitive" } } },
        ],
      },
    });

    return NextResponse.json({
      courses,
      hasMore: skip + courses.length < total,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
