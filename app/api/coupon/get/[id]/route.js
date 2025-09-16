import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import CouponModel from "@/models/coupon.model";
import ShopModel from "@/models/shop.model";
import { isValidObjectId } from "mongoose";

export async function GET(request, { params }) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) return response(false, 403, "Unauthorized");

    await connectDB();

    const { id } = params;
    if (!isValidObjectId(id)) return response(false, 404, "Invalid object id");

    // 1️⃣ Get all shops of the current admin
    const shops = await ShopModel.find({ owner: auth.user._id })
      .select("_id")
      .lean();
    const shopIds = shops.map((s) => s._id);

    // 2️⃣ Fetch coupon by ID among all admin's shops
    const getCoupon = await CouponModel.findOne({
      _id: id,
      owner: { $in: shopIds }, // now checks all shops
      deletedAt: null,
    }).lean();

    if (!getCoupon) {
      return response(false, 404, "Coupon not found or you do not have access");
    }

    return response(true, 200, "Coupon found", getCoupon);
  } catch (error) {
    return catchError(error);
  }
}
