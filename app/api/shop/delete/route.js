import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ShopModel from "@/models/shop.model";

// Soft delete or restore
export async function PUT(request) {
  try {
    const auth = await isAuthenticated();
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();
    const { ids, deleteType } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return response(false, 400, "Invalid or empty id list.");
    }

    const shops = await ShopModel.find({ _id: { $in: ids } }).lean();
    if (!shops.length) {
      return response(false, 404, "Shop(s) not found.");
    }

    if (deleteType === "SD") {
      // Soft delete: set deletedAt
      await ShopModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deletedAt: new Date() } }
      );
      return response(true, 200, "Shop(s) moved to trash.");
    }

    if (deleteType === "RSD") {
      // Restore: clear deletedAt
      await ShopModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deletedAt: null } }
      );
      return response(true, 200, "Shop(s) restored.");
    }

    return response(
      false,
      400,
      "Invalid operation. Delete type should be SD (soft-delete) or RSD (restore)."
    );
  } catch (error) {
    return catchError(error);
  }
}

// Permanent delete
export async function DELETE(request) {
  try {
    const auth = await isAuthenticated();
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();
    const { ids, deleteType } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return response(false, 400, "Invalid or empty id list.");
    }

    const shops = await ShopModel.find({ _id: { $in: ids } }).lean();
    if (!shops.length) {
      return response(false, 404, "Shop(s) not found.");
    }

    if (deleteType !== "PD") {
      return response(
        false,
        400,
        "Invalid operation. Delete type should be PD (permanent delete)."
      );
    }

    await ShopModel.deleteMany({ _id: { $in: ids } });

    return response(true, 200, "Shop(s) deleted permanently.");
  } catch (error) {
    return catchError(error);
  }
}
