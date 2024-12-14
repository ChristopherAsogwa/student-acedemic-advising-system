import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Advisr - Student Advising System",
  description: "A robust academic student advising system",
  icons: {
    icon: '/icons/logo.svg',
  },
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
      <main className="relative">
        {/* Navbar */}
        <Navbar />

        {/* Main Content Layout */}
        <div className="flex">
          {/* Sidebar */}
          <Sidebar
              aria-label="Navigation Sidebar" // Adds a descriptive label for the sidebar
          />

          {/* Main Content Section */}
          <section
              className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14"
              role="main" // Declares this as the primary content region
              aria-label="Main Content" // Descriptive label for screen readers
          >
            <div className="w-full">{children}</div>
          </section>
        </div>
      </main>
  );
};

export default HomeLayout;