"use client";

import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {
    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

    const call = useCall();

    if (!call) {
        throw new Error(
            'useStreamCall must be used within a StreamCall component.',
        );
    }

    useEffect(() => {
        if (isMicCamToggledOn) {
            call?.camera.disable();
            call?.microphone.disable();
        } else {
            call?.camera.enable();
            call?.microphone.enable();
        }
    }, [isMicCamToggledOn, call?.camera, call?.microphone]);

    return (
        <div
            className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white"
            role="main" // Marks the setup section as the primary content
            aria-labelledby="setup-title" // Associates this section with the setup title
        >
            {/* Screen Reader Title */}
            <h1 id="setup-title" className="text-center text-2xl font-bold">
                Setup
            </h1>

            {/* Video Preview */}
            <VideoPreview
                aria-label="Video preview of your camera"
            />

            {/* Mic and Camera Toggle and Device Settings */}
            <div className="flex h-16 items-center justify-center gap-3">
                <label
                    className="flex items-center justify-center gap-2 font-medium"
                    htmlFor="mic-cam-toggle" // Links the checkbox to the label
                >
                    <input
                        id="mic-cam-toggle"
                        type="checkbox"
                        checked={isMicCamToggledOn}
                        onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
                        aria-checked={isMicCamToggledOn} // Ensures screen readers announce the checkbox state
                        aria-label="Join with mic or camera off" // Describes the purpose of the checkbox
                    />
                    Join with mic or camera off
                </label>

                <DeviceSettings aria-label="Select your audio and video devices" />
            </div>

            {/* Join Meeting Button */}
            <Button
                className="rounded-md bg-green-500 px-4 py-2.5"
                onClick={() => {
                    call.join();
                    setIsSetupComplete(true);
                }}
                aria-label="Join the meeting" // Describes the button action
            >
                Join meeting
            </Button>
        </div>
    );
};

export default MeetingSetup;