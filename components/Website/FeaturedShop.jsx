import Link from "next/link";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import ShopBox from "./ShopBox";

const FeaturedShop = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/get-featured-shop`,
    { cache: "no-store" }
  );

  const shopData = await res.json();

  if (!shopData) return null;

  return (
    <section className="px-4 sm:px-6 lg:px-16 xl:px-32 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Featured Shops
          </h2>
          <Link
            href="/shops"
            className="flex items-center gap-2 underline underline-offset-4 hover:text-primary text-sm sm:text-base"
          >
            View All
            <IoIosArrowRoundForward className="text-lg sm:text-xl" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {!shopData.success && (
            <div className="text-center py-5 col-span-full text-gray-500">
              No Shops Found
            </div>
          )}

          {shopData.success &&
            shopData.data.map((shop) => <ShopBox key={shop._id} shop={shop} />)}
        </div>
      </div>
    </section>
  );
};

export default FeaturedShop;
