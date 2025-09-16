import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ProductModel from "@/models/product.model";
import ShopModel from "@/models/shop.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) return response(false, 403, "Unauthorized");

    await connectDB();
    const { ids = [], deleteType } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0)
      return response(false, 400, "Invalid or empty id list.");

    // Get the shop for the logged-in user
    const shop = await ShopModel.findOne({ owner: auth.user._id });
    if (!shop) return response(false, 404, "No shop found for this user");

    const products = await ProductModel.find({
      _id: { $in: ids },
      shop: shop._id,
    }).lean();
    if (!products.length) return response(false, 404, "Products not found");

    if (!["SD", "RSD"].includes(deleteType))
      return response(
        false,
        400,
        "Invalid delete operation. Delete type should be SD or RSD"
      );

    const update =
      deleteType === "SD" ? { deletedAt: new Date() } : { deletedAt: null };
    await ProductModel.updateMany(
      { _id: { $in: ids }, shop: shop._id },
      { $set: update }
    );

    return response(
      true,
      200,
      deleteType === "SD" ? "Products moved to trash" : "Products restored"
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
    const { ids = [], deleteType } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0)
      return response(false, 400, "Invalid or empty id list.");

    if (deleteType !== "PD")
      return response(
        false,
        400,
        "Delete type should be PD for permanent delete"
      );

    // Get the shop for the logged-in user
    const shop = await ShopModel.findOne({ owner: auth.user._id });
    if (!shop) return response(false, 404, "No shop found for this user");

    const products = await ProductModel.find({
      _id: { $in: ids },
      shop: shop._id,
    }).lean();
    if (!products.length) return response(false, 404, "Products not found");

    await ProductModel.deleteMany({ _id: { $in: ids }, shop: shop._id });

    return response(true, 200, "Products deleted permanently");
  } catch (error) {
    return catchError(error);
  }
}
