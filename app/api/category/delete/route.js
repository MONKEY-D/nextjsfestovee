import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import CategoryModel from "@/models/category.model";

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

    // Only select categories owned by this user
    const categories = await CategoryModel.find({
      _id: { $in: ids },
      owner: auth.user._id,
    }).lean();
    if (!categories.length) {
      return response(false, 404, "No categories found for this user");
    }

    if (!["SD", "RSD"].includes(deleteType)) {
      return response(
        false,
        400,
        "Invalid delete operation. Delete type should be SD or RSD for this route"
      );
    }

    const updateValue =
      deleteType === "SD" ? { deletedAt: new Date() } : { deletedAt: null };
    await CategoryModel.updateMany(
      { _id: { $in: ids }, owner: auth.user._id },
      { $set: updateValue }
    );

    return response(
      true,
      200,
      deleteType === "SD"
        ? "Category(s) moved to trash"
        : "Category(s) restored"
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

    const categories = await CategoryModel.find({
      _id: { $in: ids },
      owner: auth.user._id,
    }).lean();
    if (!categories.length) {
      return response(false, 404, "No categories found for this user");
    }

    if (deleteType !== "PD") {
      return response(
        false,
        400,
        "Invalid delete operation. Use PD for permanent delete."
      );
    }

    await CategoryModel.deleteMany({ _id: { $in: ids }, owner: auth.user._id });

    return response(true, 200, "Category(s) deleted permanently");
  } catch (error) {
    return catchError(error);
  }
}
