import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ShopModel from "@/models/shop.model";
import { encode } from "entities";
import { shopCreateSchema } from "@/lib/zodSchema";

export async function POST(request) {
  try {
    const auth = await isAuthenticated();
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();

    const payload = await request.json();

    const schema = shopCreateSchema.pick({
      name: true,
      description: true,
      visible: true,
      phone: true,
      gstId: true,
      media: true,
    });

    const validate = schema.safeParse(payload);
    if (!validate.success) {
      const errors = validate.error.format();
      return response(false, 400, "Invalid or missing fields", errors);
    }

    const shopData = validate.data;

    console.log(shopData);
    const newShop = new ShopModel({
      owner: auth.user._id,
      name: shopData.name,
      description: encode(shopData.description),
      visible: shopData.visible,
      phone: shopData.phone,
      gstId: shopData.gstId,
      media: shopData.media,
    });
    console.log(newShop);

    await newShop.save();

    return response(true, 200, "Shop created successfully!!", newShop);
  } catch (error) {
    return catchError(error);
  }
}
