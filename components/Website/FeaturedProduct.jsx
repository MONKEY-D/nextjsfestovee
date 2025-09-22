import Link from "next/link";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import ProductBox from "./ProductBox";

const FeaturedProduct = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get-featured-product`,
    {
      cache: "no-store",
    }
  );

  const productData = await res.json();

  console.log("productData =>", productData);

  if (!productData) {
    return null;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-16 xl:px-32 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Featured Products
          </h2>
          <Link
            href="/shop"
            className="flex items-center gap-2 underline underline-offset-4 hover:text-primary text-sm sm:text-base"
          >
            View All
            <IoIosArrowRoundForward className="text-lg sm:text-xl" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {!productData.success && (
            <div className="text-center py-5 col-span-full text-gray-500">
              Data not found
            </div>
          )}

          {productData.success &&
            productData.data.map((product) => (
              <ProductBox key={product._id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
