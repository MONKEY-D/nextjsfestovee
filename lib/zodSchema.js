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
});
