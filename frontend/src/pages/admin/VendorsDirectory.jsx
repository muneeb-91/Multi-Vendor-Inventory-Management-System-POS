import { useState } from "react";
import { MoreVertical, UserPlus, Download, SlidersHorizontal } from "lucide-react";
import { vendorsData, vendorsStatusStyle, vendorsStatusList, getActions, actionStyle } from "../../data"; 
import Pagination from "../../components/shared/Pagination";

const VendorsDirectory = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);
  const [vendors, setVendors] = useState(vendorsData);

  const filtered = vendors.filter((v) => {
    const matchSearch = v.shopName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleAction = (vendorId, action) => {
    setVendors((prev) =>
      prev.map((v) => {
        if (v.id !== vendorId) return v;
        if (action === "Suspend") return { ...v, status: "Suspended" };
        if (action === "Activate") return { ...v, status: "Active" };
        if (action === "Approve") return { ...v, status: "Active" };
        return v;
      }).filter((v) => !(v.id === vendorId && action === "Delete"))
    );
    setOpenMenu(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Vendors Directory</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage and monitor all registered marketplace vendors.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-secondary text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-secondary/90 cursor-pointer transition-colors self-start sm:self-auto">
          <UserPlus className="w-4 h-4" />
          Invite Vendor
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4 border-b border-gray-100">
          <div className="relative w-full sm:w-60">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Filter by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 cursor-pointer"
          >
            {vendorsStatusList.map((s) => (
              <option key={s}>{s === "All" ? "All Statuses" : s}</option>
            ))}
          </select>
          <div className="ml-auto flex gap-2">
            <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 cursor-pointer">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3 font-medium">Shop Name</th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell">Owner Name</th>
                <th className="px-5 py-3 font-medium hidden md:table-cell text-right">Products</th>
                <th className="px-5 py-3 font-medium hidden md:table-cell text-right">Orders</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">
                        {v.initial}
                      </div>
                      <span className="font-medium text-primary">{v.shopName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden sm:table-cell">{v.ownerName}</td>
                  <td className="px-5 py-4 text-gray-600 hidden md:table-cell text-right">
                    {v.products.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden md:table-cell text-right">
                    {v.orders.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${vendorsStatusStyle(v.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        v.status === "Active" ? "bg-green-500" :
                        v.status === "Suspended" ? "bg-red-500" : "bg-gray-400"
                      }`}></span>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setOpenMenu(openMenu === v.id ? null : v.id)}
                        className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {openMenu === v.id && (
                        <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-100 rounded-lg shadow-lg z-10 py-1">
                          {getActions(v.status).map((action) => (
                            <button
                              key={action}
                              onClick={() => handleAction(v.id, action)}
                              className={`w-full text-left px-3 py-2 text-sm transition-colors ${actionStyle(action)}`}
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-gray-400">
                    No vendors found.
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
  );
};

export default VendorsDirectory;
