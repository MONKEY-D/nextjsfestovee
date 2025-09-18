import Filter from "@/components/Website/Filter";
import WebsiteBreadcrumb from "@/components/Website/WebsiteBreadcrumb";
import { WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import React from "react";
const breadcrumb = {
  title: "Shop",
  links: [
    {
      label: "Shop",
      href: WEBSITE_SHOP,
    },
  ],
};

const Shop = () => {
  return (
    <div>
      <WebsiteBreadcrumb props={breadcrumb} />
      <section className="lg:flex lg:px-32 px-4 my-20">
        <div className="w-72 me-4">
          <div className="sticky top-0 bg-gray-50 p-4 rounded">
            <Filter />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
