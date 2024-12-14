import React, { ReactNode } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  meetingLink?: string; // Optional to handle link copying
  meetingDateTime?: string; // Optional to handle meeting details
  handleCopyClick?: () => void;
  image?: string;
  buttonIcon?: string | undefined;
}

const MeetingModal = ({
                        isOpen,
                        onClose,
                        title,
                        className,
                        children,
                        handleClick,
                        buttonText,
                        meetingLink,
                        meetingDateTime,
                        handleCopyClick,
                        image,
                        buttonIcon,
                      }: MeetingModalProps) => {
  return (
      <Dialog
          open={isOpen}
          onOpenChange={onClose}
          aria-labelledby="modal-title" // Associates the title with the dialog for screen readers
      >
        <DialogContent
            className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-white-1 px-6 py-9 text-white"
            role="dialog" // Marks this as a dialog
            aria-describedby="modal-description" // Links to the content description for assistive technologies
        >
          <div className="flex flex-col gap-6">
            {/* Optional Image */}
            {image && (
                <div className="flex justify-center">
                  <Image src={image} alt="Success icon" width={72} height={72} />
                </div>
            )}

            {/* Modal Title */}
            <h1
                id="modal-title"
                className={cn("text-3xl font-bold leading-[42px]", className)}
            >
              {title}
            </h1>

            {/* Meeting Details */}
            {meetingLink && meetingDateTime && (
                <div
                    className="text-black"
                    id="modal-description" // Associates this section with the dialog
                >
                  <p>
                    <strong>Session Date and Time:</strong> {meetingDateTime}
                  </p>
                  <p>
                    <strong>Session Link:</strong>
                  </p>
                  <div className="flex items-center gap-2 bg-gray-100 p-2 rounded">
                    <input
                        type="text"
                        value={meetingLink}
                        readOnly
                        className="bg-gray-100 w-full text-sm"
                        aria-label="Session link" // Provides a clear label for screen readers
                    />
                    <button
                        onClick={handleCopyClick}
                        className="flex items-center justify-center w-8 h-8 bg-gray-400 rounded"
                        aria-label="Copy session link" // Describes the purpose of the button
                    >
                      <Image src="/icons/copy.svg" alt="Copy icon" width={16} height={16} />
                    </button>
                  </div>
                </div>
            )}

            {/* Custom Children */}
            {children}

            {/* Action Button */}
            <Button
                className="bg-blue-1 text-[#fff] focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={handleClick}
                aria-label={buttonText || "Perform action"} // Descriptive button label
            >
              {buttonIcon && (
                  <Image
                      src={buttonIcon}
                      alt="Button icon"
                      width={13}
                      height={13}
                  />
              )}{" "}
              &nbsp;
              {buttonText || undefined}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
  );
};

export default MeetingModal;