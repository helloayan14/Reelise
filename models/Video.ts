import mongoose from "mongoose";

export const VIDEO_DIMENSIONS = {
    width:1080,
    height:1920
}
export interface IVideo {
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    _id?: mongoose.Types.ObjectId;
    controls?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    aspectratio:{
        width: number;
        height: number;
        quality: string;
    }
}

const videoSchema = new mongoose.Schema<IVideo>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    controls: {
        type: Boolean,
        default: true,
    },
    aspectratio: {
        width: {
            type: Number,
            default: VIDEO_DIMENSIONS.width,
        },
        height: {
            type: Number,
            default: VIDEO_DIMENSIONS.height,
        },
        quality: {
            type: String,
            min:1,
            max:100
        },
    },
},
    {
        timestamps: true
    }

);

const Video = mongoose.models?.Video || mongoose.model("Video", videoSchema);

export default Video;