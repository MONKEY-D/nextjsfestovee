import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import { zSchema } from "@/lib/zodSchema";
import ProductModel from "@/models/product.model";
import ShopModel from "@/models/shop.model";
import { encode } from "entities";

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
      type: true,
      moq: true,
      stock: true,
    });

    const validate = schema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields", validate.error);
    }

    const productData = validate.data;

    const shop = await ShopModel.findOne({ owner: auth.user._id });
    if (!shop) {
      return response(false, 400, "No shop found for this user");
    }

    const newProduct = new ProductModel({
      name: productData.name,
      slug: productData.slug,
      category: productData.category,
      mrp: productData.mrp,
      sellingPrice: productData.sellingPrice,
      discountPercentage: productData.discountPercentage,
      description: encode(productData.description),
      media: productData.media,
      shop: shop._id,
      type: productData.type,
      moq: productData.moq,
      stock: productData.stock,
    });

    await newProduct.save();

    return response(true, 200, "Product added successfully!!");
  } catch (error) {
    return catchError(error);
  }
}
