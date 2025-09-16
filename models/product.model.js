import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
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
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      default: 0,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    media: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ shop: 1, slug: 1 }, { unique: true });

const ProductModel =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema, "products");
export default ProductModel;
