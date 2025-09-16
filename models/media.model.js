import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    asset_id: {
      type: String,
      required: true,
      trim: true,
    },
    public_id: {
      type: String,
      required: true,
      trim: true,
      index: true, // ✅ fast lookup when deleting
    },
    secure_url: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail_url: {
      type: String,
      trim: true, // ✅ make optional
    },
    alt: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
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

const MediaModel =
  mongoose.models.Media || mongoose.model("Media", mediaSchema, "medias");

export default MediaModel;
