import React from "react";

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
    </div>
  );
};

export default Sorting;
