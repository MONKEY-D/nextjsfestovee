import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ProductModel from "@/models/product.model";
import ShopModel from "@/models/shop.model";
import { isValidObjectId } from "mongoose";

export async function GET(request, { params }) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();

    const { id } = params; // <-- just destructure directly

    if (!isValidObjectId(id)) {
      return response(false, 404, "Invalid product ID");
    }

    const product = await ProductModel.findOne({
      _id: id,
      deletedAt: null,
    }).lean();

    if (!product) {
      return response(false, 404, "Product not found");
    }

    const shop = await ShopModel.findById(product.shop);
    if (!shop || shop.owner.toString() !== auth.user._id) {
      return response(false, 403, "Unauthorized");
    }

    return response(true, 200, "Product type fetched", {
      product: {
        _id: product._id,
        name: product.name,
        type: product.type,
      },
    });
  } catch (error) {
    return catchError(error);
  }
}
