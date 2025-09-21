import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ShopModel from "@/models/shop.model";

export async function GET() {
  try {
    await connectDB();

    const shops = await ShopModel.find({ visible: true, deletedAt: null })
      .populate("media", "_id secure_url")
      .limit(8)
      .lean();

    if (!shops || shops.length === 0) {
      return response(false, 404, "Shops not found");
    }

    return response(true, 200, "Shops found", { data: shops });
  } catch (error) {
    return catchError(error);
  }
}
