import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import CouponModel from "@/models/coupon.model";
import ShopModel from "@/models/shop.model";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) return response(false, 403, "Unauthorized");

    await connectDB();

    // 1️⃣ Get all shops of the current admin
    const shops = await ShopModel.find({ owner: auth.user._id })
      .select("_id")
      .lean();
    const shopIds = shops.map((s) => s._id);

    // 2️⃣ Fetch coupons for these shops
    const getCoupon = await CouponModel.find({
      owner: { $in: shopIds },
      deletedAt: null,
    })
      .sort({ createdAt: -1 })
      .lean();

    if (!getCoupon || getCoupon.length === 0) {
      return response(false, 404, "No coupons found for your shops");
    }

    return response(true, 200, "Coupons found", getCoupon);
  } catch (error) {
    return catchError(error);
  }
}
