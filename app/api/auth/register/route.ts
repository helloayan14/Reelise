import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { NextResponse,NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const {email,password} = await request.json();
    
        if (!email || !password) {
            return NextResponse.json({error:"Missing fields are required"},{status:400});
        }

        await dbConnect();
       const existingUser = await User.findOne({email});
       if (existingUser) {
        return NextResponse.json({error:"User already exists"},{status:400});
       }
       const user = new User({email,password});
       await user.save();
       return NextResponse.json({message:"User created successfully"},{status:201},);
        
    } catch (error) {
        console.error(error)
       return NextResponse.json({error:"Something went wrong while registering"},{status:500});
    }
}