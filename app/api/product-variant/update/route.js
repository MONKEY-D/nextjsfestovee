import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import { zSchema } from "@/lib/zodSchema";
import ProductModel from "@/models/product.model";
import ProductVariantModel from "@/models/productVariant.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();
    const payload = await request.json();

    const schema = zSchema.pick({
      _id: true,
      product: true,
      sku: true,
      color: true,
      size: true,
      mrp: true,
      sellingPrice: true,
      discountPercentage: true,
      media: true,
    });

    const validate = schema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields", validate.error);
    }

    const validatedData = validate.data;

    // 1️⃣ Find the variant
    const variant = await ProductVariantModel.findOne({
      _id: validatedData._id,
      deletedAt: null,
    });
    if (!variant) {
      return response(false, 404, "Product variant not found");
    }

    // 2️⃣ Check if the variant's product belongs to the admin's shop
    const product = await ProductModel.findOne({
      _id: validatedData.product,
      shop: auth.user.shop,
    });
    if (!product) {
      return response(
        false,
        403,
        "You do not have access to this product variant"
      );
    }

    // 3️⃣ Update variant
    variant.product = validatedData.product;
    variant.color = validatedData.color;
    variant.size = validatedData.size;
    variant.sku = validatedData.sku;
    variant.mrp = validatedData.mrp;
    variant.sellingPrice = validatedData.sellingPrice;
    variant.discountPercentage = validatedData.discountPercentage;
    variant.media = validatedData.media;

    await variant.save();

    return response(true, 200, "Product variant updated successfully!!");
  } catch (error) {
    return catchError(error);
  }
}
