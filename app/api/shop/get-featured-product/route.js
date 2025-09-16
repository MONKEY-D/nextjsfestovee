import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ShopModel from "@/models/shop.model";

export async function GET() {
  try {
    await connectDB();

    // Fetch latest 8 shops that are not deleted
    const shops = await ShopModel.find({ deletedAt: null })
      .sort({ createdAt: -1 })
      .limit(8)
      .lean();

    if (!shops || shops.length === 0) {
      return response(false, 404, "Shops not found");
    }

    return response(true, 200, "Shops found", shops);
  } catch (error) {
    return catchError(error);
  }
}
