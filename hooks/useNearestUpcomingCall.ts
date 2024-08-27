// hooks/useNearestUpcomingCall.ts
import { useMemo } from 'react';
import { Call } from '@stream-io/video-react-sdk';

export const useNearestUpcomingCall = (upcomingCalls: Call[]) => {
  const nearestCall = useMemo(() => {
    if (!upcomingCalls || upcomingCalls.length === 0) return null;

    const now = new Date();
    
    // Filter out calls without a valid start time
    const validCalls = upcomingCalls.filter(call => call.state?.startsAt !== undefined);

    if (validCalls.length === 0) return null;

    // Sort calls by their start time
    const sortedCalls = validCalls
      .filter(call => new Date(call.state!.startsAt!) > now) // Using non-null assertion (!)
      .sort((a, b) => new Date(a.state!.startsAt!).getTime() - new Date(b.state!.startsAt!).getTime());

    return sortedCalls[0] || null;
  }, [upcomingCalls]);

  return nearestCall;
};
