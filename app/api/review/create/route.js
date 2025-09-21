import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import { zSchema } from "@/lib/zodSchema";
import ProductModel from "@/models/product.model";
import ReviewModel from "@/models/review.model";

export async function POST(request) {
  try {
    const auth = await isAuthenticated();
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();

    const body = await request.json();
    const schema = zSchema.pick({
      product: true,
      userId: true,
      rating: true,
      title: true,
      review: true,
    });

    const validate = schema.safeParse(body);
    if (!validate.success) {
      return response(false, 400, "Invalid or missing fields.", validate.error);
    }

    const { product, userId, rating, title, review } = validate.data;

    const productDoc = await ProductModel.findById(product).select("shop");
    if (!productDoc) {
      return response(false, 404, "Product not found");
    }

    const newReview = new ReviewModel({
      shop: productDoc.shop,
      product,
      user: userId,
      rating,
      title,
      review,
    });

    await newReview.save();

    return response(true, 200, "Review added successfully!!", newReview);
  } catch (error) {
    return catchError(error);
  }
}
