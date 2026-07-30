import React from "react";

const StockBar = ({ level }) => {
  const isLow = level === "low";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${isLow ? "bg-amber-400 w-1/4" : "bg-secondary w-3/4"}`}
        />
      </div>
    </div>
  );
};

export default StockBar