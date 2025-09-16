import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import CategoryModel from "@/models/category.model";
import { isValidObjectId } from "mongoose";

export async function GET(request, { params }) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();

    const { id } = params;

    if (!isValidObjectId(id)) {
      return response(false, 404, "Invalid object id");
    }

    const filter = {
      _id: id,
      owner: auth.user._id, // Only categories owned by this user
      deletedAt: null,
    };

    const getCategory = await CategoryModel.findOne(filter).lean();

    if (!getCategory) {
      return response(
        false,
        404,
        "Category not found or you do not have access"
      );
    }

    return response(true, 200, "Category found", getCategory);
  } catch (error) {
    return catchError(error);
  }
}
