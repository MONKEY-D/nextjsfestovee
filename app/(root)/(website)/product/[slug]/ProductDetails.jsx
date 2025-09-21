"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  WEBSITE_CART,
  WEBSITE_PRODUCT_DETAILS,
  WEBSITE_SHOP,
} from "@/routes/WebsiteRoute";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import imgPlaceholder from "@/public/assets/img.webp";
import { IoStar } from "react-icons/io5";
import { decode, encode } from "entities";
import { HiMinus, HiPlus } from "react-icons/hi2";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { useDispatch, useSelector } from "react-redux";
import { addIntoCart } from "@/store/reducer/cartReducer";
import { showToast } from "@/lib/showToast";
import { Button } from "@/components/ui/button";
import loadingSvg from "@/public/assets/loading.svg";
import ProductReview from "@/components/Website/ProductReview";

const ProductDetails = ({ product, variant, colors, sizes, reviewCount }) => {
  const dispatch = useDispatch();
  const cartStore = useSelector((store) => store.cartStore);
  const [activeThumb, setActiveThumb] = useState();
  const [qty, setQty] = useState(1);
  const [isAddedIntoCart, setIsAddedIntoCart] = useState(false);
  const [isProductLoading, setIsProductLoading] = useState(false);

  // fallback variant if not provided
  const displayVariant =
    variant && Object.keys(variant).length > 0
      ? variant
      : {
          sellingPrice: product?.sellingPrice || 0,
          mrp: product?.mrp || 0,
          discountPercentage: product?.discountPercentage || 0,
          media: product?.media || [],
          size: "NA",
          color: "NA",
          _id: null,
        };

  useEffect(() => {
    setActiveThumb(displayVariant?.media?.[0]?.secure_url);
  }, [displayVariant]);

  useEffect(() => {
    if (cartStore.count > 0 && displayVariant._id) {
      const existingProduct = cartStore.products.findIndex(
        (cartProduct) =>
          cartProduct.productId === product._id &&
          cartProduct.variantId === displayVariant._id
      );
      setIsAddedIntoCart(existingProduct >= 0);
    }
    setIsProductLoading(false);
  }, [displayVariant]);

  const handleThumb = (thumbUrl) => setActiveThumb(thumbUrl);

  const handleQty = (actionType) => {
    setQty((prev) => (actionType === "inc" ? prev + 1 : Math.max(prev - 1, 1)));
  };

  const handleAddToCart = () => {
    const cartProduct = {
      productId: product._id,
      variantId: displayVariant._id,
      name: product.name,
      url: product.slug,
      size: displayVariant.size,
      color: displayVariant.color,
      mrp: displayVariant.mrp,
      sellingPrice: displayVariant.sellingPrice,
      media: displayVariant?.media?.[0]?.secure_url,
      qty,
    };
    dispatch(addIntoCart(cartProduct));
    setIsAddedIntoCart(true);
    showToast("success", "Product added into cart");
  };

  return (
    <div className="lg:px-32 px-4">
      {isProductLoading && (
        <div className="fixed top-10 left-1/2 -translate-1/2 z-50">
          <Image src={loadingSvg} width={100} height={100} alt="loading" />
        </div>
      )}

      {/* Breadcrumb */}
      <div className="my-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={WEBSITE_SHOP}>Product</BreadcrumbLink>
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
              alt="product"
              className="border rounded max-w-full"
            />
          </div>
          <div className="flex xl:flex-col items-center xl:gap-5 gap-3 xl:w-36 overflow-auto xl:pb-0 pb-2 max-h-[600px]">
            {displayVariant?.media?.map((thumb) => (
              <Image
                key={thumb._id}
                src={thumb?.secure_url || imgPlaceholder.src}
                width={100}
                height={100}
                alt="product thumbnail"
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
              {displayVariant?.sellingPrice?.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span className="text-xl line-through text-gray">
              {displayVariant?.mrp?.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span className="bg-red-500 rounded-2xl px-3 py-1 text-white text-xs">
              -{displayVariant?.discountPercentage || 0}%
            </span>
          </div>

          <div
            className="line-clamp-3"
            dangerouslySetInnerHTML={{ __html: decode(product?.description) }}
          ></div>

          {/* Colors */}
          {colors?.length > 0 && (
            <div className="mt-5">
              <p className="mb-2">
                <span className="font-semibold">Color: </span>
                {displayVariant?.color || "NA"}
              </p>
              <div className="flex gap-5 flex-wrap">
                {colors.map((color) => (
                  <Link
                    onClick={() => setIsProductLoading(true)}
                    href={`${WEBSITE_PRODUCT_DETAILS(
                      product.slug
                    )}?color=${encodeURIComponent(color)}&size=${
                      variant?.size || "NA"
                    }`}
                    key={color || "na"}
                    className={`border py-1 px-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white ${
                      color === displayVariant?.color
                        ? "bg-primary text-white"
                        : ""
                    } `}
                  >
                    {color || "NA"}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {sizes?.length > 0 && (
            <div className="mt-5">
              <p className="mb-2">
                <span className="font-semibold">Size: </span>
                {displayVariant?.size || "NA"}
              </p>
              <div className="flex gap-5 flex-wrap">
                {sizes.map((size) => (
                  <Link
                    onClick={() => setIsProductLoading(true)}
                    href={`${WEBSITE_PRODUCT_DETAILS(
                      product.slug
                    )}?size=${encodeURIComponent(size)}&color=${
                      variant?.color || "NA"
                    }`}
                    key={size || "NA"}
                    className={`border py-1 px-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white ${
                      size === displayVariant?.size
                        ? "bg-primary text-white"
                        : ""
                    }`}
                  >
                    {size || "NA"}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-5">
            <p className="font-bold mb-2">Quantity</p>
            <div className="flex items-center h-10 border w-fit rounded-full">
              <button
                onClick={() => handleQty("desc")}
                type="button"
                className="h-full w-10 flex justify-center items-center"
              >
                <HiMinus />
              </button>
              <input
                type="text"
                value={qty}
                className="w-14 text-center border-none outline-offset-0"
                readOnly
              />
              <button
                onClick={() => handleQty("inc")}
                type="button"
                className="h-full w-10 flex justify-center items-center"
              >
                <HiPlus />
              </button>
            </div>
          </div>

          {/* Cart Button */}
          <div className="mt-5">
            {!isAddedIntoCart ? (
              <ButtonLoading
                type="button"
                text="Add To Cart"
                className="w-full rounded-full py-6 text-md cursor-pointer"
                onClick={handleAddToCart}
              />
            ) : (
              <Button type="button" asChild>
                <Link href={WEBSITE_CART}>Go To Cart</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-10">
        <div className="shadow rounded border">
          <div className="p-3 bg-gray-50 border-b">
            <h2 className="font-semibold text-2xl">Product Description</h2>
          </div>

          <div className="p-3">
            <div
              dangerouslySetInnerHTML={{
                __html: encode(product?.description || ""),
              }}
            ></div>
          </div>
        </div>
      </div>

      <ProductReview productId={product._id} />
    </div>
  );
};

export default ProductDetails;
