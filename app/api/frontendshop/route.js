import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import CategoryModel from "@/models/category.model";
import ProductModel from "@/models/product.model";

export async function GET(request) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;

    // get filters from query params
    const size = searchParams.get("size");
    const color = searchParams.get("color");
    const minPrice = parseInt(searchParams.get("minPrice")) || 0;
    const maxPrice = parseInt(searchParams.get("maxPrice")) || 0;
    const categorySlug = searchParams.get("category");
    const search = searchParams.get("q");

    //pagination
    const limit = parseInt(searchParams.get("limit")) || 9;
    const page = parseInt(searchParams.get("page")) || 0;
    const skip = page * limit;

    //sorting
    const sortOption = searchParams.get("sort") || "default_sorting";
    let sortquery = {};
    if (sortOption === "default_sorting") sortquery = { createdAt: -1 };
    if (sortOption === "asc") sortquery = { name: 1 };
    if (sortOption === "desc") sortquery = { name: -1 };
    if (sortOption === "price_low_high") sortquery = { sellingPrice: 1 };
    if (sortOption === "price_high_low") sortquery = { sellingPrice: -1 };

    //find category by slug
    let categoryIds = [];
    if (categorySlug) {
      const categorySlugs = categorySlug.split(",");
      const categories = await CategoryModel.find({
        deletedAt: null,
        slug: { $in: categorySlugs },
      })
        .select("_id")
        .lean();
      categoryIds = categories.map((cat) => cat._id);
    }

    let matchStage = {};
    if (categoryIds.length > 0) {
      matchStage.category = { $in: categoryIds };
    }

    if (search) {
      matchStage.name = { $regex: search, $options: "i" };
    }

    //aggregation Pipeline
    const products = await ProductModel.aggregate([
      { $match: matchStage },
      { $sort: sortquery },
      { $skip: skip },
      { $limit: limit + 1 },
      {
        $lookup: {
          from: "productvariants",
          localField: "_id",
          foreignField: "product",
          as: "variants",
        },
      },
      {
        $addFields: {
          variants: {
            $filter: {
              input: "$variants",
              as: "variant",
              cond: {
                $and: [
                  size
                    ? { $in: ["$$variant.size", size.split(",")] }
                    : { $literal: true },
                  color
                    ? { $eq: ["$$variant.color", color] }
                    : { $literal: true },
                  { $gte: ["$$variant.sellingPrice", minPrice] },
                  { $lte: ["$$variant.sellingPrice", maxPrice] },
                ],
              },
            },
          },
        },
      },
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
          variants: {
            color: 1,
            size: 1,
            mrp: 1,
            sellingPrice: 1,
            discountPercentage: 1,
          },
        },
      },
    ]);

    //check if more data exist
    let nextPage = null;
    if (products.length > limit) {
      (nextPage = page + 1), products.pop(); //remove extra item
    }

    return response(true, 200, "Products found", { products, nextPage });
  } catch (error) {
    return catchError(error);
  }
}

// import { connectDB } from "@/lib/databaseConnection";
// import { catchError, response } from "@/lib/helperFunctions";
// import CategoryModel from "@/models/category.model";
// import ProductModel from "@/models/product.model";

// export async function GET(request) {
//   try {
//     await connectDB();

//     const searchParams = request.nextUrl.searchParams;

//     const sizeFilter = searchParams.get("size")
//       ? searchParams.get("size").split(",")
//       : [];
//     const colorFilter = searchParams.get("color")
//       ? searchParams.get("color").split(",")
//       : [];

//     const minPrice = parseInt(searchParams.get("minPrice")) || 0;
//     const maxPrice =
//       parseInt(searchParams.get("maxPrice")) || Number.MAX_SAFE_INTEGER;

//     const categorySlugs = searchParams.get("category")
//       ? searchParams.get("category").split(",")
//       : [];

//     const search = searchParams.get("q");

//     const limit = parseInt(searchParams.get("limit")) || 9;
//     const page = parseInt(searchParams.get("page")) || 0;
//     const skip = page * limit;

//     const sortOption = searchParams.get("sort") || "default_sorting";
//     let sortquery = {};
//     if (sortOption === "default_sorting") sortquery = { createdAt: -1 };
//     if (sortOption === "asc") sortquery = { name: 1 };
//     if (sortOption === "desc") sortquery = { name: -1 };
//     if (sortOption === "price_low_high") sortquery = { sellingPrice: 1 }; // careful: only works if product has base sellingPrice
//     if (sortOption === "price_high_low") sortquery = { sellingPrice: -1 };

//     let categoryIds = [];
//     if (categorySlugs.length > 0) {
//       const categories = await CategoryModel.find({
//         deletedAt: null,
//         slug: { $in: categorySlugs },
//       })
//         .select("_id")
//         .lean();
//       categoryIds = categories.map((c) => c._id);
//     }

//     let matchStage = {};
//     if (categoryIds.length > 0) matchStage.category = { $in: categoryIds };
//     if (search) {
//       matchStage.name = { $regex: search, $options: "i" };
//     }

//     const products = await ProductModel.aggregate([
//       { $match: matchStage },
//       { $sort: sortquery },
//       { $skip: skip },
//       { $limit: limit + 1 }, // fetch one extra to check nextPage
//       {
//         $lookup: {
//           from: "productvariants",
//           localField: "_id",
//           foreignField: "product",
//           as: "variants",
//         },
//       },
//       {
//         $addFields: {
//           variants: {
//             $filter: {
//               input: "$variants",
//               as: "variant",
//               cond: {
//                 $and: [
//                   sizeFilter.length > 0
//                     ? { $in: ["$$variant.size", sizeFilter] }
//                     : { $literal: true },
//                   colorFilter.length > 0
//                     ? { $in: ["$$variant.color", colorFilter] }
//                     : { $literal: true },
//                   { $gte: ["$$variant.sellingPrice", minPrice] },
//                   { $lte: ["$$variant.sellingPrice", maxPrice] },
//                 ],
//               },
//             },
//           },
//         },
//       },
//       {
//         $lookup: {
//           from: "medias",
//           localField: "media",
//           foreignField: "_id",
//           as: "media",
//           pipeline: [
//             { $project: { _id: 1, secure_url: 1, alt: 1 } }, // ✅ Correct way
//           ],
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           name: 1,
//           slug: 1,
//           mrp: 1,
//           sellingPrice: 1,
//           discountPercentage: 1,
//           media: 1,
//           variants: {
//             $map: {
//               input: "$variants",
//               as: "v",
//               in: {
//                 color: "$$v.color",
//                 size: "$$v.size",
//                 mrp: "$$v.mrp",
//                 sellingPrice: "$$v.sellingPrice",
//                 discountPercentage: "$$v.discountPercentage",
//               },
//             },
//           },
//         },
//       },
//     ]);

//     let nextPage = null;
//     if (products.length > limit) {
//       nextPage = page + 1;
//       products.pop(); // remove extra
//     }

//     return response(true, 200, "Products found", { products, nextPage });
//   } catch (error) {
//     return catchError(error);
//   }
// }
