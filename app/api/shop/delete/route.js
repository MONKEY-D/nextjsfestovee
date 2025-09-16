import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ShopModel from "@/models/shop.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated();
    if (!auth.isAuth) return response(false, 403, "Unauthorized");

    await connectDB();
    const payload = await request.json();

    const ids = payload.ids || [];
    const deleteType = payload.deleteType;

    if (!Array.isArray(ids) || ids.length === 0)
      return response(false, 400, "Invalid or empty id list.");

    // Only get shops owned by the authenticated user
    const shops = await ShopModel.find({
      _id: { $in: ids },
      owner: auth.user._id,
    }).lean();
    if (!shops.length) return response(false, 404, "Shop(s) not found.");

    if (!["SD", "RSD"].includes(deleteType))
      return response(
        false,
        400,
        "Invalid delete operation. Delete type should be SD or RSD for this route"
      );

    if (deleteType === "SD") {
      await ShopModel.updateMany(
        { _id: { $in: ids }, owner: auth.user._id },
        { $set: { deletedAt: new Date().toISOString() } }
      );
      return response(true, 200, "Shop(s) moved to trash.");
    }

    await ShopModel.updateMany(
      { _id: { $in: ids }, owner: auth.user._id },
      { $set: { deletedAt: null } }
    );
    return response(true, 200, "Shop(s) restored.");
  } catch (error) {
    return catchError(error);
  }
}

export async function DELETE(request) {
  try {
    const auth = await isAuthenticated();
    if (!auth.isAuth) return response(false, 403, "Unauthorized");

    await connectDB();
    const payload = await request.json();

    const ids = payload.ids || [];
    const deleteType = payload.deleteType;

    if (!Array.isArray(ids) || ids.length === 0)
      return response(false, 400, "Invalid or empty id list.");

    // Only get shops owned by the authenticated user
    const shops = await ShopModel.find({
      _id: { $in: ids },
      owner: auth.user._id,
    }).lean();
    if (!shops.length) return response(false, 404, "Shop(s) not found.");

    if (deleteType !== "PD")
      return response(
        false,
        400,
        "Invalid delete operation. Delete type should be PD for this route"
      );

    await ShopModel.deleteMany({ _id: { $in: ids }, owner: auth.user._id });
    return response(true, 200, "Shop(s) deleted permanently.");
  } catch (error) {
    return catchError(error);
  }
}
