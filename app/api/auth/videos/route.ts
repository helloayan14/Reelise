import { authOptions } from "@/lib/authOptions";
import { dbConnect } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        await dbConnect()
       const videos= await Video.find({}).sort({createdAt:-1}).lean()
       if (!videos || videos.length===0){
          return NextResponse.json(
            [],
          {
            status:401
          })
       }

       return NextResponse.json(videos,{status:200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            error:"failed to fetch videos"
        },{
            status:500
        })
    }
}

export async function POST(request:NextRequest){
    try {
       const session =  await getServerSession(authOptions)
       if (!session){
        return NextResponse.json({
            error: "unauthorized request"
        },{
                status:401
        })
       }

       await dbConnect()

       const body:IVideo =  await request.json()
       const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch  {
            return false;
        }
    };
    
    if (!isValidUrl(body.videoUrl)) {
        return NextResponse.json({ error: "Invalid video URL" }, { status: 400 });
    }

       if(!body.title ||
          !body.description ||
          !body.videoUrl ||
          !body.thumbnailUrl 
       ) {
            return NextResponse.json({
                error:"missing fields"

            },{
                status:400
            })
       }

  

       const videodata={
        ...body,
        controls:body.controls ?? true,
        transformation:{
            height:1920,
            width:1080,
            quality:body.aspectratio?.quality ?? 100
        }
       }

      const newvideo= await  Video.create(videodata)
      return NextResponse.json(newvideo)
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            error:"failed to create a video"
        },{
            status:500
        })
    }
}