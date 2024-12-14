'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const pathname = usePathname();

  return (
      <nav
          className="w-full max-w-[264px]"
          aria-label="Mobile navigation menu" // Descriptive label for the navigation
      >
        <Sheet>
          {/* Trigger Button */}
          <SheetTrigger asChild>
            <button
                aria-label="Open navigation menu" // Accessible label for the menu button
                className="cursor-pointer sm:hidden"
            >
              <Image
                  src="/icons/hamburger.svg"
                  width={36}
                  height={36}
                  alt="Menu icon"
                  className="filter invert-0"
              />
            </button>
          </SheetTrigger>

          {/* Drawer Content */}
          <SheetContent
              side="left"
              className="border-none bg-white-1"
              role="dialog" // Indicates this is a dialog
              aria-labelledby="mobile-nav-title" // Associates the dialog with a title
          >
            {/* Logo and Title */}
            <Link href="/" className="flex items-center gap-1" aria-label="Go to home page">
              <Image
                  src="/icons/logo.svg"
                  width={32}
                  height={32}
                  alt="Advisr logo"
              />
              <p id="mobile-nav-title" className="text-[26px] font-extrabold text-white">
                ADVISR
              </p>
            </Link>

            {/* Navigation Links */}
            <div
                className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto"
                role="menu" // Marks the section as a menu
                aria-label="Navigation links" // Describes the content
            >
              <SheetClose asChild>
                <section
                    className="flex h-full flex-col gap-6 pt-16 text-white"
                    role="menuitem" // Individual section role for better keyboard navigation
                >
                  {sidebarLinks.map((item) => {
                    const isActive = pathname === item.route;

                    return (
                        <SheetClose asChild key={item.route}>
                          <Link
                              href={item.route}
                              key={item.label}
                              className={cn(
                                  'flex gap-4 items-center p-4 rounded-lg w-full max-w-60',
                                  {
                                    'bg-blue-1': isActive, // Highlight active link
                                  }
                              )}
                              aria-current={isActive ? 'page' : undefined} // Marks the current page link
                              aria-label={`Go to ${item.label}`} // Accessible label for the link
                          >
                            <Image
                                src={item.imgURL}
                                alt={`${item.label} icon`}
                                width={20}
                                height={20}
                            />
                            <p className="font-semibold">{item.label}</p>
                          </Link>
                        </SheetClose>
                    );
                  })}
                </section>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
  );
};

export default MobileNav;