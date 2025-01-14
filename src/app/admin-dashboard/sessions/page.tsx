import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteSessionButton from "./DeleteSessionButton";

export default async function SessionsPage() {
  const sessions = await prisma.streamSession.findMany({
    orderBy: {
      startTime: "desc",
    },
    include: {
      course: {
        select: {
          title: true,
        },
      },
      instructor: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Live Sessions</h1>
        <Button asChild>
          <Link href="/admin-dashboard/sessions/new">Schedule Session</Link>
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {session.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {session.course.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {session.instructor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(session.startTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      asChild
                    >
                      <Link href={`/admin/sessions/${session.id}/edit`}>
                        Edit
                      </Link>
                    </Button>
                    <DeleteSessionButton sessionId={session.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
