// import { connectDB } from "@/lib/databaseConnection";
// import { catchError, response } from "@/lib/helperFunctions";
// import ProductModel from "@/models/product.model";
// import ProductVariantModel from "@/models/productVariant.model";
// import ReviewModel from "@/models/review.model";

// export async function GET(request, { params }) {
//   try {
//     await connectDB();

//     const { slug } = params;
//     const searchParams = request.nextUrl.searchParams;
//     const size = searchParams.get("size");
//     const color = searchParams.get("color");

//     if (!slug) {
//       return response(false, 404, "Product not found.");
//     }

//     // base product
//     const getProduct = await ProductModel.findOne({
//       slug,
//       deletedAt: null,
//     })
//       .populate("media", "secure_url")
//       .lean();

//     if (!getProduct) {
//       return response(false, 404, "Product not found");
//     }

//     // find variant if color/size provided
//     const variantFilter = { product: getProduct._id };
//     if (size && size !== "NA") variantFilter.size = size;
//     if (color && color !== "NA") variantFilter.color = color;

//     let variant = null;
//     if (size || color) {
//       variant = await ProductVariantModel.findOne(variantFilter)
//         .populate("media", "secure_url")
//         .lean();
//     }

//     // fallback → if no variant found but product type = "variant", get first one
//     if (!variant && getProduct.type === "variant") {
//       variant = await ProductVariantModel.findOne({ product: getProduct._id })
//         .populate("media", "secure_url")
//         .lean();
//     }

//     // collect available colors & sizes
//     const colors = await ProductVariantModel.distinct("color", {
//       product: getProduct._id,
//     });

//     const sizesAgg = await ProductVariantModel.aggregate([
//       { $match: { product: getProduct._id } },
//       { $sort: { _id: 1 } },
//       {
//         $group: {
//           _id: "$size",
//           first: { $first: "$_id" },
//         },
//       },
//       { $sort: { first: 1 } },
//       { $project: { _id: 0, size: "$_id" } },
//     ]);
//     const sizes = sizesAgg.length ? sizesAgg.map((s) => s.size) : [];

//     // review count
//     const reviewCount = await ReviewModel.countDocuments({
//       product: getProduct._id,
//     });

//     const productData = {
//       product: getProduct,
//       variant,
//       colors,
//       sizes,
//       reviewCount,
//     };

//     return response(true, 200, "Product Data found.", { data: productData });
//   } catch (error) {
//     return catchError(error);
//   }
// }

import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunctions";
import ProductModel from "@/models/product.model";
import ProductVariantModel from "@/models/productVariant.model";
import ReviewModel from "@/models/review.model";
import "../../../../../models/media.model";

export async function GET(request, context) {
  try {
    await connectDB();

    const slug = context?.params?.slug; // ✅ optional chaining
    if (!slug) return response(false, 404, "Product not found");

    const searchParams = new URL(request.url).searchParams;
    const size = searchParams.get("size") || null;
    const color = searchParams.get("color") || null;

    // Base product
    const getProduct = await ProductModel.findOne({ slug, deletedAt: null })
      .populate("media", "_id secure_url alt")
      .lean();
    if (!getProduct) return response(false, 404, "Product not found");

    // Find variant
    let variant = null;
    if (size || color) {
      const filter = { product: getProduct._id };
      if (size && size !== "NA") filter.size = size;
      if (color && color !== "NA") filter.color = color;
      variant = await ProductVariantModel.findOne(filter)
        .populate("media", "_id secure_url alt")
        .lean();
    }

    // Fallback variant if type=variant
    if (!variant && getProduct.type === "variant") {
      variant = await ProductVariantModel.findOne({ product: getProduct._id })
        .populate("media", "_id secure_url alt")
        .lean();
    }

    const colors = await ProductVariantModel.distinct("color", {
      product: getProduct._id,
    });

    const sizesAgg = await ProductVariantModel.aggregate([
      { $match: { product: getProduct._id } },
      { $sort: { _id: 1 } },
      { $group: { _id: "$size", first: { $first: "$_id" } } },
      { $sort: { first: 1 } },
      { $project: { _id: 0, size: "$_id" } },
    ]);
    const sizes = sizesAgg.length ? sizesAgg.map((s) => s.size) : [];

    const reviewCount = await ReviewModel.countDocuments({
      product: getProduct._id,
    });

    return response(true, 200, "Product data found", {
      data: { product: getProduct, variant, colors, sizes, reviewCount },
    });
  } catch (error) {
    return catchError(error);
  }
}
