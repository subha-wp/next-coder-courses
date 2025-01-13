/* eslint-disable @typescript-eslint/no-explicit-any */

import LiveSessionCard from "./LiveSessionCard";

export default async function LiveSessionsPage() {
  const liveSessions: any[] = [];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Live Sessions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveSessions.map((session) => (
          <LiveSessionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}
