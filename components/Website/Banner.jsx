import React from "react";
import {
  GlobeAltIcon,
  BuildingStorefrontIcon,
  AdjustmentsVerticalIcon,
} from "@heroicons/react/24/outline";

const banners = [
  {
    title: "Domestic B2B",
    description: "Connecting local businesses with premium B2B solutions.",
    icon: <BuildingStorefrontIcon className="w-10 h-10 text-blue-600" />,
    gradient: "from-blue-100 to-blue-50",
  },
  {
    title: "Exports",
    description:
      "Expanding your business reach globally with our B2B platform.",
    icon: <GlobeAltIcon className="w-10 h-10 text-purple-600" />,
    gradient: "from-purple-100 to-purple-50",
  },
  {
    title: "White Labelling",
    description: "Custom B2B solutions tailored to your brand.",
    icon: <AdjustmentsVerticalIcon className="w-10 h-10 text-indigo-600" />,
    gradient: "from-indigo-100 to-indigo-50",
  },
];

export default function B2BBanners() {
  return (
    <section className="px-4 sm:px-8 lg:px-16 xl:px-24 py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl shadow-md p-8 flex flex-col items-start gap-4 bg-gradient-to-b ${item.gradient} transition-transform duration-300 hover:scale-105`}
            >
              <div className="p-3 bg-white rounded-xl shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
