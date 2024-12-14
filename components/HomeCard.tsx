'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  return (
      <section
          className={cn(
              'bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600',
              className
          )}
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleClick?.();
          }} // Allows keyboard interaction
          tabIndex={0} // Makes the card focusable
          role="button" // Declares the card as a button for assistive technologies
          aria-label={`${title}: ${description}`} // Provides a clear label for screen readers
      >
        {/* Icon Section */}
        <div className="flex-center glassmorphism size-12 rounded-[10px]">
          <Image src={img} alt={`${title} icon`} width={27} height={27} />
        </div>

        {/* Text Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-white-1">{title}</h1>
          <p className="text-lg font-normal text-white-2">{description}</p>
        </div>
      </section>
  );
};

export default HomeCard;