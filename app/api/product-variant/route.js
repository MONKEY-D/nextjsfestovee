import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError } from "@/lib/helperFunctions";
import ProductVariantModel from "@/models/productVariant.model";
import ProductModel from "@/models/product.model";
import ShopModel from "@/models/shop.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // 1️⃣ Authenticate admin
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    await connectDB();

    // 2️⃣ Fetch admin's shop
    const shop = await ShopModel.findOne({
      owner: new mongoose.Types.ObjectId(auth.user._id),
    });
    if (!shop) {
      return NextResponse.json(
        { success: false, message: "No shop found for this user" },
        { status: 404 }
      );
    }
    const shopId = shop._id;

    // 3️⃣ Parse query params
    const searchParams = request.nextUrl.searchParams;
    const start = parseInt(searchParams.get("start") || 0, 10);
    const size = parseInt(searchParams.get("size") || 10, 10);
    const filters = JSON.parse(searchParams.get("filters") || "[]");
    const globalFilter = searchParams.get("globalFilter") || "";
    const sorting = JSON.parse(searchParams.get("sorting") || "[]");
    const deleteType = searchParams.get("deleteType");

    // 4️⃣ Base match
    const matchQuery = {};
    if (deleteType === "SD") matchQuery.deletedAt = null;
    else if (deleteType === "PD") matchQuery.deletedAt = { $ne: null };

    // 5️⃣ Aggregate pipeline
    const pipeline = [
      // Join product info
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productData",
        },
      },
      { $unwind: "$productData" },
      { $match: { ...matchQuery, "productData.shop": shopId } },

      // Populate media
      {
        $lookup: {
          from: "media",
          localField: "media",
          foreignField: "_id",
          as: "mediaData",
        },
      },
    ];

    // 6️⃣ Global search
    if (globalFilter) {
      const numberValue = Number(globalFilter);
      const numberSearch = isNaN(numberValue) ? null : numberValue;

      pipeline.push({
        $match: {
          $or: [
            { color: { $regex: globalFilter, $options: "i" } },
            { sku: { $regex: globalFilter, $options: "i" } },
            { "productData.name": { $regex: globalFilter, $options: "i" } },
            ...(numberSearch !== null
              ? [
                  { mrp: numberSearch },
                  { sellingPrice: numberSearch },
                  { discountPercentage: numberSearch },
                ]
              : []),
          ],
        },
      });
    }

    // 7️⃣ Column filters
    filters.forEach((filter) => {
      if (["mrp", "sellingPrice", "discountPercentage"].includes(filter.id)) {
        const value = Number(filter.value);
        if (!isNaN(value)) pipeline.push({ $match: { [filter.id]: value } });
      } else if (filter.id === "product") {
        pipeline.push({
          $match: {
            "productData.name": { $regex: filter.value, $options: "i" },
          },
        });
      } else {
        pipeline.push({
          $match: { [filter.id]: { $regex: filter.value, $options: "i" } },
        });
      }
    });

    // 8️⃣ Sorting
    const sortQuery = {};
    sorting.forEach((sort) => (sortQuery[sort.id] = sort.desc ? -1 : 1));
    pipeline.push({
      $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 },
    });

    // 9️⃣ Pagination
    pipeline.push({ $skip: start }, { $limit: size });

    // 10️⃣ Project final fields
    pipeline.push({
      $project: {
        _id: 1,
        product: "$productData.name",
        color: 1,
        size: 1,
        sku: 1,
        mrp: 1,
        sellingPrice: 1,
        discountPercentage: 1,
        media: "$mediaData",
        createdAt: 1,
        updatedAt: 1,
        deletedAt: 1,
      },
    });

    // 11️⃣ Fetch variants
    const variants = await ProductVariantModel.aggregate(pipeline);

    // 12️⃣ Total count
    const countPipeline = [
      { $match: matchQuery },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productData",
        },
      },
      { $unwind: "$productData" },
      { $match: { "productData.shop": shopId } },
      { $count: "count" },
    ];
    const totalRowCount = await ProductVariantModel.aggregate(countPipeline);

    return NextResponse.json({
      success: true,
      data: variants,
      meta: { totalRowCount: totalRowCount[0]?.count || 0 },
    });
  } catch (error) {
    return catchError(error);
  }
}
