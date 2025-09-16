import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import { zSchema } from "@/lib/zodSchema";
import CouponModel from "@/models/coupon.model";
import ShopModel from "@/models/shop.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) return response(false, 403, "Unauthorized");

    await connectDB();
    const payload = await request.json();

    // Validate input
    const schema = zSchema.pick({
      _id: true,
      code: true,
      discountPercentage: true,
      minShoppingAmount: true,
      validity: true,
    });

    const validate = schema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields", validate.error);
    }
    const validatedData = validate.data;

    // Get all shops of the current admin
    const shops = await ShopModel.find({ owner: auth.user._id })
      .select("_id")
      .lean();
    const shopIds = shops.map((s) => s._id);

    // Find coupon by _id and any of the admin's shops
    const getCoupon = await CouponModel.findOne({
      _id: validatedData._id,
      owner: { $in: shopIds }, // works for multiple shops
      deletedAt: null,
    });

    if (!getCoupon) {
      return response(false, 404, "Coupon not found or you do not have access");
    }

    // Update coupon
    getCoupon.code = validatedData.code;
    getCoupon.discountPercentage = validatedData.discountPercentage;
    getCoupon.minShoppingAmount = validatedData.minShoppingAmount;
    getCoupon.validity = validatedData.validity;

    await getCoupon.save();

    return response(true, 200, "Coupon updated successfully!!");
  } catch (error) {
    return catchError(error);
  }
}
