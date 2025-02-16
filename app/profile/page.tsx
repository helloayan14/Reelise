'use client';

import { apiclient } from '@/lib/api-client';
import { IVideo } from '@/models/Video';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IKVideo } from 'imagekitio-next';
import Image from 'next/image';

export default function ProfilePage() {
    const router = useRouter();
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const videoss = await apiclient.getvideos();
                setVideos(videoss);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 px-6 pt-24">
            <h1 className="text-4xl font-bold mb-4 text-white tracking-wide">Your Reels</h1>
            <p className="text-lg mb-6 text-white italic">Showcase your best moments!</p>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {videos.map((video) => (
                    <div 
                        key={video?._id?.toString()} 
                        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition transform hover:scale-105 hover:shadow-xl"
                        onClick={() => setSelectedVideo(video)}
                    >
                        {/* Video Thumbnail */}

                        <div className="relative group">
                         
                        <Image src={video.thumbnailUrl} alt={video.title} className='w-full h-52 object-cover' width={200} height={200}/>
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition">
                                <span className="text-white text-4xl font-bold drop-shadow-lg">▶</span>
                            </div>
                        </div>

                        {/* Video Info */}
                        <div className="p-4">
                            <h2 className="text-lg font-bold text-gray-900 truncate">{video.title}</h2>
                            <p className="text-gray-500 text-sm mt-2 leading-snug italic">{video.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Upload Button */}
            <div 
                className="fixed bottom-6 right-6 w-16 h-16 flex items-center justify-center bg-white text-blue-600 text-4xl font-bold rounded-full shadow-lg cursor-pointer hover:bg-blue-100 transition duration-200"
                onClick={() => router.push('/uploadvideo')}
            >
                +
            </div>

            {/* Video Popup Modal */}
            {selectedVideo && (
                <div 
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 p-4 z-50"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div 
                        className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button 
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
                            onClick={() => setSelectedVideo(null)}
                        >
                            ✕
                        </button>

                        {/* Video Player */}
                        <IKVideo 
                            src={selectedVideo?.videoUrl} 
                            controls 
                            className="w-full rounded-lg"
                        />
                        
                        {/* Video Info */}
                        <div className="mt-4 text-center">
                            <h2 className="text-xl font-bold text-gray-800">{selectedVideo?.title}</h2>
                            <p className="text-gray-600 mt-2 italic">{selectedVideo?.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
