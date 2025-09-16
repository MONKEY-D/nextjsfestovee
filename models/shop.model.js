import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
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

    media: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        required: true,
      },
    ],

    description: { type: String, trim: true },

    visible: {
      type: Boolean,
      default: true,
    },

    phone: { type: String, trim: true },
    gstId: { type: String, trim: true },

    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

shopSchema.index({ owner: 1, name: 1 }, { unique: true });

const ShopModel =
  mongoose.models.Shop || mongoose.model("Shop", shopSchema, "shops");

export default ShopModel;
