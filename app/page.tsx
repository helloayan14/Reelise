"use client"
import { FaVideo } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProfilePage from "./profile/page";


const Home = () => {
    const {data:session }= useSession()

   
  return (
   <div>
    { session ? (
        <ProfilePage/>
      ) : (
        <div>
 
        <div className="relative flex flex-col items-center justify-center h-screen text-white text-center bg-gradient-to-r from-purple-500 to-blue-500">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 bg-[url('/reel-bg.jpg')] bg-cover bg-center opacity-20"></div>
    
          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Icon and Title */}
            <div className="flex items-center gap-2 mb-4 drop-shadow-lg">
              <FaVideo className="text-5xl text-white" />
              <h1 className="text-5xl font-bold">Share Your Moments with the World!</h1>
            </div>
            
            {/* Subtitle */}
            <p className="text-lg mb-8 opacity-90">Upload and explore exciting reels instantly.</p>
    
            {/* CTA Button */}
            <Link href="/register">
              <button className="px-6 py-3 bg-white text-purple-600 font-semibold text-lg rounded-full shadow-lg hover:scale-105 transition duration-300 flex items-center gap-2">
                <FaVideo className="text-purple-600" /> Get Started
              </button>
            </Link>                                                                                                                                 
          </div>
        </div>
        
        </div>
      )
    }


</div>
   
  
  );
};

export default Home;

