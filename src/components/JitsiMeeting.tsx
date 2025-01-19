/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
"use client";

import { useEffect, useRef } from "react";
import { JitsiMeeting as JitsiMeetComponent } from "@jitsi/react-sdk";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface JitsiMeetingProps {
  roomName: string;
  displayName: string;
  isAdmin: boolean;
  onParticipantJoined?: (participant: any) => void;
  onParticipantLeft?: (participant: any) => void;
}

export default function JitsiMeeting({
  roomName,
  displayName,
  isAdmin,
  onParticipantJoined,
  onParticipantLeft,
}: JitsiMeetingProps) {
  const apiRef = useRef<any>(null);
  const router = useRouter();

  const handleReadyToClose = () => {
    router.push("/live-sessions");
  };

  const handleParticipantJoined = (participant: any) => {
    onParticipantJoined?.(participant);
  };

  const handleParticipantLeft = (participant: any) => {
    onParticipantLeft?.(participant);
  };

  const handleApiReady = (api: any) => {
    apiRef.current = api;

    // Add event listeners for participant changes
    api.addEventListener("participantJoined", handleParticipantJoined);
    api.addEventListener("participantLeft", handleParticipantLeft);

    // If admin, expose admin controls
    if (isAdmin) {
      // Add admin control methods to the window object
      (window as any).kickParticipant = (participantId: string) => {
        api.executeCommand("kickParticipant", participantId);
        toast.success("Participant kicked from the session");
      };

      (window as any).muteParticipant = (participantId: string) => {
        api.executeCommand("muteParticipant", participantId);
        toast.success("Participant muted");
      };

      (window as any).muteAll = () => {
        const participants = api.getParticipantsInfo();
        participants.forEach((participant: any) => {
          if (
            participant.participantId !== api.getParticipantInfo().participantId
          ) {
            api.executeCommand("muteParticipant", participant.participantId);
          }
        });
        toast.success("All participants muted");
      };
    }
  };

  useEffect(() => {
    return () => {
      if (apiRef.current) {
        apiRef.current.removeEventListener(
          "participantJoined",
          handleParticipantJoined
        );
        apiRef.current.removeEventListener(
          "participantLeft",
          handleParticipantLeft
        );
      }
    };
  }, []);

  const jitsiConfig = {
    roomName: `nextcoder-${roomName}`,
    configOverwrite: {
      startWithAudioMuted: true,
      disableModeratorIndicator: false,
      startScreenSharing: false,
      enableEmailInStats: false,
    },
    interfaceConfigOverwrite: {
      DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
      MOBILE_APP_PROMO: false,
    },
    userInfo: {
      displayName: displayName,
    },
  };

  return (
    <div className="w-full h-screen">
      <JitsiMeetComponent
        domain="meet.jit.si"
        {...jitsiConfig}
        onApiReady={handleApiReady}
        onReadyToClose={handleReadyToClose}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "100%";
          iframeRef.style.width = "100%";
        }}
      />
    </div>
  );
}
