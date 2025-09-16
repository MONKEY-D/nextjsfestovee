import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import CategoryModel from "@/models/category.model";
import ProductModel from "@/models/product.model";
import ShopModel from "@/models/shop.model";
import UserModel from "@/models/user.model";

export async function GET() {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();

    const shops = await ShopModel.find({
      owner: auth.user._id,
      deletedAt: null,
    }).select("_id");
    const shopIds = shops.map((shop) => shop._id);

    const [category, product, customer] = await Promise.all([
      CategoryModel.countDocuments({ shop: { $in: shopIds }, deletedAt: null }),
      ProductModel.countDocuments({ shop: { $in: shopIds }, deletedAt: null }),
      UserModel.countDocuments({ deletedAt: null }), // customers can stay global or filter if needed
    ]);

    return response(true, 200, "Dashboard count", {
      category,
      product,
      customer,
    });
  } catch (error) {
    return catchError(error);
  }
}
