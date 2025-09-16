import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

// ✅ Ensure uniqueness per shop
categorySchema.index({ shop: 1, slug: 1 }, { unique: true });

const CategoryModel =
  mongoose.models.Category ||
  mongoose.model("Category", categorySchema, "categories");

export default CategoryModel;
