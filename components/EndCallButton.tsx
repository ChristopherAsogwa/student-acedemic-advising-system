"use client";

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
      localParticipant &&
      call?.state.createdBy &&
      localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    try {
      await call.endCall();
      router.push('/');
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

  return (
      <Button
          onClick={endCall}
          className="bg-red-500"
          aria-label="End the call for all participants" // Provides a descriptive label for screen readers
          role="button" // Explicitly defines the role of the element
      >
        End Call for Everyone
      </Button>
  );
};

export default EndCallButton;