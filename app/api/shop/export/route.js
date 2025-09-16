import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ShopModel from "@/models/shop.model";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();

    const filter = { deletedAt: null };

    const shops = await ShopModel.find(filter).sort({ createdAt: -1 }).lean();

    if (!shops || shops.length === 0) {
      return response(false, 404, "No shops found.");
    }

    return response(true, 200, "Data found", shops);
  } catch (error) {
    return catchError(error);
  }
}
