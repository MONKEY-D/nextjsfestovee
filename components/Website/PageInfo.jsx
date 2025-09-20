"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const PageInfo = () => {
  return (
    <section className="w-full bg-gradient-to-r from-gray-50 to-gray-300 border-b rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-10 sm:py-14 lg:mt-1 lg:py-25">
        <Card className="shadow-none border-0 bg-transparent">
          <CardContent className="p-0 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
            >
              <span className="text-indigo-600">1k+ factories</span>, Exports to{" "}
              <span className="text-blue-600">UK</span> and{" "}
              <span className="text-blue-600">Africa</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="mt-4 text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Fast growing{" "}
              <span className="font-semibold text-gray-900">
                B2B Marketplace
              </span>{" "}
              — Simple, Transparent and Reliable.
            </motion.p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PageInfo;
