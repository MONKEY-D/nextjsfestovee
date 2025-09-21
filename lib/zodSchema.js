import mongoose from "mongoose";
import { z } from "zod";

export const zSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(64, "Password must be less than 64 characters"),

  name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters"),

  otp: z.string().regex(/^\d{6}$/, {
    message: "OTP must be a 6 digit number",
  }),
  _id: z.string().min(3, "_id is required"),
  alt: z.string().min(3, "Alt is required"),
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required"),

  category: z.string().min(3, "Category is required"),
  mrp: z.union([
    z.number().positive("Expected positive value, recieved negative"),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "Please enter a valid number"),
  ]),
  sellingPrice: z.union([
    z.number().positive("Expected positive value, recieved negative"),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "Please enter a valid number"),
  ]),
  discountPercentage: z.union([
    z.number().positive("Expected positive value, recieved negative"),
    z
      .string()
      .transform((val) => Number(val))
      .refine(
        (val) => !isNaN(val) && val >= 0 && val <= 100,
        "Please enter a valid percentage"
      ),
  ]),

  description: z.string().min(3, "Description is required"),
  media: z.array(z.string()),

  product: z.string().min(1, "Product name is required"),
  sku: z
    .string()
    .min(1, "SKU is required")
    .max(50, "SKU must be under 50 chars"),
  color: z.string().optional(),
  size: z.string().optional(),

  code: z
    .string()
    .min(3, "Coupon code must be at least 3 characters")
    .max(20, "Coupon code must not exceed 20 characters")
    .toUpperCase(),

  minShoppingAmount: z.union([
    z.number().nonnegative("Minimum shopping amount cannot be negative"),
    z
      .string()
      .transform((val) => Number(val))
      .refine(
        (val) => !isNaN(val) && val >= 0,
        "Minimum shopping amount must be a valid number"
      ),
  ]),

  validity: z.coerce.date(),
  shopId: z
    .string()
    .min(1, "Shop ID is required")
    .refine((val) => mongoose.Types.ObjectId.isValid(val), "Invalid Shop ID"),

  moq: z.union([
    z.number().positive("Expected positive value, recieved negative"),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "Please enter a valid number"),
  ]),

  stock: z.union([
    z.number().positive("Expected positive value, recieved negative"),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "Please enter a valid number"),
  ]),

  userId: z.string().min(3, "User Id is missing"),
  rating: z.union([
    z.number().positive("Minimum shopping amount cannot be negative"),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "Enter a valid number"),
  ]),
  review: z.string().min(3, "Review is required."),
});

export const shopCreateSchema = z.object({
  name: z.string().min(2, "Shop name must be at least 2 characters"),
  description: z.string().min(3, "Description is required"),
  media: z.array(z.string().min(1)).min(1, "Please select at least one media"),
  visible: z.boolean().optional(),
  phone: z.string().optional().nullable(),
  gstId: z.string().optional().nullable(),
});
