"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Table Component
const Table = ({
                   title,
                   description,
               }: {
    title: string;
    description: string;
}) => {
    return (
        <div
            className="flex flex-col items-start gap-2 xl:flex-row"
            role="row" // Adds role to identify this as a table row for assistive technologies
        >
            <h1
                className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32"
            >
                {title}:
            </h1>
            <p
                className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl"
                role="cell" // Identifies this as a table cell
                aria-label={`Description: ${description}`} // Provides a more descriptive label
            >
                {description}
            </p>
        </div>
    );
};

// PersonalRoom Component
const PersonalRoom = () => {
    const router = useRouter();
    const { user } = useUser();
    const client = useStreamVideoClient();
    const { toast } = useToast();

    const meetingId = user?.id;
    const { call } = useGetCallById(meetingId!);

    const startRoom = async () => {
        if (!client || !user) return;

        const newCall = client.call("default", meetingId!);

        if (!call) {
            await newCall.getOrCreate({
                data: {
                    starts_at: new Date().toISOString(),
                },
            });
        }

        router.push(`/meeting/${meetingId}?personal=true`);
    };

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

    return (
        <section
            className="flex size-full flex-col gap-10 text-white"
            aria-labelledby="personal-session-heading" // Ensures screen readers announce this section's purpose
        >
            <h1
                id="personal-session-heading"
                className="text-xl font-bold lg:text-3xl"
            >
                Personal Session
            </h1>

            <div
                className="flex w-full flex-col gap-8 xl:max-w-[900px]"
                role="table" // Marks this section as a table
                aria-label="Meeting Details" // Describes the content of the table
            >
                <Table
                    title="Topic"
                    description={`${user?.username}'s Session Room`}
                />
                <Table title="Meeting ID" description={meetingId!} />
                <Table title="Invite Link" description={meetingLink} />
            </div>

            <div className="flex gap-5">
                {/* Start Meeting Button */}
                <Button
                    className="bg-blue-1 text-white-1"
                    onClick={startRoom}
                    role="button" // Explicitly defines this as a button for screen readers
                    aria-label="Start the personal meeting" // Improves the context for screen readers
                >
                    Start Session
                </Button>

                {/* Copy Invitation Button */}
                <Button
                    className="bg-white-3"
                    onClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast({
                            title: "Link Copied",
                        });
                    }}
                    role="button"
                    aria-label="Copy the meeting invitation link" // Explains what this button does
                >
                    Copy Invitation
                </Button>
            </div>
        </section>
    );
};

export default PersonalRoom;