import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ProductModel from "@/models/product.model";
import "../../../../models/media.model";

export async function GET() {
  try {
    await connectDB();

    const products = await ProductModel.find({ deletedAt: null })
      .populate("media", "_id secure_url")
      .limit(8)
      .lean();

    if (!products || products.length === 0) {
      return response(false, 404, "Products not found");
    }

    return response(true, 200, "Products found", { data: products });
  } catch (error) {
    return catchError(error);
  }
}
