import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import { zSchema } from "@/lib/zodSchema";
import ProductModel from "@/models/product.model";
import ReviewModel from "@/models/review.model";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");
    const page = parseInt(searchParams.get("page")) || 0;
    const limit = 10;
    const skip = page * limit;

    let matchQuery = {
      deletedAt: null,
      product: new mongoose.Types.ObjectId(productId),
    };

    //aggregation
    const aggregation = [
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        // $unwind: { path: "$userData", preserveNullAndEmptyArray: true },
        $unwind: "$userData",
      },
      {
        $match: matchQuery,
      },
      { $sort: { createdAt: -1 } },
      { $limit: limit + 1 },
      {
        $project: {
          _id: 1,
          reviewedBy: "$userData.name",
          avatar: "$userData.avatar",
          rating: 1,
          title: 1,
          review: 1,
          createdAt: 1,
        },
      },
    ];
    const reviews = await ReviewModel.aggregate(aggregation);
    const totalReview = await ReviewModel.countDocuments(matchQuery);

    // check if more data exist
    let nextPage = null;
    if (reviews.length > limit) {
      nextPage = page + 1;
      reviews.pop();
    }

    return response(true, 200, "Review data", {
      reviews,
      nextPage,
      totalReview,
    });
  } catch (error) {
    return catchError(error);
  }
}
