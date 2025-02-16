"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";

interface FileUploadProps {
    onSuccess: (res:IKUploadResponse) => void;
    onProgress: (progress: number) => void;
    fileType?: "image" | "video";
}



export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}:FileUploadProps) {
   const [uploading , setUploading] = useState(false)
   const [error, setError] = useState<string | null>(null);


type errorr = {
  message:string
}

  const onError = (err:errorr) => {
    console.error("Upload Error:", err);
    setUploading(false);
    setError(err?.message || "Something went wrong");

  };
  
  const handleSuccess = (res:IKUploadResponse) => {
    console.log("Success", res);
    setUploading(false);
    setError(null)
    onSuccess(res)
  };
  
  const handleProgress = (evt:ProgressEvent) => {
    if (evt.lengthComputable && onProgress){
           const percentcomplete=(evt.loaded / evt.total) *100;
           onProgress(Math.round(percentcomplete))
    }

  };
  
  const handleUploadStart = () => {
    console.log("Start",);
    setUploading(true);
    setError(null);
  };

const validatefile=(file:File)=>{
       if (fileType==="video"){
        if (!file.type.startsWith("video/")){
          setError("file must be of video type")
             return false
        }
        if (file.size > 100*1024*1024){
              setError("video size must be smaller than 100 mb")
              return false
        } 
        
       }else{
         const validtypes=["image/jpeg","image/png"]
         if (!validtypes.includes(file.type)){
             setError("the image is must be jpeg , png ")
             return false
         }
         if (file.size > 5*1024*1024){
            setError("the file should be less than 5 mb")
            return false
         }
       }

       setError(null)
     return true
}
  return (
    <div className="space-y-2">
 
        <IKUpload
          fileName={fileType === "video" ? "video" : "image"}
          useUniqueFileName={true}
          validateFile={validatefile}       
          onError={onError}
          onSuccess={handleSuccess}
          onUploadProgress={handleProgress}
          onUploadStart={handleUploadStart}
          className="file-input file-input-bordered w-full"
          accept={fileType==="video"? "video/*" : "image/*"}
          folder={fileType==="video"? "videos" : "images"}
       
        />
        {
          uploading && (
            <div className="flex items-center gap-2 text-sm  text-blue-700">
              
             <Loader2 className="animate-spin w-4 h-4 "/>
             <span>UpLoading.....</span>
            </div>
          )
        }

        {
          error && (
            <div className="text-error text-sm ">{error}</div>
          )
        }
       
    </div>
  );
}