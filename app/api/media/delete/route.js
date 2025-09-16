import { isAuthenticated } from "@/lib/authentication";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import MediaModel from "@/models/media.model";
import mongoose from "mongoose";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) return response(false, 403, "Unauthorized");

    await connectDB();
    const { ids = [], deleteType } = await request.json();

    if (!Array.isArray(ids) || !ids.length) {
      return response(false, 400, "Invalid or empty ID list.");
    }

    if (!["SD", "RSD"].includes(deleteType)) {
      return response(false, 400, "Delete type must be SD or RSD.");
    }

    // Only update media owned by the current user
    const update =
      deleteType === "SD" ? { deletedAt: new Date() } : { deletedAt: null };
    const result = await MediaModel.updateMany(
      {
        _id: { $in: ids.map((id) => new mongoose.Types.ObjectId(id)) },
        userId: auth.user._id,
      },
      { $set: update }
    );

    if (result.modifiedCount === 0)
      return response(false, 404, "No media found for user");

    return response(
      true,
      200,
      deleteType === "SD" ? "Media moved to trash" : "Media restored."
    );
  } catch (error) {
    return catchError(error);
  }
}

export async function DELETE(request) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) return response(false, 403, "Unauthorized");

    await connectDB();
    const { ids = [], deleteType } = await request.json();

    if (!Array.isArray(ids) || !ids.length) {
      return response(false, 400, "Invalid or empty ID list.");
    }

    if (deleteType !== "PD")
      return response(false, 400, "Delete type must be PD.");

    // Only fetch media owned by current user
    const media = await MediaModel.find({
      _id: { $in: ids.map((id) => new mongoose.Types.ObjectId(id)) },
      userId: auth.user._id,
    })
      .session(session)
      .lean();

    if (!media.length) return response(false, 404, "No media found for user");

    // Delete from DB
    await MediaModel.deleteMany({
      _id: { $in: ids.map((id) => new mongoose.Types.ObjectId(id)) },
      userId: auth.user._id,
    }).session(session);

    // Delete from Cloudinary
    const publicIds = media.map((m) => m.public_id);
    await cloudinary.api.delete_resources(publicIds);

    await session.commitTransaction();
    session.endSession();

    return response(true, 200, "Media deleted permanently");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return catchError(error);
  }
}
