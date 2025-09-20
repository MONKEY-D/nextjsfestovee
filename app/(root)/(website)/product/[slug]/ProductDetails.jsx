"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import imgPlaceholder from "@/public/assets/img.webp";

const ProductDetails = ({ product, variant, colors, sizes, reviewCount }) => {
  const [ activeThumb, setActiveThumb ] = useState();

  useEffect(() => {
    setActiveThumb(variant?.media[0]?.secure_url);
  }, [variant]);

  return (
    <div className="lg:px-32 px-4">
      <div className="my-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={WEBSITE_SHOP}>Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={WEBSITE_PRODUCT_DETAILS(product?.slug)}>
                  {product.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="md:flex justify-between items-start lg:gap-10 gap-5 mb-20">
        <div className="md:w-1/2 xl:flex xl:justify-center xl:gap-5 md:sticky md:top-0 ">
          <div className="xl:order-last xl:mb-0 mb-5 xl:w-[calc(100%-144px)]">
            <Image
              src={activeThumb || imgPlaceholder.src}
              width={650}
              height={650}
              alt="thumbnail"
              className="rounded max-w-full"
            />
          </div>
          <div className="flex xl:flex-col items-center xl:gap-5 gap-3 xl:w-36 overflow-auto xl:pb-0 pb-2 max-h-[600px] ">
            {variant?.media?.map((thumb) => (
              <Image
                key={thumb._id}
                src={thumb?.secure_url || imgPlaceholder.src}
                width={650}
                height={650}
                alt="product thumbnail"
                className="rounded max-w-full"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
