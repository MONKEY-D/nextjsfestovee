import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ProductModel from "@/models/product.model";
import MediaModel from "@/models/media.model";

export async function GET() {
  try {
    await connectDB();

    const getProduct = await ProductModel.find({ deleteAt: null })
      .populate("media", "_id secure_url")
      .limit(8)
      .lean();

    if (!getProduct || getProduct.length === 0) {
      return response(false, 404, "Product not found");
    }

    return response(true, 200, "Product found", getProduct);
  } catch (error) {
    return catchError(error);
  }
}
