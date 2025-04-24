import Link from "next/link";
import { PaginationProps } from "@/types";

const Pagination = ({ currentPage, totalPages, query }: PaginationProps) => {
  return (
    <div className="mt-8 mb-8 flex justify-center items-center gap-4">
      <Link
        href={`/?page=${Math.max(1, currentPage - 1)}${
          query ? `&query=${encodeURIComponent(query)}` : ""
        }`}
        className={`px-4 py-2 rounded-lg ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-slate-600 text-white hover:bg-slate-700"
        } transition-colors`}
      >
        Previous
      </Link>

      <span className="text-gray-700 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={`/?page=${Math.min(totalPages, currentPage + 1)}${
          query ? `&query=${encodeURIComponent(query)}` : ""
        }`}
        className={`px-4 py-2 rounded-lg ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-slate-500 text-white hover:bg-slate-700"
        } transition-colors`}
      >
        Next
      </Link>
    </div>
  );
};

export default Pagination;
