import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import { zSchema } from "@/lib/zodSchema";
import CategoryModel from "@/models/category.model";
import ShopModel from "@/models/shop.model";

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
    });

    const validate = schema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields", validate.error);
    }

    const { name, slug } = validate.data;

    const shop = await ShopModel.findOne({ owner: auth.user._id });
    if (!shop) {
      return response(false, 400, "No shop found for this user");
    }

    const newCategory = new CategoryModel({
      shop: shop._id,
      name,
      slug,
    });

    await newCategory.save();

    return response(true, 200, "Category added successfully!!", newCategory);
  } catch (error) {
    return catchError(error);
  }
}
