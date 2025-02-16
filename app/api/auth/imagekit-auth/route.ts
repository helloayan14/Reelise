import ImageKit from "imagekit"
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function GET() {
try {
    if (!process.env.PRIVATE_KEY) {
        throw new Error("Missing IMAGEKIT_PRIVATE_KEY in environment variables.");
      }


    const authenticationparameters=imagekit.getAuthenticationParameters()
    if (!authenticationparameters.expire || !authenticationparameters.signature || !authenticationparameters.token){
         return NextResponse.json({
          error:"params are not there",
          
         },{
          status:401
         }
        )
    }

      return NextResponse.json(authenticationparameters);
} catch (error) {
     console.error(error)
    return NextResponse.json({
        error:"cannot be proccedd in image auth"
    }, {
        status:500
    }
)
}
}                                                                                                                                                                                         