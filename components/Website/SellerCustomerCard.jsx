import React from "react";

export default function SellerCustomerCards() {
  return (
    <div className="flex justify-center items-center bg-white mt-10 sm:mt-20 mb-10 sm:mb-20 px-4">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 w-full max-w-7xl">
        {/* Seller Card */}
        <div className="relative flex-1 bg-gray-100 rounded-3xl shadow-lg p-6 sm:p-8 transition-transform duration-300 hover:scale-105">
          <span className="absolute top-4 left-4 bg-black text-white text-xs sm:text-sm px-2 py-1 rounded">
            FOR SELLERS
          </span>
          <h2 className="mt-12 sm:mt-16 text-lg sm:text-xl md:text-2xl font-bold">
            List your products, reach verified buyers instantly.
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Join 600+ sellers now
          </p>
          <button className="mt-6 sm:mt-10 px-4 py-2 sm:px-6 sm:py-3 rounded-md bg-white text-black font-medium hover:bg-gray-300 transition">
            Register as a seller →
          </button>
        </div>

        {/* Customer Card */}
        <div className="relative flex-1 bg-gradient-to-b from-rose-400 to-rose-600 rounded-3xl shadow-lg p-6 sm:p-8 transition-transform duration-300 hover:scale-105">
          <span className="absolute top-4 left-4 bg-black text-white text-xs sm:text-sm px-2 py-1 rounded">
            FOR CUSTOMERS
          </span>
          <h2 className="mt-12 sm:mt-16 text-lg sm:text-xl md:text-2xl font-bold text-white">
            Source directly form manufacturers at the best prices.
          </h2>
          <p className="text-rose-100 mt-2 text-sm sm:text-base">
            Trusted by 1 lakh+ factories
          </p>
          <button className="mt-6 sm:mt-10 px-4 py-2 sm:px-6 sm:py-3 rounded-md bg-white text-black font-medium hover:bg-gray-300 transition">
            Signup now →
          </button>
        </div>
      </div>
    </div>
  );
}
