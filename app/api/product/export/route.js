import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import CategoryModel from "@/models/category.model";
import ProductModel from "@/models/product.model";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }
    await connectDB();

    const filter = {
      deletedAt: null,
    };

    const shop = await ShopModel.findOne({ owner: auth.user._id });
    if (!shop) return response(false, 404, "No shop found for this user");

    const getProduct = await ProductModel.find({
      deletedAt: null,
      shop: shop._id,
    })
      .select("-media -description")
      .sort({ createdAt: -1 })
      .lean();

    if (!getProduct) {
      return response(false, 404, "Collection empty");
    }
    return response(true, 200, "Data found", getProduct);
  } catch (error) {
    return catchError(error);
  }
}
