import { isAuthenticated } from "@/lib/authentication";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import MediaModel from "@/models/media.model";
import mongoose from "mongoose";

export async function POST(request) {
  let payload = [];
  try {
    // 1️⃣ Get media data from request
    payload = await request.json();
    if (!Array.isArray(payload) || payload.length === 0) {
      return response(false, 400, "No media data provided");
    }

    // 2️⃣ Authenticate user
    const auth = await isAuthenticated();
    if (!auth.isAuth || !auth.user?._id) {
      return response(false, 403, "Unauthorized");
    }

    // 3️⃣ Connect to MongoDB
    await connectDB();
    const userId = new mongoose.Types.ObjectId(auth.user._id);

    // Optional: attach shop if user has one
    const shopId = auth.user.shop
      ? new mongoose.Types.ObjectId(auth.user.shop)
      : undefined;

    const mediaWithUser = payload.map((item) => ({
      ...item,
      userId,
      shop: shopId,
    }));

    // 4️⃣ Insert into database
    const newMedia = await MediaModel.insertMany(mediaWithUser);

    return response(true, 200, "Media uploaded successfully!", newMedia);
  } catch (error) {
    // Cleanup uploaded media on Cloudinary if something went wrong
    if (payload && payload.length > 0) {
      const publicIds = payload.map((data) => data.public_id || data.publicId);
      try {
        await cloudinary.api.delete_resources(publicIds);
      } catch (deleteError) {
        error.cloudinary = deleteError;
      }
    }
    return catchError(error);
  }
}
