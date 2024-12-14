import StreamVideoProvider from '@/providers/StreamClientProvider';
import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
    title: "Advisr - Student Advising System",
    description: "A real-time video and audio feature for interaction between academic adviser and student",
    icons: {
        icon: '/icons/logo.svg',
    },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en"> {/* Declares the language for screen readers */}
        <body>
        <main
            role="main" // Declares the primary content area of the page
            aria-labelledby="app-title" // Links to a hidden heading for better context
        >
            {/* Hidden heading for screen readers */}
            <h1 id="app-title" className="sr-only">
                Advisr - Student Advising System
            </h1>

            {/* StreamVideoProvider wraps the app */}
            <StreamVideoProvider>
                {children}
            </StreamVideoProvider>
        </main>
        </body>
        </html>
    );
};

export default RootLayout;