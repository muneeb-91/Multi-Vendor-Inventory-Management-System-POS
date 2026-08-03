import { useState } from "react";
import { Plus, Trash2, Search, TrendingUp, ChevronLeft, ChevronRight, Building2, Package, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { suppliers, avatarColor, supplierStats } from "../../data";
import Pagination from "../../components/shared/Pagination";

// Delete confirmation modal
const DeleteModal = ({ supplier, onClose, onConfirm }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm z-10 p-6 space-y-4">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto">
        <Trash2 className="w-5 h-5 text-red-500" />
      </div>
      <div className="text-center">
        <h3 className="font-bold text-primary">Remove Supplier?</h3>
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-medium text-primary">{supplier.supplierName}</span> will be permanently removed.
        </p>
      </div>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
          Cancel
        </button>
        <button onClick={onConfirm} className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold cursor-pointer transition-colors">
          Remove
        </button>
      </div>
    </div>
  </div>
);

const Suppliers = () => {
  const [search, setSearch]             = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = suppliers.filter((s) =>
    s.supplierName.toLowerCase().includes(search.toLowerCase()) ||
    s.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = () => {
    setSuppliers((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <>
      {deleteTarget && (
        <DeleteModal
          supplier={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-primary">Suppliers</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage your product supply chain and vendor contacts.</p>
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
          {supplierStats.map((s) => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-400">{s.label}</p>
                <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`w-4 h-4 ${s.ic}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-primary">{s.value}</p>
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
            <span className="ml-auto text-xs text-gray-400 whitespace-nowrap hidden sm:block">
              {filtered.length} of {suppliers.length} suppliers
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                  <th className="px-5 py-3 font-medium">Supplier</th>
                  <th className="px-5 py-3 font-medium hidden md:table-cell">Contact</th>
                  <th className="px-5 py-3 font-medium hidden lg:table-cell">Address</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => {
                  const { bg, text } = avatarColor(s.supplierName);
                  return (
                    <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors">

                      {/* Name + avatar */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${bg} ${text}`}>
                            {s.supplierName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-primary leading-tight">{s.supplierName}</p>
                            <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">{s.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-5 py-4 hidden md:table-cell">
                        <p className="text-xs text-gray-600">{s.email}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{s.phone}</p>
                      </td>

                      {/* Address */}
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                          {s.address}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          s.status === "active"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-50 text-gray-500 border-gray-200"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.status === "active" ? "bg-green-500" : "bg-gray-400"}`} />
                          {s.status === "active" ? "Active" : "Inactive"}
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

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-14 text-center">
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <Building2 className="w-8 h-8 text-gray-200" />
                        <p className="text-sm">No suppliers found.</p>
                        <Link to="/vendor/suppliers/add" className="text-xs text-secondary hover:underline">
                          + Add your first supplier
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Suppliers;
