"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import ReactDatePicker from "react-datepicker";

const MeetingTypeList = () => {
    const [meetingState, setMeetingState] = useState<
        "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
    >(undefined);
    const { user } = useUser();
    const client = useStreamVideoClient();
    const router = useRouter();

    const [values, setValues] = useState({
        dateTime: new Date(),
        description: "",
        link: "",
    });
    const [callDetails, setCallDetails] = useState<Call | null>(null);
    const { toast } = useToast();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMeetingLink, setShowMeetingLink] = useState("");
    const [meetingDateTime, setMeetingDateTime] = useState("");

    const createMeeting = async () => {
        if (!client || !user) return;

        try {
            if (!values.dateTime) {
                toast({ title: "Please select a date and time" });
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call("default", id);

            if (!call) throw new Error("Failed to create call");

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || "Instant Meeting";
            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    },
                },
            });

            setCallDetails(call);

            const generatedMeetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`;
            setShowMeetingLink(generatedMeetingLink);
            setMeetingDateTime(values.dateTime.toLocaleString());
            setIsModalOpen(true);

            toast({ title: "Meeting Created" });
        } catch (error) {
            console.error(`Error: ${error}`);
            toast({ title: "Failed to create Meeting" });
        }
    };

    const closeModal = () => {
        setMeetingState(undefined);
        setIsModalOpen(false);
        setCallDetails(null);
    };

    return (
        <section
            className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"
            aria-label="Meeting options"
        >
            <HomeCard
                img="/icons/add-meeting.svg"
                title="New Session"
                description="Start an instant session"
                handleClick={() => setMeetingState("isInstantMeeting")}
                aria-label="Create a new session"
            />
            <HomeCard
                img="/icons/join-meeting.svg"
                title="Join Session"
                description="via invitation link"
                className="bg-blue-1"
                handleClick={() => setMeetingState("isJoiningMeeting")}
                aria-label="Join an existing session"
            />
            <HomeCard
                img="/icons/schedule.svg"
                title="Schedule Session"
                description="Plan your session"
                className="bg-orange-1"
                handleClick={() => setMeetingState("isScheduleMeeting")}
                aria-label="Schedule a session"
            />
            <HomeCard
                img="/icons/recordings.svg"
                title="View Recordings"
                description="Session Recordings"
                className="bg-blue-1"
                handleClick={() => router.push("/recordings")}
                aria-label="View session recordings"
            />

            {/* Meeting Modal */}
            <MeetingModal
                isOpen={meetingState === "isScheduleMeeting" || isModalOpen}
                onClose={closeModal}
                title={!callDetails ? "Create Session" : "Session Created"}
                handleClick={!callDetails ? createMeeting : undefined}
                meetingLink={callDetails ? showMeetingLink : undefined}
                meetingDateTime={callDetails ? meetingDateTime : undefined}
                handleCopyClick={
                    callDetails
                        ? () => {
                            navigator.clipboard.writeText(showMeetingLink);
                            toast({ title: "Link Copied" });
                        }
                        : undefined
                }
                image={callDetails ? "/icons/checked.svg" : undefined}
                buttonText={!callDetails ? "Schedule Session" : undefined}
            >
                {!callDetails && (
                    <>
                        <div className="flex flex-col gap-2.5">
                            <label
                                htmlFor="description"
                                className="text-base font-normal leading-[22.4px] text-sky-2"
                            >
                                Add a description
                            </label>
                            <Textarea
                                id="description"
                                className="border-none bg-white-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                                onChange={(e) => setValues({ ...values, description: e.target.value })}
                                aria-label="Add a description for your session"
                            />
                        </div>
                        <div className="flex w-full flex-col gap-2.5">
                            <label
                                htmlFor="date-picker"
                                className="text-base font-normal leading-[22.4px] text-sky-2"
                            >
                                Select Date and Time
                            </label>
                            <ReactDatePicker
                                id="date-picker"
                                selected={values.dateTime}
                                onChange={(date) => setValues({ ...values, dateTime: date! })}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                className="w-full rounded bg-white-3 p-2 focus:outline-none"
                                aria-label="Select a date and time for the session"
                            />
                        </div>
                    </>
                )}
            </MeetingModal>

            {/* Join Meeting Modal */}
            <MeetingModal
                isOpen={meetingState === "isJoiningMeeting"}
                onClose={closeModal}
                title="Type the link here"
                className="text-center"
                buttonText="Join Session"
                handleClick={() => router.push(values.link)}
            >
                <Input
                    placeholder="Session link"
                    onChange={(e) => setValues({ ...values, link: e.target.value })}
                    className="border-none bg-white-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                    aria-label="Enter the session link"
                />
            </MeetingModal>

            {/* Instant Meeting Modal */}
            <MeetingModal
                isOpen={meetingState === "isInstantMeeting"}
                onClose={closeModal}
                title="Start an Instant Session"
                className="text-center"
                buttonText="Start Session"
                handleClick={createMeeting}
            />
        </section>
    );
};

export default MeetingTypeList;