import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    minShoppingAmount: {
      type: Number,
      required: true,
    },
    validity: {
      type: Date,
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

couponSchema.index({ shop: 1, code: 1 }, { unique: true });

const CouponModel =
  mongoose.models.Coupon || mongoose.model("Coupon", couponSchema, "coupons");

export default CouponModel;
