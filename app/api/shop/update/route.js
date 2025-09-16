import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import { z } from "zod";
import ShopModel from "@/models/shop.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated();
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();
    const payload = await request.json();

    // Define schema strictly according to ShopModel
    const schema = z.object({
      _id: z.string().min(1, "Shop ID is required"),
      name: z.string().min(1, "Name is required"),
      description: z.string().optional(),
      phone: z.string().optional(),
      gstId: z.string().optional(),
      visible: z.boolean().optional(),
      media: z
        .array(
          z.object({
            url: z.string().optional(),
            public_id: z.string().optional(),
          })
        )
        .optional(),
    });

    const validate = schema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields", validate.error);
    }

    const validatedData = validate.data;

    const shop = await ShopModel.findOne({
      _id: validatedData._id,
      deletedAt: null,
    });

    if (!shop) {
      return response(false, 404, "Shop not found");
    }

    // Update strictly by model fields
    shop.name = validatedData.name;
    shop.description = validatedData.description || "";
    shop.phone = validatedData.phone || "";
    shop.gstId = validatedData.gstId || "";
    shop.visible =
      typeof validatedData.visible === "boolean"
        ? validatedData.visible
        : shop.visible;
    shop.media = validatedData.media || [];

    await shop.save();

    return response(true, 200, "Shop updated successfully!", shop);
  } catch (error) {
    return catchError(error);
  }
}
