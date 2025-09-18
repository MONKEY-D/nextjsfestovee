import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ProductVariantModel from "@/models/productVariant.model";

export async function GET() {
  try {
    await connectDB();

    const getColor = await ProductVariantModel.distinct("color");

    if (!getColor) {
      return response(false, 404, "Color not found or you do not have access");
    }

    return response(true, 200, "Color found", getColor);
  } catch (error) {
    return catchError(error);
  }
}
