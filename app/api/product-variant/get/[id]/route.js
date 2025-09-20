import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ProductVariantModel from "@/models/productVariant.model";
import ProductModel from "@/models/product.model";
import mongoose, { isValidObjectId } from "mongoose";

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

    // 1️⃣ Find the variant
    const variant = await ProductVariantModel.findOne({
      _id: id,
      deletedAt: null,
    }).lean();
    if (!variant) {
      return response(false, 404, "Product variant not found");
    }

    const product = await ProductModel.findOne({
      _id: variant.product,
      shop: new mongoose.Types.ObjectId(auth.user.shop),
    }).lean();
    if (!product) {
      return response(
        false,
        403,
        "You do not have access to this product variant"
      );
    }

    // 3️⃣ Populate media
    const getProductVariant = await ProductVariantModel.findById(id)
      .populate("media", "_id secure_url")
      .lean();

    return response(true, 200, "Product variant found", getProductVariant);
  } catch (error) {
    return catchError(error);
  }
}
