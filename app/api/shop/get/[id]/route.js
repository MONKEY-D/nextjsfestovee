import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ShopModel from "@/models/shop.model";
import { isValidObjectId } from "mongoose";

export async function GET(request, { params }) {
  try {
    const auth = await isAuthenticated();
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();

    const { id } = params;

    if (!isValidObjectId(id)) {
      return response(false, 404, "Invalid object id");
    }

    const shop = await ShopModel.findOne({ _id: id, deletedAt: null }).lean();

    if (!shop) {
      return response(false, 404, "Shop not found");
    }

    return response(true, 200, "Shop found", shop);
  } catch (error) {
    return catchError(error);
  }
}
