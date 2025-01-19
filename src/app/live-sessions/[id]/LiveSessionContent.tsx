/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import JitsiMeeting from "@/components/JitsiMeeting";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, UserX } from "lucide-react";

interface Participant {
  id: string;
  name: string;
  isMuted?: boolean;
}

interface LiveSessionContentProps {
  session: any;
  currentUser: any;
  isAdmin: boolean;
}

export default function LiveSessionContent({
  session,
  currentUser,
  isAdmin,
}: LiveSessionContentProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const handleParticipantJoined = (participant: any) => {
    setParticipants((prev) => [
      ...prev,
      {
        id: participant.id,
        name: participant.displayName,
        isMuted: false,
      },
    ]);
  };

  const handleParticipantLeft = (participant: any) => {
    setParticipants((prev) => prev.filter((p) => p.id !== participant.id));
  };

  const handleKickParticipant = (participantId: string) => {
    (window as any).kickParticipant?.(participantId);
  };

  const handleMuteParticipant = (participantId: string) => {
    (window as any).muteParticipant?.(participantId);
    setParticipants((prev) =>
      prev.map((p) => (p.id === participantId ? { ...p, isMuted: true } : p))
    );
  };

  const handleMuteAll = () => {
    (window as any).muteAll?.();
    setParticipants((prev) => prev.map((p) => ({ ...p, isMuted: true })));
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <JitsiMeeting
          roomName={session.id}
          displayName={currentUser.name}
          isAdmin={isAdmin}
          onParticipantJoined={handleParticipantJoined}
          onParticipantLeft={handleParticipantLeft}
        />
      </div>

      {isAdmin && (
        <div className="w-80 bg-background border-l overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Admin Controls</h2>
            <Button
              variant="destructive"
              className="w-full mb-4"
              onClick={handleMuteAll}
            >
              Mute All Participants
            </Button>

            <div className="space-y-4">
              <h3 className="font-semibold">Participants</h3>
              {participants.map((participant) => (
                <Card key={participant.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <span>{participant.name}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMuteParticipant(participant.id)}
                      >
                        {participant.isMuted ? (
                          <MicOff className="h-4 w-4" />
                        ) : (
                          <Mic className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleKickParticipant(participant.id)}
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
