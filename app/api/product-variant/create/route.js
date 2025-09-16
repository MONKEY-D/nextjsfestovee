import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import { zSchema } from "@/lib/zodSchema";
import ProductVariantModel from "@/models/productVariant.model";
import ProductModel from "@/models/product.model";
import ShopModel from "@/models/shop.model";

export async function POST(request) {
  try {
    // 1️⃣ Authenticate admin
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();

    // 2️⃣ Validate request body
    const payload = await request.json();
    const schema = zSchema.pick({
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

    const variantData = validate.data;

    // 3️⃣ Ensure the product exists
    const product = await ProductModel.findById(variantData.product).lean();
    if (!product) {
      return response(false, 404, "Product not found");
    }

    // 4️⃣ Check if the product belongs to one of the admin's shops
    const shop = await ShopModel.findOne({
      _id: product.shop,
      owner: auth.user._id,
    });
    if (!shop) {
      return response(
        false,
        403,
        "You do not have permission to add variants to this product"
      );
    }

    // 5️⃣ Create the product variant
    const newProductVariant = new ProductVariantModel({
      product: variantData.product,
      color: variantData.color,
      size: variantData.size,
      sku: variantData.sku,
      mrp: variantData.mrp,
      sellingPrice: variantData.sellingPrice,
      discountPercentage: variantData.discountPercentage,
      media: variantData.media,
    });

    await newProductVariant.save();

    return response(
      true,
      200,
      "Product variant added successfully!!",
      newProductVariant
    );
  } catch (error) {
    return catchError(error);
  }
}
