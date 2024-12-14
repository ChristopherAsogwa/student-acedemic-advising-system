"use client";

import React, { useState, useEffect } from "react";
import MeetingTypeList from "@/components/MeetingTypeList";
import { useGetCalls } from "@/hooks/useGetCalls";
import { useNearestUpcomingCall } from "@/hooks/useNearestUpcomingCall";

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { upcomingCalls } = useGetCalls();
  const nearestCall = useNearestUpcomingCall(upcomingCalls || []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 15000); // Update every 15 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const time = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Africa/Lagos",
  });

  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeZone: "Africa/Lagos",
  }).format(currentTime);

  return (
      <section
          className="flex size-full flex-col gap-5 text-black"
          aria-labelledby="home-page-heading" // Associates section with the heading
      >
        {/* Hero Section */}
        <div
            className="h-[303px] w-full rounded-[20px] bg-hero bg-cover"
            role="region" // Marks this as a distinct region for accessibility
            aria-label="Current Time and Upcoming Session" // Describes the purpose of the region
        >
          <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
            {nearestCall && (
                <h2
                    className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal"
                    aria-live="polite" // Ensures screen readers announce the nearest call if it updates
                >
                  Upcoming Session at:{" "}
                  <span className="uppercase">
                {new Date(nearestCall.state!.startsAt!).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
                </h2>
            )}
            <div className="flex flex-col gap-2">
              <h1
                  id="home-page-heading"
                  className="text-4xl font-extrabold lg:text-7xl text-white-1"
                  aria-label={`Current time is ${time}`} // Explicitly announces the time
              >
                {time}
              </h1>
              <p
                  className="text-lg font-medium text-sky-1 lg:text-2xl"
                  aria-label={`Today's date is ${date}`} // Announces the date
              >
                {date}
              </p>
            </div>
          </div>
        </div>

        {/* Meeting Type List */}
        <MeetingTypeList aria-label="List of meeting options" />
      </section>
  );
};

export default Home;