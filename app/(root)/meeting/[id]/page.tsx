"use client";

import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react';

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);
  const { isLoaded, user } = useUser();

  if (!isLoaded || isCallLoading) return <Loader aria-label="Loading meeting details..." />;

  return (
      <main
          className="h-screen w-full"
          role="main" // Declares this as the primary content of the page
          aria-labelledby="meeting-page-heading" // Links to the heading for better context
      >
        {/* Screen Reader Only Heading */}
        <h1 id="meeting-page-heading" className="sr-only">
          Meeting Page
        </h1>

        {/* StreamCall Wrapper */}
        <StreamCall call={call} aria-label="Meeting Call Interface">
          <StreamTheme>
            {!isSetupComplete ? (
                <MeetingSetup
                    setIsSetupComplete={setIsSetupComplete}
                    aria-label="Meeting Setup" // Adds descriptive label for the setup phase
                />
            ) : (
                <MeetingRoom
                    aria-label="Meeting Room" // Describes the active meeting interface
                />
            )}
          </StreamTheme>
        </StreamCall>
      </main>
  );
};

export default Meeting;