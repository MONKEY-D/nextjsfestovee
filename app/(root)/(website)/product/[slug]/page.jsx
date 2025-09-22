// import axios from "axios";
// import React from "react";
// import ProductDetails from "./ProductDetails";

// const ProductPage = async ({ params, searchParams }) => {
//   const { slug } = params;
//   const { color, size } = searchParams;

//   let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/details/${slug}`;

//   const query = [];
//   if (color) query.push(`color=${encodeURIComponent(color)}`);
//   if (size) query.push(`size=${encodeURIComponent(size)}`);
//   if (query.length) url += `?${query.join("&")}`;

//   const { data: getProduct } = await axios.get(url);

//   if (!getProduct.success) {
//     return (
//       <div className="flex justify-center items-center py-10 h-[300px]">
//         <h1 className="text-4xl font-semibold">Data not found</h1>
//       </div>
//     );
//   }

//   return (
//     <ProductDetails
//       product={getProduct.data.product}
//       variant={getProduct.data.variant}
//       colors={getProduct.data.colors}
//       sizes={getProduct.data.sizes}
//       reviewCount={getProduct.data.reviewCount}
//     />
//   );
// };

// export default ProductPage;

import React from "react";
import ProductDetails from "./ProductDetails";

const ProductPage = async ({ params, searchParams }) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const slug = resolvedParams?.slug;
  const size = resolvedSearchParams?.size || null;
  const color = resolvedSearchParams?.color || null;

  if (!slug) {
    return (
      <div className="flex justify-center items-center py-10 h-[300px]">
        <h1 className="text-4xl font-semibold">Product not found</h1>
      </div>
    );
  }

  const query = [];
  if (color) query.push(`color=${encodeURIComponent(color)}`);
  if (size) query.push(`size=${encodeURIComponent(size)}`);

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/details/${slug}${
    query.length ? `?${query.join("&")}` : ""
  }`;

  const res = await fetch(url, { cache: "no-store" });
  const getProduct = await res.json();

  if (!getProduct.success || !getProduct.data) {
    return (
      <div className="flex justify-center items-center py-10 h-[300px]">
        <h1 className="text-4xl font-semibold">Product not found</h1>
      </div>
    );
  }

  return (
    <ProductDetails
      product={getProduct.data.product}
      variant={getProduct.data.variant}
      colors={getProduct.data.colors}
      sizes={getProduct.data.sizes}
      reviewCount={getProduct.data.reviewCount}
    />
  );
};

export default ProductPage;
