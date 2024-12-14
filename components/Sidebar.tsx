'use client';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside
            className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-white-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]"
            role="navigation" // Declares the sidebar as a navigation region
            aria-label="Sidebar navigation" // Describes the purpose of the sidebar for screen readers
        >
            {/* Navigation Links */}
            <div className="flex flex-1 flex-col gap-6">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={cn(
                                'flex gap-4 items-center p-4 rounded-lg justify-start',
                                {
                                    'bg-blue-1 text-white-1': isActive, // Highlight active link
                                }
                            )}
                            aria-current={isActive ? 'page' : undefined} // Marks the current page
                            aria-label={`Go to ${link.label}`} // Describes the link’s purpose
                        >
                            <Image
                                src={link.imgURL}
                                alt={`${link.label} icon`} // Improved alt text for icons
                                width={24}
                                height={24}
                            />
                            <p className="text-lg font-semibold max-lg:hidden">{link.label}</p>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
};

export default Sidebar;