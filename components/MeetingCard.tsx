"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
                       icon,
                       title,
                       date,
                       isPreviousMeeting,
                       buttonIcon1,
                       handleClick,
                       link,
                       buttonText,
                     }: MeetingCardProps) => {
  const { toast } = useToast();

  return (
      <section
          className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-white-1 px-5 py-8 xl:max-w-[568px]"
          role="region" // Marks this card as a distinct, navigable section
          aria-label={`Meeting: ${title}, scheduled for ${date}`} // Provides descriptive context for the card
      >
        {/* Meeting Info */}
        <article className="flex flex-col gap-5">
          <Image
              src={icon}
              alt={`${title} icon`} // Dynamic alt text for the icon
              width={28}
              height={28}
          />
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <h1
                  className="text-2xl font-bold"
                  aria-label={`Meeting title: ${title}`} // Ensures title is announced
              >
                {title}
              </h1>
              <p
                  className="text-base font-normal"
                  aria-label={`Meeting date: ${date}`} // Ensures date is announced
              >
                {date}
              </p>
            </div>
          </div>
        </article>

        {/* Actions Section */}
        <article
            className={cn("flex justify-center relative", {})}
            aria-label="Meeting actions" // Describes the purpose of this section
        >
          {!isPreviousMeeting && (
              <div className="flex gap-2">
                {/* Start/Play Button */}
                <Button
                    onClick={handleClick}
                    className="rounded bg-blue-1 text-white-1 px-6"
                    aria-label={`Start or view meeting: ${title}`} // Describes the button's action
                >
                  {buttonIcon1 && (
                      <Image
                          src={buttonIcon1}
                          alt="Action icon"
                          width={20}
                          height={20}
                      />
                  )}
                  &nbsp; {buttonText}
                </Button>

                {/* Copy Link Button */}
                <Button
                    onClick={() => {
                      navigator.clipboard.writeText(link);
                      toast({
                        title: "Link Copied",
                      });
                    }}
                    className="bg-white-4 px-6"
                    aria-label={`Copy meeting link for ${title}`} // Describes the button's purpose
                >
                  <Image
                      src="/icons/copy.svg"
                      alt="Copy link icon"
                      width={20}
                      height={20}
                  />
                  &nbsp; Copy Link
                </Button>
              </div>
          )}
        </article>
      </section>
  );
};

export default MeetingCard;