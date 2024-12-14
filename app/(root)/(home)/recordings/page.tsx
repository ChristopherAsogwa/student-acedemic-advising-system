import CallList from '@/components/CallList';
import React from 'react';

const Recordings = () => {
    return (
        <section
            className="flex size-full flex-col gap-5 text-white"
            aria-labelledby="session-recordings-heading" // Associates the section with the heading
        >
            <h1
                id="session-recordings-heading"
                className="text-3xl font-bold"
                tabIndex={0} // Makes the heading focusable for keyboard users
                aria-label="Session Recordings" // Provides a clear label for screen readers
            >
                Session Recordings
            </h1>
            <CallList
                type="recordings"
                aria-label="List of session recordings" // Describes the purpose of the CallList
            />
        </section>
    );
};

export default Recordings;