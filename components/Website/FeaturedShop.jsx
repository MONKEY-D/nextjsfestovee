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
    <section className="lg:px-32 px-4 sm:py-10">
      <div className="flex justify-between items-center mb-5">
        <h2 className="sm:text-4xl font-semibold text-2xl">Featured Shops</h2>
        <Link
          href="/shops"
          className="flex items-center gap-2 underline underline-offset-4 hover:text-primary"
        >
          View All
          <IoIosArrowRoundForward />
        </Link>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-2 sm:gap-10 gap-4">
        {!shopData.success && (
          <div className="text-center py-5 col-span-full">No Shops Found</div>
        )}

        {shopData.success &&
          shopData.data.map((shop) => <ShopBox key={shop._id} shop={shop} />)}
      </div>
    </section>
  );
};

export default FeaturedShop;
