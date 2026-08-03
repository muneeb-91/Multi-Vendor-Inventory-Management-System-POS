import { useState } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import Loader from '../../components/shared/Loader.jsx';
import {formatDate} from '../../utils/formatDate.js';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "../../features/category/categorySlice.js";
import { getAllCategoriesRequest } from "../../features/category/categoryAPI.js";
import { Link } from "react-router-dom";

const Categories = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const { categories, categoriesLoading, categoriesError } = useSelector(
    (state) => state.categories,
  );

  const filtered = categories?.filter(
    (category) =>
      category?.categoryName.toLowerCase().includes(search.toLowerCase()) ||
      category?.description.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleStatus = (id) =>{
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        dispatch(fetchCategoriesStart());
        const res = await getAllCategoriesRequest();
        dispatch(fetchCategoriesSuccess(res.categories));
      } catch (error) {
        dispatch(
          fetchCategoriesFailure(
            error.response?.data?.error || "Something went wrong.",
          ),
        );
      }
    };

    getCategories();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Categories</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage product classifications for vendor assignments.
          </p>
        </div>
        <Link to={`/vendor/categories/add`} className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          Add Category
        </Link>
      </div>

      {/* Table card */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        {/* Filter bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Filter categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
          </div>
          <button className="ml-auto p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3 font-medium">Category Name</th>
                <th className="px-5 py-3 font-medium hidden md:table-cell">
                  Description
                </th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell">
                  Created Date
                </th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered?.map((category) => (
                <tr
                  key={category?.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  {/* Name + letter avatar */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 bg-secondary text-tertiary `}
                      >
                        {category?.categoryName.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-primary">
                        {category?.categoryName}
                      </span>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-5 py-4 text-gray-500 hidden md:table-cell max-w-xs truncate">
                    {category?.description}
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4 font-mono text-xs text-gray-500 hidden sm:table-cell">
                    {formatDate(category?.createdAt)}
                  </td>

                  {/* Status — clickable to toggle */}
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleStatus(category?.id)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold border cursor-pointer transition-colors ${
                        category?.status === "active"
                          ? "border-secondary/40 bg-green-50 text-secondary hover:bg-green-100"
                          : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {category?.status}
                    </button>
                  </td>
                </tr>
              ))}
              
              {
                categoriesLoading && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-5"
                    >
                      <Loader className={`text-gray-500`}/>
                    </td>
                  </tr>
                )
              }

              {!categoriesLoading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-sm text-gray-400"
                  >
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 py-4 border-t border-gray-100 gap-3">
          <p className="text-xs text-gray-400">
            Showing 1 to {filtered.length} of {filtered.length} entries
          </p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 cursor-pointer">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium bg-secondary text-white cursor-pointer">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 cursor-pointer">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
