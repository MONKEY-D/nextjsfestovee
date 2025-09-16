import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError } from "@/lib/helperFunctions";
import ProductVariantModel from "@/models/productVariant.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const start = parseInt(searchParams.get("start") || 0, 10);
    const size = parseInt(searchParams.get("size") || 10, 10);
    const filters = JSON.parse(searchParams.get("filters") || "[]");
    const globalFilter = searchParams.get("globalFilter") || "";
    const sorting = JSON.parse(searchParams.get("sorting") || "[]");
    const deleteType = searchParams.get("deleteType");

    // Base match
    let matchQuery = {};
    if (deleteType === "SD") matchQuery.deletedAt = null;
    else if (deleteType === "PD") matchQuery.deletedAt = { $ne: null };

    // Lookup product data
    const aggregatePipeline = [
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productData",
        },
      },
      { $unwind: "$productData" },
      {
        $match: {
          ...matchQuery,
          "productData.shop": auth.user.shop, // ✅ Only variants of this admin's shop
        },
      },
    ];

    // Global search
    if (globalFilter) {
      aggregatePipeline.push({
        $match: {
          $or: [
            { color: { $regex: globalFilter, $options: "i" } },
            { sku: { $regex: globalFilter, $options: "i" } },
            { "productData.name": { $regex: globalFilter, $options: "i" } },
            { mrp: { $regex: globalFilter, $options: "i" } },
            { sellingPrice: { $regex: globalFilter, $options: "i" } },
            { discountPercentage: { $regex: globalFilter, $options: "i" } },
          ],
        },
      });
    }

    // Column filters
    (filters || []).forEach((filter) => {
      if (["mrp", "sellingPrice", "discountPercentage"].includes(filter.id)) {
        matchQuery[filter.id] = Number(filter.value);
      } else if (filter.id === "product") {
        matchQuery["productData.name"] = {
          $regex: filter.value,
          $options: "i",
        };
      } else {
        matchQuery[filter.id] = { $regex: filter.value, $options: "i" };
      }
    });

    // Sorting
    let sortQuery = {};
    sorting.forEach((sort) => {
      sortQuery[sort.id] = sort.desc ? -1 : 1;
    });

    // Skip & Limit
    aggregatePipeline.push(
      { $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } },
      { $skip: start },
      { $limit: size },
      {
        $project: {
          _id: 1,
          product: "$productData.name",
          color: 1,
          size: 1,
          sku: 1,
          mrp: 1,
          sellingPrice: 1,
          discountPercentage: 1,
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        },
      }
    );

    const getProduct = await ProductVariantModel.aggregate(aggregatePipeline);

    // Count total
    const totalRowCount = await ProductVariantModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productData",
        },
      },
      { $unwind: "$productData" },
      { $match: { "productData.shop": auth.user.shop, ...matchQuery } },
      { $count: "count" },
    ]);

    return NextResponse.json({
      success: true,
      data: getProduct,
      meta: { totalRowCount: totalRowCount[0]?.count || 0 },
    });
  } catch (error) {
    return catchError(error);
  }
}
