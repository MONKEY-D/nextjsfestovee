"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { IoStar } from "react-icons/io5";
import { BsChatQuote } from "react-icons/bs";

const testimonials = [
  {
    name: "Aarav Mehta",
    review:
      "I have been shopping here for the last three months and the experience has been outstanding. The products are always genuine and well-packed. Delivery is on time and customer support is extremely helpful whenever I had questions.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    review:
      "The website is very easy to navigate and I love how smooth the checkout process is. I ordered twice and both times the products arrived earlier than expected. Definitely recommending this to my friends and family.",
    rating: 4,
  },
  {
    name: "Rohan Verma",
    review:
      "At first I was skeptical, but after my first purchase I was convinced. The product quality exceeded my expectations and the packaging was secure. I also got a discount coupon that made the deal even sweeter.",
    rating: 5,
  },
  {
    name: "Sneha Kapoor",
    review:
      "I ordered a few items for my home and everything turned out perfect. The variety of products is impressive, and the prices are very reasonable. I particularly loved the quick updates during shipping.",
    rating: 4,
  },
  {
    name: "Aditya Singh",
    review:
      "Excellent platform! I had an issue with one of my orders, but the support team resolved it in less than 24 hours. That really shows how much they care about their customers. Will surely order again.",
    rating: 5,
  },
  {
    name: "Kavya Iyer",
    review:
      "I found some really unique products that I couldn’t find elsewhere. The quality is top-notch, and the photos on the site match exactly with what I received. Truly satisfied with my shopping experience.",
    rating: 5,
  },
  {
    name: "Nikhil Joshi",
    review:
      "Shopping here has been such a smooth process. The payment options are flexible and secure. I also appreciate how eco-friendly their packaging is, which makes me want to support them even more.",
    rating: 4,
  },
  {
    name: "Ritu Malhotra",
    review:
      "I’ve tried many online stores but this one stands out. Their delivery is quick, items are genuine, and the discounts make it worth it. The best part is, the products last long and don’t disappoint.",
    rating: 5,
  },
  {
    name: "Arjun Desai",
    review:
      "The customer experience is absolutely amazing. I faced no issues during browsing, selecting products, or making payment. Their mobile experience is also seamless which makes it convenient for on-the-go shopping.",
    rating: 5,
  },
  {
    name: "Meera Nair",
    review:
      "I am extremely happy with my purchase. The product was exactly as described, the delivery was fast, and the packaging kept it safe. I’ve already placed another order and I can’t wait to receive it.",
    rating: 5,
  },
];

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <div className="lg:px-32 px-4 sm:pt-20 pt-5 pb-10">
      <h2 className="text-center sm:text-4xl text-2xl mb-5 font-semibold">
        Customere Review
      </h2>
      <Slider {...settings}>
        {testimonials.map((item, index) => (
          <div key={index} className="p-5">
            <div className="border rounded-lg p-5">
              <BsChatQuote size={30} className="mb-3" />
              <p className="mb-5">{item.review}</p>
              <h4 className="font-semibold ">{item.name}</h4>
              <div className="flex mt-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <IoStar
                    key={`star${i}`}
                    className="text-yellow-400"
                    size={20}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;
