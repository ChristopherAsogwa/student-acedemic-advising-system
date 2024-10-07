"use client";

import React, { useState } from 'react';
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import ReactDatePicker from "react-datepicker";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);
  const { user } = useUser();
  const client = useStreamVideoClient();
  const router = useRouter();

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });
  const [callDetails, setCallDetails] = useState<Call | null>(null); 
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMeetingLink, setShowMeetingLink] = useState('');
  const [meetingDateTime, setMeetingDateTime] = useState('');

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({ title: 'Please select a date and time' });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);

      if (!call) throw new Error('Failed to create call');

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      // Construct meeting link
      const generatedMeetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`;
      setShowMeetingLink(generatedMeetingLink); // Store the link in state
      setMeetingDateTime(values.dateTime.toLocaleString()); // Store the date & time in state

      setIsModalOpen(true);

      toast({
        title: 'Meeting Created',
      });
    } catch (error) {
      console.error(`You got connection error, ${error}`);
      toast({ title: 'Failed to create Meeting' });
    }
  };

  // Update the onClose function to reset modal states properly
  const closeModal = () => {
    setMeetingState(undefined);  // Reset meeting state
    setIsModalOpen(false);       // Close modal
    setCallDetails(null);        // Clear call details so modal can switch to scheduling mode if reopened
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Session"
        description="Start an instant session"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Session"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Session"
        description="Plan your session"
        className="bg-orange-1"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Session Recordings"
        className="bg-blue-1"
        handleClick={() => router.push('/recordings')}
      />

      {/* Meeting Modal */}
      <MeetingModal 
        isOpen={meetingState === 'isScheduleMeeting' || isModalOpen}
        onClose={closeModal} // Use the updated closeModal function
        title={!callDetails ? "Create Session" : "Session Created"}
        handleClick={!callDetails ? createMeeting : undefined} // Create meeting if no details
        meetingLink={callDetails ? showMeetingLink : undefined} // Show link if meeting created
        meetingDateTime={callDetails ? meetingDateTime : undefined} // Show date/time if created
        handleCopyClick={callDetails ? () => {
          navigator.clipboard.writeText(showMeetingLink);
          toast({ title: 'Link Copied' });
        } : undefined}
        image={callDetails ? '/icons/checked.svg' : undefined} // Show image when meeting created
        buttonText={!callDetails ? "Schedule Meeting" : undefined}
      >
        {/* If no call details, show meeting creation form */}
        {!callDetails && (
          <>
            <div className="flex flex-col gap-2.5">
              <label className="text-base font-normal leading-[22.4px] text-sky-2">
                Add a description
              </label>
              <Textarea
                className="border-none bg-white-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e) => setValues({ ...values, description: e.target.value })}
              />
            </div>
            <div className="flex w-full flex-col gap-2.5">
              <label className="text-base font-normal leading-[22.4px] text-sky-2">
                Select Date and Time
              </label>
              <ReactDatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date! })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded bg-white-3 p-2 focus:outline-none"
              />
            </div>
          </>
        )}
      </MeetingModal>

      {/* Join Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={closeModal} // Use the updated closeModal function
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-white-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>

      {/* Instant Meeting Modal */}
      <MeetingModal 
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={closeModal} // Use the updated closeModal function
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
