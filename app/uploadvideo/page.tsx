'use client';

import React, { useState } from "react";
import FileUpload from "@/app/component/FileUpload";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ReelUpload() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const router = useRouter();

    // Handle successful video upload
    const handleVideoSuccess = (res: IKUploadResponse) => {
        setVideoUrl(res.url);
    };

    // Handle successful thumbnail upload
    const handleThumbnailSuccess = (res: IKUploadResponse) => {
        setThumbnailUrl(res.url);
    };

    // Handle progress updates
    const handleProgress = (progress: number) => {
        setProgress(progress);
    };

    // Validate form before submitting
    const validateForm = () => {
        if (!title.trim() || !description.trim() || !videoUrl || !thumbnailUrl) {
            setError("All fields are required.");
            return false;
        }
        return true;
    };

    // Submit reel data to backend
    const handleSubmit = async () => {
        if (!validateForm()) return;

        setUploading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch("/api/auth/videos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description, videoUrl, thumbnailUrl })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create video.");
            }

            setSuccess("Reel uploaded successfully!");
            setTitle("");
            setDescription("");
            setVideoUrl(null);
            setThumbnailUrl(null);

            // Wait before redirecting
            setTimeout(() => {
                router.push("/profile");
            }, 1500);
            
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("Something went wrong.");
        }
        } finally {
            setUploading(false);
        }


    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-500 px-4">
            <div className="bg-white backdrop-blur-md shadow-lg rounded-2xl p-6 w-full max-w-lg border border-white/20 transition-all px-10 py-20 mt-12">
                {/* Heading */}
                <h2 className="text-3xl font-bold text-black text-center mb-6">Upload Your Reel</h2>

                {/* Title Input */}
                <input
                    type="text"
                    placeholder="Enter title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 bg-white/20 text-black placeholder-gray-900 border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none mb-3"
                />

                {/* Description Input */}
                <textarea
                    placeholder="Write a description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 bg-white/20 text-black placeholder-gray-900 border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none mb-3"
                    rows={3}
                />

                {/* Video Upload */}
                <div className="mb-4">
                    <label className="block text-black font-medium mb-2">Upload Video</label>
                    <FileUpload fileType="video" onSuccess={handleVideoSuccess} onProgress={handleProgress} />
                    {videoUrl && (
                        <video src={videoUrl} controls className="mt-3 w-full rounded-lg shadow-md text-black" />
                    )}
                </div>

                {/* Thumbnail Upload */}
                <div className="mb-4">
                    <label className="block text-black font-medium mb-2">Upload Thumbnail</label>
                    <FileUpload fileType="image" onSuccess={handleThumbnailSuccess} onProgress={handleProgress} />
                    {thumbnailUrl && (
                        <Image 
                            src={thumbnailUrl} 
                            alt="Thumbnail" 
                            className="mt-3 w-full h-40 object-cover rounded-lg shadow-md text-black" 
                            width={500} 
                            height={500} 
                        />
                    )}
                </div>

                {/* Upload Progress Bar */}
                {progress > 0 && (
                    <progress className="w-full h-2 bg-blue-300 rounded-lg" value={progress} max="100"></progress>
                )}

                {/* Error & Success Messages */}
                {error && <div className="text-red-500 text-sm mt-3">{error}</div>}
                {success && <div className="text-blue-500 text-sm mt-3">{success}</div>}

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 shadow-md hover:shadow-xl mt-4"
                    disabled={uploading}
                >
                    {uploading ? <Loader2 className="animate-spin w-5 h-5" /> : <UploadCloud className="w-5 h-5" />}
                    {uploading ? "Uploading..." : "Upload Reel"}
                </button>
            </div>
        </div>
    );
}
