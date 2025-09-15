import MainSlider from "@/components/Website/MainSlider";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import banner5 from "@/public/banner/banner5.jpg";
import banner6 from "@/public/banner/banner6.jpg";
import FeaturedProduct from "@/components/Website/FeaturedProduct";

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

      <FeaturedProduct />
    </>
  );
};

export default page;
