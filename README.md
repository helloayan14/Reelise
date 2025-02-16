# Reelise

Reelise is a reel upload platform built with Next.js, NextAuth for authentication, ImageKit for media storage, and DaisyUI for styling.

## Features

- **Authentication**: NextAuth is used for secure user authentication.
- **Image/Video Upload**: ImageKit handles media storage and optimization.
- **UI Components**: DaisyUI is used for a clean and responsive design.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, DaisyUI
- **Authentication**: NextAuth
- **Storage**: ImageKit
- **Database**: MongoDB

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/helloayan14/reelise.git
   cd reelise
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env.local` file:
   ```sh
   NEXTAUTH_URL=your_nextauth_url
   NEXTAUTH_SECRET=your_nextauth_secret
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   MONGODB_URI=your_mongodb_uri
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```

## Deployment

Reelise can be deployed easily on platforms like Vercel or Netlify.
My deplyed project https://github.com/helloayan14/Reelise

## License

MIT License
