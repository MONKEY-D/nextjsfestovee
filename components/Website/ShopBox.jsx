import Image from "next/image";
import Link from "next/link";
import React from "react";

const ShopBox = ({ shop }) => {
  const imageSrc = shop?.media?.[0]?.secure_url || "/assets/img.webp";
  const imageAlt = shop?.media?.[0]?.alt || shop?.name || "Shop";

  return (
    <div className="rounded-lg hover:shadow-lg border overflow-hidden">
      <Link href={`/shop/${shop._id}`}>
        <Image
          src={imageSrc}
          width={400}
          height={250}
          alt={imageAlt}
          title={shop?.name}
          className="w-full h-[200px] object-cover object-top"
        />
        <div className="p-3 border-t">
          <h4 className="font-semibold text-lg">{shop?.name}</h4>
          <p className="text-sm text-gray-600 line-clamp-2">
            {shop?.description || "No description available"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ShopBox;
