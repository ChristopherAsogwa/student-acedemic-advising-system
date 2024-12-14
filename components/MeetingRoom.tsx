"use client";
import { cn } from '@/lib/utils';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import React, { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const router = useRouter();

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <Loader aria-label="Joining the call, please wait..." />;
  }

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout aria-label="Grid layout for meeting participants" />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" aria-label="Speaker layout with participants on the left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" aria-label="Speaker layout with participants on the right" />;
    }
  };

  return (
      <section
          className="relative h-screen w-full overflow-hidden pt-4 text-white"
          role="main" // Declares the main section for the meeting
          aria-labelledby="meeting-room-title" // Associates the section with a hidden heading for screen readers
      >
        {/* Hidden Screen Reader Title */}
        <h1 id="meeting-room-title" className="sr-only">
          Meeting Room
        </h1>

        {/* Call Layout */}
        <div className="relative flex size-full items-center justify-center">
          <div className="flex size-full max-w-[1000px] items-center">
            <CallLayout />
          </div>
          <div
              className={cn('h-[calc(100vh-86px)] hidden ml-2', {
                'show-block': showParticipants,
              })}
          >
            <CallParticipantsList
                onClose={() => setShowParticipants(false)}
                aria-label="List of meeting participants"
            />
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
          {/* Call Controls */}
          <CallControls
              onLeave={() => router.push(`/`)}
              aria-label="Call controls to mute, unmute, or leave the call"
          />

          {/* Layout Options Dropdown */}
          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger
                  className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"
                  aria-label="Change call layout"
              >
                <LayoutList size={20} className="text-white" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="border-dark-1 bg-white-1 text-white">
              {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
                  <div key={index}>
                    <DropdownMenuItem
                        onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                        className="cursor-pointer"
                        aria-label={`Switch to ${item} layout`}
                    >
                      {item}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="border-dark-1" />
                  </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Call Stats Button */}
          <CallStatsButton aria-label="View call statistics" />

          {/* Participants Toggle */}
          <button
              onClick={() => setShowParticipants((prev) => !prev)}
              aria-label={showParticipants ? "Hide participants list" : "Show participants list"}
          >
            <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <Users size={20} className="text-white" />
            </div>
          </button>

          {/* End Call Button */}
          {!isPersonalRoom && <EndCallButton />}
        </div>
      </section>
  );
};

export default MeetingRoom;