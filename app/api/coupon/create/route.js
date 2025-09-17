import mongoose from "mongoose";
import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import { zSchema } from "@/lib/zodSchema";
import CouponModel from "@/models/coupon.model";
import ShopModel from "@/models/shop.model";

export async function POST(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) return response(false, 403, "Unauthorized");

    await connectDB();
    const payload = await request.json();

    // Validate payload
    const schema = zSchema.pick({
      code: true,
      discountPercentage: true,
      minShoppingAmount: true,
      validity: true,
      shopId: true,
    });

    const validate = schema.safeParse(payload);
    if (!validate.success)
      return response(false, 400, "Invalid or missing fields", validate.error);

    const { code, discountPercentage, minShoppingAmount, validity, shopId } =
      validate.data;

    // Check if shopId is valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(shopId)) {
      return response(false, 400, "Invalid shopId provided");
    }

    // Find shop owned by this admin
    const shop = await ShopModel.findOne({
      _id: new mongoose.Types.ObjectId(shopId),
      owner: new mongoose.Types.ObjectId(auth.user._id),
    });

    if (!shop) {
      return response(
        false,
        404,
        "Shop not found or you do not have permission to add coupons to this shop"
      );
    }

    // Check if coupon code already exists for this shop
    const existingCoupon = await CouponModel.findOne({
      code: code.trim(),
      owner: shop._id,
      deletedAt: null,
    });
    if (existingCoupon) {
      return response(false, 409, "Coupon code already exists for this shop");
    }

    // Create new coupon
    const newCoupon = new CouponModel({
      code: code.trim(),
      discountPercentage,
      minShoppingAmount,
      validity,
      owner: shop._id,
    });

    await newCoupon.save();

    return response(true, 200, "Coupon added successfully!!");
  } catch (error) {
    return catchError(error);
  }
}
