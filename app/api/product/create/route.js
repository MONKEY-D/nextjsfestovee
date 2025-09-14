import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import { zSchema } from "@/lib/zodSchema";
import ProductModel from "@/models/product.model";

export async function POST(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();
    const payload = await request.json();

    const schema = zSchema.pick({
      name: true,
      slug: true,
      mrp: true,
      category: true,
      sellingPrice: true,
      discountPercentage: true,
      description: true,
      media: true,
    });

    const validate = schema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields", validate.error);
    }

    const newProduct = new ProductModel({
      name: payload.name,
      slug: payload.slug,
      category: payload.category,
      mrp: payload.mrp,
      sellingPrice: payload.sellingPrice,
      discountPercentage: payload.discountPercentage,
      description: payload.description,
      media: payload.media,
    });

    await newProduct.save();

    return response(true, 200, "Product added successfully!!");
  } catch (error) {
    return catchError(error);
  }
}
