import { useState } from "react";
import { Plus, Search, MoreVertical, Tag } from "lucide-react";
import Loader from "../../components/shared/Loader.jsx";
import { formatDate } from "../../utils/formatDate.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // Fetch Categories
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  // Toggle Status
  toggleCategoryStatusStart,
  toggleCategoryStatusSuccess,
  toggleCategoryStatusFailure,
  // Delete Category
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
} from "../../features/category/categorySlice.js";
import {
  getAllCategoriesRequest,
  toggleCategoryStatusRequest,
  deleteCategoryRequest,
} from "../../features/category/categoryAPI.js";
import { Link } from "react-router-dom";
import Pagination from "../../components/shared/Pagination.jsx";
import { toast } from "react-toastify";
import EditCategoryModal from "../../modals/EditCategoryModal.jsx";

const Categories = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [openMenu, setOpenMenu] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const dispatch = useDispatch();

  const { categories, pagination, fetchcategoriesLoading } = useSelector(
    (state) => state.categories,
  );

  const handleToggleStatus = async (categoryId) => {
    try {
      dispatch(toggleCategoryStatusStart());
      const res = await toggleCategoryStatusRequest(categoryId);
      dispatch(
        toggleCategoryStatusSuccess({
          categoryId: res.categoryId,
          status: res.status,
        }),
      );
      toast.success(res.message);
      setOpenMenu(null);
    } catch (error) {
      dispatch(toggleCategoryStatusFailure());
      console.log(error);
      toast.error(error.response?.data?.error || "Something went wrong.");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );
    if (!confirmDelete) return;

    try {
      dispatch(deleteCategoryStart());
      const res = await deleteCategoryRequest(categoryId);
      dispatch(deleteCategorySuccess(categoryId));
      toast.success(res.message);
      setOpenMenu(null);
    } catch (error) {
      dispatch(deleteCategoryFailure());
      console.log(error);
      toast.error(error.response?.data?.error || "Something went wrong.");
    }
  };

  // fetching categories and setting states through redux toolkit
  useEffect(() => {
    const getCategories = async () => {
      try {
        dispatch(fetchCategoriesStart());
        const res = await getAllCategoriesRequest({
          page,
          limit: 5,
          search,
          status,
        });
        dispatch(fetchCategoriesSuccess(res));
      } catch (error) {
        dispatch(fetchCategoriesFailure());
        toast.error(error.response?.data?.error || "Something went wrong.");
      }
    };

    getCategories();
  }, [page, search, status]);

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
        <Link
          to={`/vendor/categories/add`}
          className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors self-start sm:self-auto"
        >
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
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
          </div>
          <button className="ml-auto p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 cursor-pointer">
            <select
              value={status}
              className="text-sm text-gray-600"
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
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
                <th className="px-5 py-3 font-medium hidden sm:table-cell">
                  Status
                </th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
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
                        {category?.categoryName?.charAt(0).toUpperCase()}
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

                  <td className={`px-5 py-4 text-xs hidden sm:table-cell`}>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          category?.status === "active"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-50 text-gray-500 border-gray-200"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${category?.status === "active" ? "bg-green-500" : "bg-gray-400"}`} />
                          {category?.status === "active" ? "Active" : "Inactive"}
                        </span>
                  </td>

                  {/* Status — clickable to toggle */}
                  <td className="px-5 py-4">
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === category?._id ? null : category?._id,
                          )
                        }
                        className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {openMenu === category?._id && (
                        <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-100 rounded-lg shadow-lg z-10 py-1">
                          <button
                            onClick={() => setEditingCategory(category)}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleToggleStatus(category?._id)}
                            className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                              category?.status === "active"
                                ? "text-red-600 hover:bg-red-50"
                                : "text-green-600 hover:bg-green-50"
                            }`}
                          >
                            {category?.status === "active"
                              ? "Inactivate"
                              : "Activate"}
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category?._id)}
                            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {fetchcategoriesLoading && (
                <tr>
                  <td colSpan={5} className="py-5">
                    <Loader className={`text-gray-500`} />
                  </td>
                </tr>
              )}

                {!fetchcategoriesLoading && categories?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-14 text-center">
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <Tag className="w-8 h-8 text-gray-200" />
                        <p className="text-sm">No Categories found.</p>
                        <Link
                          to="/vendor/categories/add"
                          className="text-xs text-secondary hover:underline"
                        >
                          + Add Category
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
          {editingCategory && (
            <EditCategoryModal
              onClose={() => {
                setEditingCategory(null)
                setOpenMenu(!openMenu)
              }}
              category={editingCategory}
            />
          )}
        </div>

        {/* Pagination */}
        <Pagination pagination={pagination} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default Categories;
