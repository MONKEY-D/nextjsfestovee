import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import MediaModel from "@/models/media.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // 1️⃣ Authenticate admin
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) return response(false, 403, "Unauthorized");

    // 2️⃣ Connect to MongoDB
    await connectDB();

    // 3️⃣ Parse query params
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "0", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const deleteType = searchParams.get("deleteType");

    // 4️⃣ Build filter
    let filter = { userId: auth.user._id }; // only media owned by admin
    if (deleteType === "SD") {
      filter.deletedAt = null;
    } else if (deleteType === "PD") {
      filter.deletedAt = { $ne: null };
    }

    // 5️⃣ Fetch media data with pagination
    const mediaData = await MediaModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit)
      .lean();

    const totalMedia = await MediaModel.countDocuments(filter);

    // 6️⃣ Return JSON response
    return NextResponse.json({
      success: true,
      mediaData,
      meta: {
        total: totalMedia,
        page,
        limit,
        hasMore: (page + 1) * limit < totalMedia,
      },
    });
  } catch (error) {
    return catchError(error);
  }
}
