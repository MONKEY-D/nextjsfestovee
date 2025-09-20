"use client";

import React from "react";
import Image from "next/image";
import placeholder from "@/public/assets/img.webp";
import { Card } from "../ui/card";

const categories = [
  "Electronic & Appliances",
  "Mobile & Accessories",
  "Home & Kitchen Appliances",
  "Furniture & Home Decor",
  "Fashion & Apparel",
  "Footwear & Bags",
  "Beauty & Cosmetics",
  "Health & Personal care",
  "Sports & Fitness Equipments",
  "Toys & Baby Products",
  "Stationary & Office Supplies",
  "Automotive & Spare Parts",
  "Industrial & Hardware Tools",
  "Lighting & Electricals",
  "Grocery & Packages Foods",
];

const categoryImage = {
  "Electronic & Appliances":
    "https://res.cloudinary.com/dh9j3przi/image/upload/v1758362137/cat1_fmydzj.jpg",
  "Mobile & Accessories":
    "https://res.cloudinary.com/dh9j3przi/image/upload/v1758362137/cat2_oxhm5z.jpg",
  "Home & Kitchen Appliances":
    "https://res.cloudinary.com/dh9j3przi/image/upload/v1758362137/cat3_xqtmdl.jpg",
  "Furniture & Home Decor":
    "https://res.cloudinary.com/dh9j3przi/image/upload/v1758362138/cat4_b97qmx.jpg",
  "Fashion & Apparel":
    "https://res.cloudinary.com/dh9j3przi/image/upload/v1758362137/cat5_xcpr80.jpg",
  "Footwear & Bags":
    "https://res.cloudinary.com/dh9j3przi/image/upload/v1758362138/cat6_kpmnpq.jpg",
  "Beauty & Cosmetics":
    "https://res.cloudinary.com/dh9j3przi/image/upload/v1758362138/cat7_gels2x.jpg",
  "Health & Personal care":
    "https://res.cloudinary.com/dh9j3przi/image/upload/v1758362138/cat8_ufhkcm.jpg",
  "Sports & Fitness Equipments":
    "https://res.cloudinary.com/dh9j3przi/image/upload/v1758362137/cat9_qazcnl.jpg",
  "Toys & Baby Products":
    "https://res.cloudinary.com/dh9j3przi/image/upload/v1758362137/cat10_jzbuor.jpg",
  "Stationary & Office Supplies":
    "https://res.cloudinary.com/dh9j3przi/image/upload/v1758362138/cat11_kel6ec.jpg",
  "Automotive & Spare Parts":
    "https://res.cloudinary.com/dh9j3przi/image/upload/v1758362138/cat12_ws0znu.jpg",
  "Industrial & Hardware Tools":
    "https://res.cloudinary.com/dh9j3przi/image/upload/v1758362138/cat13_haxrzw.jpg",
  "Lighting & Electricals":
    "https://res.cloudinary.com/dh9j3przi/image/upload/v1758362137/cat14_dz7p5w.jpg",
  "Grocery & Packages Foods":
    "https://res.cloudinary.com/dh9j3przi/image/upload/v1758362137/cat15_rk8xiq.jpg",
};

const Categories = () => {
  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
        <Card className="bg-indigo-200 p-8 sm:p-12 shadow-xl">
          <h2 className="text-center text-blue-800 font-semibold text-lg sm:text-xl mb-8">
            OUR CATEGORIES
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 justify-items-center">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="w-full bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 mb-2 relative aspect-square">
                  <Image
                    src={categoryImage[cat] || placeholder}
                    alt={cat}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm sm:text-base font-medium">{cat}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Categories;
