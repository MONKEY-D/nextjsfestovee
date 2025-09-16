import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import { zSchema } from "@/lib/zodSchema";
import CouponModel from "@/models/coupon.model";
import ShopModel from "@/models/shop.model";

export async function POST(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();
    const payload = await request.json();

    const schema = zSchema.pick({
      code: true,
      discountPercentage: true,
      minShoppingAmount: true,
      validity: true,
      shopId: true, // user must provide which shop this coupon is for
    });

    const validate = schema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields", validate.error);
    }

    const { code, discountPercentage, minShoppingAmount, validity, shopId } =
      validate.data;

    // Verify shop belongs to current user
    const shop = await ShopModel.findOne({ _id: shopId, owner: auth.user._id });
    if (!shop) {
      return response(false, 403, "Invalid shop or you do not own this shop");
    }

    const newCoupon = new CouponModel({
      code,
      discountPercentage,
      minShoppingAmount,
      validity,
      owner: shop._id, // now correctly referencing the Shop
    });

    await newCoupon.save();

    return response(true, 200, "Coupon added successfully!!");
  } catch (error) {
    return catchError(error);
  }
}
