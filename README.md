## Academic Adviser-Student Communication Platform

This project is built to facilitate real-time audio and video communication between academic advisers and students. Using the powerful GetStream.io for real-time communication and ClerkJS for user management, authentication, and authorization, this application bridges the gap between advisers and students efficiently.

# Features
•	Real-time Communication: Seamless audio and video calls using GetStream.io, ensuring smooth interactions between users.
•	User Management: Robust authentication and authorization powered by ClerkJS, providing secure and user-friendly account handling.
•	Built with Next.js: Utilizes the latest Next.js framework with TypeScript for scalability and maintainability.

# Getting Started

Follow the instructions below to set up and run the application locally:

# Prerequisites

Ensure you have the following installed on your machine:
•	Node.js (version 16 or higher)
•	npm (or yarn/pnpm as alternatives)

# Installation
    1.	Clone the repository:

    git clone <repository-url>  
    cd <repository-directory>


	2.	Install dependencies:

    npm install
    # or
    yarn install
    # or
    pnpm install



# Running the Development Server

Start the development server with:

    npm run dev
    # or
    yarn dev
    # or
    pnpm dev

Open http://localhost:3000 in your browser to access the application. The app will automatically reload if you make edits to the source code.

# Configuration

Ensure you configure the required GetStream.io and ClerkJS credentials. Add them to your environment variables (.env.local):

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    STREAM_SECRET_KEY=your_stream_secret_key
    NEXT_PUBLIC_BASE_URL=your_local_or_base_url
    NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key

Refer to the documentation of GetStream.io and ClerkJS for guidance on obtaining API keys.

# File Structure

## Key files and folders:
•	app/page.tsx: Main entry point for the application’s UI.
•	app/api: API endpoints for server-side functionality.
•	.env.local: Configuration for environment variables (not included in version control).

## Standout Features
•	Real-time Communication: Students and advisers can connect instantly via high-quality audio and video calls.
•	Secure Authentication: ClerkJS ensures that only authorized users can access the platform.
•	Modern Development Stack: Written with TypeScript and the Next.js App Router for performance and scalability.

## Learn More

To learn more about the tools and frameworks used:
•	Next.js Documentation: Learn about the features and APIs of Next.js.
•	ClerkJS Documentation: Learn about authentication and user management with ClerkJS.
•	GetStream.io Documentation: Explore GetStream.io’s features for real-time communication.

# Deployment

Deploy the application easily with Vercel:
1.	Push your repository to a Git provider (GitHub, GitLab, etc.).
2.	Connect your repository to Vercel.
3.	Follow the deployment process outlined in the Next.js deployment documentation.

## Credits

This project was inspired by and built with the guidance of resources provided by JSMastery Pro. Their educational materials and tutorials greatly contributed to the implementation and functionality of this application.