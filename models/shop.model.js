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
      unique: true,
    },

    image: {
      url: { type: String, trim: true },
      public_id: { type: String, trim: true },
    },

    description: { type: String, trim: true },

    isVisible: {
      type: Boolean,
      default: true,
    },

    phone: { type: String, trim: true },
    whatsapp: { type: String, trim: true }, // Added for page.jsx
    email: { type: String, trim: true },
    address: { type: String, trim: true },
    website: { type: String, trim: true },

    gstVatId: { type: String, trim: true },
    taxJurisdiction: { type: String, trim: true },
    timeZone: { type: String, trim: true },

    openingHours: [
      {
        day: { type: String, trim: true }, // e.g. "Monday"
        open: { type: String, trim: true }, // "09:00"
        close: { type: String, trim: true }, // "18:00"
        isClosed: { type: Boolean, default: false },
      },
    ],

    badges: [{ type: String, trim: true }],

    social: {
      facebook: { type: String, trim: true },
      instagram: { type: String, trim: true },
      twitter: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      youtube: { type: String, trim: true },
      tiktok: { type: String, trim: true },
    },

    deliveryZones: [
      {
        name: { type: String, trim: true }, // e.g. Local City, Statewide
        description: { type: String, trim: true },
        price: { type: Number, default: 0 },
      },
    ],

    paymentMethods: {
      bankTransfer: { type: Boolean, default: false },
      netTerms: { type: Boolean, default: false },
      cardPayments: { type: Boolean, default: false },
    },

    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

mongoose.models = {};

const ShopModel =
  mongoose.models.Shop || mongoose.model("Shop", shopSchema, "shops");

export default ShopModel;
