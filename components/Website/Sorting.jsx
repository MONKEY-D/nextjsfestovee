import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { sortings } from "@/lib/utils";
import { Button } from "../ui/button";
import { IoFilter } from "react-icons/io5";

const Sorting = ({
  limit,
  setLimit,
  sorting,
  setSorting,
  mobileFilterOpen,
  setMobileFilterOpen,
}) => {
  return (
    <div className="flex justify-between items-center flex-wrap gap-2 p-4 bg-gray-50">
      <Button
        type="button"
        className="lg:hidden"
        variant="outline"
        onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
      >
        <IoFilter />
      </Button>
      <ul className="flex items-center gap-2">
        <li className="font-semibold">Show</li>
        {[9, 12, 18, 24].map((limitNumber) => (
          <li key={limitNumber}>
            <button
              onClick={() => setLimit(limitNumber)}
              type="button"
              className={
                limitNumber === limit
                  ? "w-8 h-8 flex justify-center items-center rounded-full bg-primary text-white text-sm"
                  : "w-8 h-8 flex justify-center items-center rounded-full border text-sm"
              }
            >
              {limitNumber}
            </button>
          </li>
        ))}
      </ul>
      <Select value={sorting} onValueChange={(value) => setSorting(value)}>
        <SelectTrigger className="md:w-[180px] w-full bg-white">
          <SelectValue placeholder="Default Sorting" />
        </SelectTrigger>
        <SelectContent>
          {sortings.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sorting;
