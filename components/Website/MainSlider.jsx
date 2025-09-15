"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import banner1 from "@/public/banner/banner1.jpg";
import banner2 from "@/public/banner/banner2.jpg";
import banner3 from "@/public/banner/banner3.jpg";
import banner4 from "@/public/banner/banner4.jpg";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 
               bg-black/40 hover:bg-black/60 text-white p-2 rounded-full
               transition hidden md:flex"
  >
    <IoIosArrowForward size={24} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 
               bg-black/40 hover:bg-black/60 text-white p-2 rounded-full
               transition hidden md:flex"
  >
    <IoIosArrowBack size={24} />
  </button>
);

const MainSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {[banner1, banner2, banner3, banner4].map((banner, idx) => (
          <div
            key={idx}
            className="relative w-full h-[250px] sm:h-[400px] md:h-[600px]"
          >
            <Image
              src={banner}
              alt={`Banner ${idx + 1}`}
              fill
              priority
              className="object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainSlider;
