import CallList from '@/components/CallList';
import React from 'react';

const Upcoming = () => {
    return (
        <section
            className="flex size-full flex-col gap-5 text-white"
            aria-labelledby="upcoming-session-heading" // Associates the section with the heading
        >
            <h1
                id="upcoming-session-heading"
                className="text-3xl font-bold"
                aria-label="Upcoming Sessions" // Provides a clear label for screen readers
            >
                Upcoming Session
            </h1>
            <CallList
                type="upcoming"
                aria-label="List of upcoming sessions" // Describes the purpose of the CallList
            />
        </section>
    );
};

export default Upcoming;