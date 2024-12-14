import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MobileNav from './MobileNav';
import { SignedIn, UserButton } from '@clerk/nextjs';

const Navbar = () => {
    return (
        <nav
            className="flex-between fixed z-50 w-full bg-white-1 px-6 py-4 lg:px-10"
            role="navigation" // Marks this as the primary navigation region
            aria-label="Main navigation" // Describes the purpose of the navigation for screen readers
        >
            {/* Logo Link */}
            <Link href="/" className="flex items-center gap-1" aria-label="Go to homepage">
                <Image
                    src="/icons/logo.svg"
                    width={32}
                    height={32}
                    alt="Advisr logo"
                    className="max-sm:size-10"
                />
                <p className="text-[26px] font-extrabold text-white max-sm:hidden">
                    ADVISR
                </p>
            </Link>

            {/* Right Section */}
            <div className="flex-between gap-5">
                {/* User Button for Signed-In Users */}
                <SignedIn>
                    <UserButton aria-label="User menu" />
                </SignedIn>

                {/* Mobile Navigation */}
                <MobileNav />
            </div>
        </nav>
    );
};

export default Navbar;