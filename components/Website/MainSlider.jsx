"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import webbanner1 from "@/public/banner/webbanner1.png";
import webbanner2 from "@/public/banner/webbanner2.png";
import webbanner3 from "@/public/banner/webbanner3.png";
import webbanner4 from "@/public/banner/webbanner4.png";
import webbanner5 from "@/public/banner/webbanner5.png";
import webbanner6 from "@/public/banner/webbanner6.png";
import webbanner7 from "@/public/banner/webbanner7.png";
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

  const banners = [
    webbanner1,
    webbanner2,
    webbanner4,
    webbanner5,
    webbanner6,
    webbanner7,
  ];

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {banners.map((banner, idx) => (
          <div key={idx} className="relative w-full aspect-[1440/430]">
            <Image
              src={banner}
              alt={`Banner ${idx + 1}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainSlider;
