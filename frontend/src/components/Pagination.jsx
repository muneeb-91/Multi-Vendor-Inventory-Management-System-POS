import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = () => {
  return (
    <div className="px-6 py-4 bg-tertiary border-t border-gray-200 flex items-center justify-between">
      <span className="text-sm text-gray-500">
        Showing 1 to 5 of 124 entries
      </span>
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-md hover:bg-gray-200 text-gray-500 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md bg-secondary text-white text-sm font-medium transition-colors">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors">
          3
        </button>
        <span className="px-1 text-gray-400">...</span>
        <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors">
          25
        </button>
        <button className="p-1.5 rounded-md hover:bg-gray-200 text-gray-500 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
