import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const {
    currentPage,
    totalPages,
    totalItems,
    limit,
  } = pagination;

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalItems);

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="px-6 py-4 bg-tertiary border-t border-gray-200 flex items-center justify-between">
      <span className="text-sm text-gray-500">
        Showing {start} to {end} of {totalItems} entries
      </span>

      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          disabled={!hasPreviousPage}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-1.5 rounded-md hover:bg-gray-200 text-gray-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-pointer ${
              currentPage === page
                ? "bg-secondary text-white"
                : "hover:bg-gray-200 text-gray-600"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          disabled={!hasNextPage}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-1.5 rounded-md hover:bg-gray-200 text-gray-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;