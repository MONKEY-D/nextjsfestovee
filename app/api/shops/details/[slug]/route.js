import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";

export async function GET(request, context) {
  try {
    await connectDB();

    return response(true, 200, "Shop details found", { shop, products });
  } catch (error) {
    return catchError(error);
  }
}
