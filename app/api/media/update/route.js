import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import { zSchema } from "@/lib/zodSchema";
import MediaModel from "@/models/media.model";
import { isValidObjectId, Types } from "mongoose";

export async function PUT(request) {
  try {
    // 1️⃣ Authenticate admin
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) return response(false, 403, "Unauthorized");

    // 2️⃣ Connect to MongoDB
    await connectDB();

    // 3️⃣ Parse and validate request payload
    const payload = await request.json();
    const schema = zSchema.pick({
      _id: true,
      alt: true,
      title: true,
    });
    const validate = schema.safeParse(payload);
    if (!validate.success) {
      return response(
        false,
        400,
        "Invalid or missing field(s).",
        validate.error
      );
    }

    const { _id, alt, title } = validate.data;

    // 4️⃣ Validate MongoDB ObjectId
    if (!isValidObjectId(_id)) {
      return response(false, 400, "Invalid object id");
    }

    // 5️⃣ Find media by id **owned by the current admin**
    const getMedia = await MediaModel.findOne({
      _id: new Types.ObjectId(_id),
      userId: auth.user._id, // ownership check
      deletedAt: null, // only allow updating non-deleted media
    });

    if (!getMedia) {
      return response(false, 404, "Media not found or access denied");
    }

    // 6️⃣ Update fields
    getMedia.alt = alt;
    getMedia.title = title;

    await getMedia.save();

    return response(true, 200, "Media updated successfully!", getMedia);
  } catch (error) {
    return catchError(error);
  }
}
