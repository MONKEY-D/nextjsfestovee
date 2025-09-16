import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ProductVariantModel from "@/models/productVariant.model";
import ProductModel from "@/models/product.model";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();

    // 1. Find all products belonging to admin's shop(s)
    const adminProducts = await ProductModel.find({ shop: auth.user.shop })
      .select("_id")
      .lean();
    const productIds = adminProducts.map((p) => p._id);

    // 2. Filter only variants belonging to these products
    const filter = {
      deletedAt: null,
      product: { $in: productIds },
    };

    const getProductVariant = await ProductVariantModel.find(filter)
      .select("-media")
      .sort({ createdAt: -1 })
      .lean();

    if (!getProductVariant || !getProductVariant.length) {
      return response(false, 404, "Collection empty");
    }

    return response(true, 200, "Data found", getProductVariant);
  } catch (error) {
    return catchError(error);
  }
}
