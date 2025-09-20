import React from "react";

export default function SellerCustomerCards() {
  return (
    <div className="flex justify-center items-center bg-white mt-20 mb-20">
      <div className="relative flex gap-6">
        {/* Seller Card */}
        <div className=" border group left-10 w-100 h-65 bg-gray-100 rounded-4xl shadow-lg drop-shadow-2xl p-6 transition-transform duration-300 hover:scale-105 relative z-10">
          <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded">
            FOR SELLERS
          </span>
          <h2 className="mt-8 text-xl font-bold">Sell to restaurants now</h2>
          <p className="text-gray-500 mt-2">Join 600+ sellers now</p>
          <button className="mt-20 px-4 py-2 rounded-md bg-white text-black font-medium hover:bg-gray-300">
            Register as a seller →
          </button>
        </div>

        {/* Customer Card */}
        <div className="border group right-10 w-100 h-65 bg-gradient-to-b from-rose-400 to-rose-600 rounded-4xl shadow-lg drop-shadow-2xl p-6 transition-transform duration-300 hover:scale-110 relative z-20">
          <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded">
            FOR CUSTOMERS
          </span>
          <h2 className="mt-8 text-xl font-bold text-white">
            Smarter sourcing, better serving
          </h2>
          <p className="text-rose-100 mt-2">Trusted by 1 lakh+ restaurants</p>
          <button className="mt-20 px-4 py-2 rounded-md bg-white text-black font-medium hover:bg-gray-300">
            Signup now →
          </button>
        </div>
      </div>
    </div>
  );
}
