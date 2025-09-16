import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
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

categorySchema.index({ shop: 1, slug: 1 }, { unique: true });

const CategoryModel =
  mongoose.models.Category ||
  mongoose.model("Category", categorySchema, "categories");
export default CategoryModel;
