import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import CategoryModel from "@/models/category.model";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();

    // Filter categories owned by the current user and not deleted
    const filter = {
      owner: auth.user._id,
      deletedAt: null,
    };

    const getCategory = await CategoryModel.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    if (!getCategory || getCategory.length === 0) {
      return response(false, 404, "No categories found");
    }

    return response(true, 200, "Categories found", getCategory);
  } catch (error) {
    return catchError(error);
  }
}
