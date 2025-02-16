"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";


export function Header() {
    const { data: session } = useSession();
   

    const handlesignout = async () => {
        try {
            await signOut({ callbackUrl: "/" });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 ">
            <nav className="backdrop-blur-lg bg-white shadow-lg border border-white/20 rounded-b-2xl mx-auto max-w-6xl flex items-center justify-between py-4 px-6 mt-3">
                {/* Logo with 3D Text */}
                <Link 
                    href="/" 
                    className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 drop-shadow-lg transition transform hover:scale-105"
                >
                    Reelise
                </Link>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-4">
                    {session ? (
                        <button 
                            onClick={handlesignout} 
                            className="bg-gradient-to-b from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.2),inset_3px_3px_6px_rgba(0,0,0,0.3)] transition hover:scale-105 active:scale-95"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <Link 
                            href="/login" 
                            className="bg-gradient-to-b from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.2),inset_3px_3px_6px_rgba(0,0,0,0.3)] transition hover:scale-105 active:scale-95"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}

