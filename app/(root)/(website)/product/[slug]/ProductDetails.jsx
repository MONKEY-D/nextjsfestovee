"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import imgPlaceholder from "@/public/assets/img.webp";
import { IoStar } from "react-icons/io5";

const ProductDetails = ({ product, variant, reviewCount }) => {
  const [activeThumb, setActiveThumb] = useState();
  const [quantity, setQuantity] = useState(1);

  // Determine which media to display (variant first, fallback to product)
  const media = variant?.media?.length
    ? variant.media
    : product?.media?.length
    ? product.media
    : [{ secure_url: imgPlaceholder.src }];

  useEffect(() => {
    setActiveThumb(media[0].secure_url);
  }, [media]);

  const handleThumb = (thumbUrl) => setActiveThumb(thumbUrl);

  const price = variant?.sellingPrice || product?.sellingPrice;
  const mrp = variant?.mrp || product?.mrp;
  const discount =
    variant?.discountPercentage || product?.discountPercentage || 0;

  return (
    <div className="lg:px-32 px-4">
      {/* Breadcrumb */}
      <div className="my-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={WEBSITE_SHOP}>Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={WEBSITE_PRODUCT_DETAILS(product?.slug)}>
                  {product?.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Product Images & Info */}
      <div className="md:flex justify-between items-start lg:gap-10 gap-5 mb-20">
        {/* Images */}
        <div className="md:w-1/2 xl:flex xl:justify-center xl:gap-5 md:sticky md:top-0">
          <div className="xl:order-last xl:mb-0 mb-5 xl:w-[calc(100%-144px)]">
            <Image
              src={activeThumb || imgPlaceholder.src}
              width={650}
              height={650}
              alt={product?.name || "product"}
              className="rounded max-w-full"
            />
          </div>
          <div className="flex xl:flex-col items-center xl:gap-5 gap-3 xl:w-36 overflow-auto xl:pb-0 pb-2 max-h-[600px]">
            {media.map((thumb, idx) => (
              <Image
                key={idx}
                src={thumb.secure_url || imgPlaceholder.src}
                width={100}
                height={100}
                alt={`thumbnail ${idx}`}
                className={`md:max-w-full max-w-16 rounded cursor-pointer ${
                  thumb.secure_url === activeThumb
                    ? "border-2 border-primary"
                    : "border"
                }`}
                onClick={() => handleThumb(thumb.secure_url)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 md:mt-0 mt-5">
          <h1 className="text-3xl font-semibold mb-2">{product?.name}</h1>

          {/* Ratings */}
          <div className="flex items-center gap-1 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <IoStar key={i} className="text-yellow-500" />
            ))}
            <span className="text-sm ps-2">({reviewCount || 0} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl font-semibold">
              {price?.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            {mrp && mrp !== price && (
              <span className="text-xl line-through text-gray">
                {mrp.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            )}
            {discount > 0 && (
              <span className="text-green-600">({discount}% OFF)</span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-5">
            <label className="font-medium">Quantity:</label>
            <button
              className="px-3 py-1 border"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="px-3">{quantity}</span>
            <button
              className="px-3 py-1 border"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark transition mb-5">
            Add to Cart
          </button>

          {/* Product Description */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Product Details</h2>
            <p className="text-gray-700">
              {product?.description ||
                "No description available for this product."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
