import { useEffect, useState } from "react";
import { Plus, Trash2, Search, Building2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { suppliers, avatarColor, supplierStats } from "../../data";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSuppliersStart,
  fetchSuppliersSuccess,
  fetchSuppliersFailure,
} from "../../features/supplier/supplierSlice";

import { getAllSuppliersRequest } from "../../features/supplier/supplierAPI";

import Pagination from "../../components/shared/Pagination";
import Loader from "../../components/shared/Loader";

const Suppliers = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("all");

  const { suppliers, pagination, fetchSuppliersLoading } = useSelector(
    (state) => state.suppliers,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getSuppliers = async () => {
      try {
        dispatch(fetchSuppliersStart());

        const res = await getAllSuppliersRequest({
          page: currentPage,
          limit: 5,
          search,
          status,
        });

        dispatch(
          fetchSuppliersSuccess({
            suppliers: res.suppliers,
            pagination: res.pagination,
          }),
        );
      } catch (error) {
        dispatch(fetchSuppliersFailure());

        console.log(error.response?.data?.error || "Something went wrong.");
      }
    };

    getSuppliers();
  }, [dispatch, currentPage, search, status]);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-primary">Suppliers</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage your product supply chain and vendor contacts.
            </p>
          </div>
          <Link
            to="/vendor/suppliers/add"
            className="self-start sm:self-auto flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-4 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Supplier
          </Link>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {supplierStats.map((card) => (
            <div
              key={card.label}
              className="bg-white border border-gray-100 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-400">{card.label}</p>
                <div
                  className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center`}
                >
                  <card.icon className={`w-4 h-4 ${card.ic}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-primary">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Table Card */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          {/* Search */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search suppliers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                  <th className="px-5 py-3 font-medium">Supplier</th>
                  <th className="px-5 py-3 font-medium hidden md:table-cell">
                    Contact
                  </th>
                  <th className="px-5 py-3 font-medium hidden lg:table-cell">
                    Address
                  </th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => {
                  const { bg, text } = avatarColor(supplier?.supplierName);
                  return (
                    <tr
                      key={supplier?.id}
                      className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors"
                    >
                      {/* Name + avatar */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${bg} ${text}`}
                          >
                            {supplier?.supplierName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-primary leading-tight">
                              {supplier?.supplierName}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">
                              {supplier?.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-5 py-4 hidden md:table-cell">
                        {/* <p className="text-xs text-gray-600">{supplier?.email}</p> */}
                        <p className="text-xs text-gray-400 mt-0.5">
                          {supplier?.phone}
                        </p>
                      </td>

                      {/* Address */}
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                          {supplier?.address}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                            supplier?.status === "active"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-gray-50 text-gray-500 border-gray-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${supplier?.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
                          />
                          {supplier?.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Delete */}
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setDeleteTarget(s)}
                          className="p-1.5 rounded-md hover:bg-red-50 text-gray-300 hover:text-red-500 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {suppliers?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-14 text-center">
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <Building2 className="w-8 h-8 text-gray-200" />
                        <p className="text-sm">No suppliers found.</p>
                        <Link
                          to="/vendor/suppliers/add"
                          className="text-xs text-secondary hover:underline"
                        >
                          + Add supplier
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
      </div>
    </>
  );
};

export default Suppliers;
