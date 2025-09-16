import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ProductVariantModel from "@/models/productVariant.model";
import ProductModel from "@/models/product.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();
    const payload = await request.json();
    const ids = payload.ids || [];
    const deleteType = payload.deleteType;

    if (!Array.isArray(ids) || ids.length === 0) {
      return response(false, 400, "Invalid or empty id list.");
    }

    // Fetch variants along with product info
    const variants = await ProductVariantModel.find({
      _id: { $in: ids },
    }).lean();
    if (!variants.length) {
      return response(false, 404, "Data not found");
    }

    // Verify ownership: only variants belonging to admin's shops
    const unauthorized = await Promise.all(
      variants.map(async (v) => {
        const product = await ProductModel.findOne({
          _id: v.product,
          shop: auth.user.shop,
        });
        return !product;
      })
    );

    if (unauthorized.some((u) => u)) {
      return response(
        false,
        403,
        "You do not have permission to modify some variants"
      );
    }

    if (!["SD", "RSD"].includes(deleteType)) {
      return response(
        false,
        400,
        "Invalid delete operation. Delete type should be SD or RSD for this route"
      );
    }

    const updateValue =
      deleteType === "SD"
        ? { deletedAt: new Date().toISOString() }
        : { deletedAt: null };

    await ProductVariantModel.updateMany(
      { _id: { $in: ids } },
      { $set: updateValue }
    );

    return response(
      true,
      200,
      deleteType === "SD" ? "Data moved to trash" : "Data restored."
    );
  } catch (error) {
    return catchError(error);
  }
}

export async function DELETE(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();
    const payload = await request.json();
    const ids = payload.ids || [];
    const deleteType = payload.deleteType;

    if (!Array.isArray(ids) || ids.length === 0) {
      return response(false, 400, "Invalid or empty id list.");
    }

    // Fetch variants and check ownership
    const variants = await ProductVariantModel.find({
      _id: { $in: ids },
    }).lean();
    if (!variants.length) {
      return response(false, 404, "Data not found");
    }

    const unauthorized = await Promise.all(
      variants.map(async (v) => {
        const product = await ProductModel.findOne({
          _id: v.product,
          shop: auth.user.shop,
        });
        return !product;
      })
    );

    if (unauthorized.some((u) => u)) {
      return response(
        false,
        403,
        "You do not have permission to delete some variants"
      );
    }

    if (deleteType !== "PD") {
      return response(
        false,
        400,
        "Invalid delete operation. Use PD for permanent delete."
      );
    }

    await ProductVariantModel.deleteMany({ _id: { $in: ids } });

    return response(true, 200, "Data deleted permanently");
  } catch (error) {
    return catchError(error);
  }
}
