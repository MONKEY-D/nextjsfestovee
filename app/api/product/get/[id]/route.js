import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ProductModel from "@/models/product.model";
import { isValidObjectId } from "mongoose";
import MediaModel from "@/models/media.model";

export async function GET(request, { params }) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }
    await connectDB();

    const getParams = await params;
    const id = getParams.id;

    const filter = {
      deletedAt: null,
    };

    if (!isValidObjectId(id)) {
      return response(false, 404, "Invalid object id");
    }

    filter._id = id;

    const getProduct = await ProductModel.findOne(filter)
      .populate("media", "_id secure_url")
      .lean();

    if (!getProduct) {
      return response(false, 404, "Product not found");
    }

    const shop = await ShopModel.findById(getProduct.shop);
    if (shop.owner.toString() !== auth.user._id) {
      return response(false, 403, "Unauthorized");
    }

    return response(true, 200, "Product found", getProduct);
  } catch (error) {
    return catchError(error);
  }
}
