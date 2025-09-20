import MainSlider from "@/components/Website/MainSlider";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import banner5 from "@/public/banner/banner5.jpg";
import banner6 from "@/public/banner/banner6.jpg";
import FeaturedProduct from "@/components/Website/FeaturedProduct";
import FeaturedShop from "@/components/Website/FeaturedShop";
import Testimonial from "@/components/Website/Testimonial";
import { GiReturnArrow } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { TbRosetteDiscountFilled } from "react-icons/tb";
import PageInfo from "@/components/Website/PageInfo";
import Categories from "@/components/Website/Categories";

const page = () => {
  return (
    <>
      {/* Slider Section */}
      <section className="w-full">
        <MainSlider />
      </section>

      {/* Page Info */}
      <PageInfo />

      <Categories />

      {/* Featured Shops */}
      <FeaturedShop />

      {/* Featured Products */}
      <FeaturedProduct />

      {/* Testimonials */}
      <Testimonial />

      {/* Services / Features */}
      <section className="bg-gray-50 border-t py-10 lg:px-32 md:px-16 sm:px-8 px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 sm:gap-8 lg:gap-10 text-center">
          <div className="flex flex-col items-center">
            <p className="flex justify-center items-center mb-3 text-indigo-600">
              <GiReturnArrow size={30} />
            </p>
            <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold">
              7 Days Return
            </h3>
            <p className="text-sm sm:text-base md:text-base lg:text-base text-gray-600 mt-1">
              Risk-free shopping with easy return.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="flex justify-center items-center mb-3 text-indigo-600">
              <FaShippingFast size={30} />
            </p>
            <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold">
              Free Shipping
            </h3>
            <p className="text-sm sm:text-base md:text-base lg:text-base text-gray-600 mt-1">
              No hidden charges, just the price you see.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="flex justify-center items-center mb-3 text-indigo-600">
              <BiSupport size={30} />
            </p>
            <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold">
              24/7 Support
            </h3>
            <p className="text-sm sm:text-base md:text-base lg:text-base text-gray-600 mt-1">
              24/7 support, always here just for you.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="flex justify-center items-center mb-3 text-indigo-600">
              <TbRosetteDiscountFilled size={30} />
            </p>
            <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold">
              Member Discount
            </h3>
            <p className="text-sm sm:text-base md:text-base lg:text-base text-gray-600 mt-1">
              Special offers for our loyal customers.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
