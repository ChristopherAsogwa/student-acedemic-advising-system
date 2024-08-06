import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Advisr - Student Advising System",
  description: "A real-time video and audio feature for interaction between academic adviser and student",
  icons: {
    icon: '/icons/logo.svg'
  }
};

const RootLayout = ({ children }: {children : ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout