"use client"
import { ImageKitProvider } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;


export default function Providers({children}:{children:React.ReactNode}) {
  const authenticator = async () => {
    console.log("Authenticating with ImageKit...");
    try {
        const response = await fetch("/api/auth/imagekit-auth");
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error Response:", errorText);
            throw new Error(`Request failed: ${errorText}`);
        }                                                         

        const data = await response.json();

        return { signature: data.signature, expire: data.expire, token: data.token };
    } catch (error) {
        console.error("Authenticator Error:", error);
        throw new Error("Authentication request failed");
    }
};

  return (
    <SessionProvider>

      <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
        {/* ...client side upload component goes here */}  {children}
      </ImageKitProvider>
     
 
    </SessionProvider>
  );
}