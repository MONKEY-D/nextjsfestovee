import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import CategoryModel from "@/models/category.model";

export async function GET() {
  try {
    await connectDB();

    const getCategory = await CategoryModel.find({ deletedAt: null }).lean();

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
