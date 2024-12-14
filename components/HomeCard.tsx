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
              'bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer',
              className
          )}
          onClick={handleClick}
      >
        {/* Icon Section */}
        <div className="flex-center glassmorphism size-12 rounded-[10px]">
          <Image src={img} alt={`${title} icon`} width={27} height={27}/>
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