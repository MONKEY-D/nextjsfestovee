import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import CategoryModel from "@/models/category.model";
import ProductModel from "@/models/product.model";

export async function GET(request) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;

    // Filters
    const minPrice = parseInt(searchParams.get("minPrice")) || 0;
    const maxPrice = parseInt(searchParams.get("maxPrice")) || 100000;
    const categorySlug = searchParams.get("category");
    const search = searchParams.get("q");

    // Pagination
    const limit = parseInt(searchParams.get("limit")) || 9;
    const page = parseInt(searchParams.get("page")) || 0;
    const skip = page * limit;

    // Sorting
    const sortOption = searchParams.get("sort") || "default_sorting";
    let sortQuery = {};
    if (sortOption === "default_sorting") sortQuery = { createdAt: -1 };
    if (sortOption === "asc") sortQuery = { name: 1 };
    if (sortOption === "desc") sortQuery = { name: -1 };
    if (sortOption === "price_low_high") sortQuery = { sellingPrice: 1 };
    if (sortOption === "price_high_low") sortQuery = { sellingPrice: -1 };

    // Find category by slug
    let categoryId = [];
    if (categorySlug) {
      const slugs = categorySlug.split(",");
      const categoryData = await CategoryModel.find({
        deletedAt: null,
        slug: { $in: slugs },
      })
        .select("_id")
        .lean();
      categoryId = categoryData.map((cat) => cat._id);
    }

    // Build match stage
    let matchStage = {
      sellingPrice: { $gte: minPrice, $lte: maxPrice },
    };
    if (categoryId.length > 0) matchStage.category = { $in: categoryId };
    if (search) matchStage.name = { $regex: search, $options: "i" };

    // Fetch products
    const products = await ProductModel.aggregate([
      { $match: matchStage },
      { $sort: sortQuery },
      { $skip: skip },
      { $limit: limit + 1 }, // fetch one extra to check next page
      {
        $lookup: {
          from: "medias",
          localField: "media",
          foreignField: "_id",
          as: "media",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          mrp: 1,
          sellingPrice: 1,
          discountPercentage: 1,
          media: {
            _id: 1,
            secure_url: 1,
            alt: 1,
          },
        },
      },
    ]);

    // Check next page
    let nextPage = null;
    if (products.length > limit) {
      nextPage = page + 1;
      products.pop(); // remove extra item
    }

    return response(true, 200, "Products found", { products, nextPage });
  } catch (error) {
    return catchError(error);
  }
}
