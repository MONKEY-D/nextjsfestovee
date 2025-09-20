"use client";

import React from "react";
import Image from "next/image";
import placeholder from "@/public/assets/img.webp";
import { Card } from "../ui/card";

const categories = [
  "Your Menu Add-ons",
  "Fruits & Vegetables",
  "Dairy",
  "Masala, Salt & Sugar",
  "Chicken & Eggs",
  "Sauces & Seasoning",
  "Custom Packaging",
  "Canned & Imported Items",
  "Edible Oils",
  "Packaging Material",
  "Frozen & Instant Food",
  "Bakery & Chocolates",
  "Flours",
  "Pulses",
  "Cleaning & Consumables",
  "Dry Fruits & Nuts",
  "Beverages & Mixers",
  "Rice & Rice Products",
  "Fish, Prawns & Seafood",
  "Mutton, Duck & Lamb",
  "Kitchenware & Appliances",
  "Fresh Cut & Peeled",
];

const Categories = () => {
  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
        <Card className="bg-indigo-200 p-8 sm:p-12 shadow-xl">
          <h2 className="text-center text-blue-800 font-semibold text-lg sm:text-xl mb-8">
            OUR CATEGORIES
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center hover:shadow-lg transition"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 mb-2 relative">
                  <Image
                    src={placeholder}
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
