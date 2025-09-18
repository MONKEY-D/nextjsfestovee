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

const page = () => {
  return (
    <>
      <section>
        <MainSlider />
      </section>
      <section className="lg:px-32 px-4 sm:pt-20 pt-5 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-10 justify-items-center">
          <div className="border rounded-lg overflow-hidden">
            <Link href="">
              <Image
                src={banner5.src}
                width={400}
                height={400}
                alt=""
                className="transition-all hover:scale-110"
              />
            </Link>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <Link href="">
              <Image
                src={banner6.src}
                width={400}
                height={400}
                alt=""
                className="transition-all hover:scale-110"
              />
            </Link>
          </div>
        </div>
      </section>
      <FeaturedShop />

      <FeaturedProduct />
      <Testimonial />

      <section className="bg-gray-50 lg:px-32 px-4 border-t py-10">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
          <div className="text-center">
            <p className="flex justify-center items-center mb-3">
              <GiReturnArrow size={30} />
            </p>
            <h3 className="text-xl font-semibold">7 Days Return</h3>
            <p>Risk-free shopping with easy return.</p>
          </div>
          <div className="text-center">
            <p className="flex justify-center items-center mb-3">
              <FaShippingFast size={30} />
            </p>
            <h3 className="text-xl font-semibold">Free Shipping</h3>
            <p>No hidden charges,just the price you se.</p>
          </div>
          <div className="text-center">
            <p className="flex justify-center items-center mb-3">
              <GiReturnArrow size={30} />
            </p>
            <h3 className="text-xl font-semibold">24/7 Support</h3>
            <p>24/7 support, always here just for you.</p>
          </div>
          <div className="text-center">
            <p className="flex justify-center items-center mb-3">
              <TbRosetteDiscountFilled size={30} />
            </p>
            <h3 className="text-xl font-semibold">Member Discount</h3>
            <p>Special offers for our loyal.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
