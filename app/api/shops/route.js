import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";

export async function GET() {
  try {
    await connectDB();

    return response(true, 200, "Shops found", { shops });
  } catch (error) {
    return catchError(error);
  }
}
