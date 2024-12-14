import Image from 'next/image';

const Loader = () => {
    return (
        <div
            className="flex-center h-screen w-full"
            role="status" // Indicates this is a loading status to assistive technologies
            aria-live="polite" // Announces updates to screen readers in a non-disruptive way
            aria-label="Content is loading, please wait..." // Provides a meaningful label
        >
            <Image
                src="/icons/loading-circle.svg"
                alt="Loading animation"
                width={50}
                height={50}
            />
        </div>
    );
};

export default Loader;