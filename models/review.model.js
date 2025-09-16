import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    review: {
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

reviewSchema.index({ shop: 1 });
reviewSchema.index({ product: 1 });
reviewSchema.index({ user: 1 });

const ReviewModel =
  mongoose.models.Review || mongoose.model("Review", reviewSchema, "reviews");
export default ReviewModel;
