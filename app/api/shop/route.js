import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError } from "@/lib/helperFunctions";
import ShopModel from "@/models/shop.model";
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

    const start = parseInt(searchParams.get("start") || "0", 10);
    const size = parseInt(searchParams.get("size") || "10", 10);
    const filters = JSON.parse(searchParams.get("filters") || "[]");
    const globalFilter = searchParams.get("globalFilter") || "";
    const sorting = JSON.parse(searchParams.get("sorting") || "[]");
    const deleteType = searchParams.get("deleteType");

    // Base query for soft/pending delete
    let matchQuery = {};
    if (deleteType === "SD") {
      matchQuery.deletedAt = null;
    } else if (deleteType === "PD") {
      matchQuery.deletedAt = { $ne: null };
    }

    // Global search (only on schema fields)
    if (globalFilter) {
      matchQuery["$or"] = [
        { name: { $regex: globalFilter, $options: "i" } },
        { phone: { $regex: globalFilter, $options: "i" } },
        { gstId: { $regex: globalFilter, $options: "i" } },
      ];
    }

    // Column filters
    (filters || []).forEach((filter) => {
      matchQuery[filter.id] = { $regex: filter.value, $options: "i" };
    });

    // Sorting
    let sortQuery = {};
    sorting.forEach((sort) => {
      sortQuery[sort.id] = sort.desc ? -1 : 1;
    });

    // Aggregate pipeline
    const aggregatePipeline = [
      { $match: matchQuery },
      { $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } },
      { $skip: start },
      { $limit: size },
      {
        $project: {
          _id: 1,
          name: 1,
          phone: 1,
          gstId: 1,
          visible: 1,
          description: 1,
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
          media: 1,
        },
      },
    ];

    const shops = await ShopModel.aggregate(aggregatePipeline);
    const totalRowCount = await ShopModel.countDocuments(matchQuery);

    return NextResponse.json({
      success: true,
      data: shops,
      meta: { totalRowCount },
    });
  } catch (error) {
    return catchError(error);
  }
}
