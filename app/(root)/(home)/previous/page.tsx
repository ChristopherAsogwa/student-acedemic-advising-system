import CallList from '@/components/CallList';
import React from 'react';

const Previous = () => {
    return (
        <section
            className="flex size-full flex-col gap-5 text-white"
            aria-labelledby="previous-session-heading" // Associates the section with the heading
        >
            <h1
                id="previous-session-heading"
                className="text-3xl font-bold"
                tabIndex={0} // Makes the heading focusable for keyboard users
                aria-label="Previous Sessions" // Provides a clear label for screen readers
            >
                Previous Session
            </h1>
            <CallList type="ended" aria-label="List of previous sessions" />
        </section>
    );
};

export default Previous;