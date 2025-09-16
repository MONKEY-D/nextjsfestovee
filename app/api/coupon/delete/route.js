import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import CouponModel from "@/models/coupon.model";
import ShopModel from "@/models/shop.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) return response(false, 403, "Unauthorized");

    await connectDB();
    const payload = await request.json();
    const ids = payload.ids || [];
    const deleteType = payload.deleteType;

    if (!Array.isArray(ids) || ids.length === 0)
      return response(false, 400, "Invalid or empty id list.");

    // 1️⃣ Get all shop IDs of the user
    const shops = await ShopModel.find({ owner: auth.user._id })
      .select("_id")
      .lean();
    const shopIds = shops.map((s) => s._id);

    // 2️⃣ Find coupons for these shops
    const coupons = await CouponModel.find({
      _id: { $in: ids },
      owner: { $in: shopIds },
    }).lean();

    if (!coupons.length)
      return response(false, 404, "No coupons found for your shops");

    if (!["SD", "RSD"].includes(deleteType))
      return response(false, 400, "Invalid delete operation. Use SD or RSD.");

    const updateValue =
      deleteType === "SD" ? { deletedAt: new Date() } : { deletedAt: null };

    await CouponModel.updateMany(
      { _id: { $in: ids }, owner: { $in: shopIds } },
      { $set: updateValue }
    );

    return response(
      true,
      200,
      deleteType === "SD" ? "Coupon(s) moved to trash" : "Coupon(s) restored"
    );
  } catch (error) {
    return catchError(error);
  }
}

export async function DELETE(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) return response(false, 403, "Unauthorized");

    await connectDB();
    const payload = await request.json();
    const ids = payload.ids || [];
    const deleteType = payload.deleteType;

    if (!Array.isArray(ids) || ids.length === 0)
      return response(false, 400, "Invalid or empty id list.");

    const shops = await ShopModel.find({ owner: auth.user._id })
      .select("_id")
      .lean();
    const shopIds = shops.map((s) => s._id);

    const coupons = await CouponModel.find({
      _id: { $in: ids },
      owner: { $in: shopIds },
    }).lean();

    if (!coupons.length)
      return response(false, 404, "No coupons found for your shops");

    if (deleteType !== "PD")
      return response(
        false,
        400,
        "Invalid delete operation. Use PD for permanent delete."
      );

    await CouponModel.deleteMany({
      _id: { $in: ids },
      owner: { $in: shopIds },
    });

    return response(true, 200, "Coupon(s) deleted permanently");
  } catch (error) {
    return catchError(error);
  }
}
