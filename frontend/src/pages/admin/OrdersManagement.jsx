import { useState } from "react";
import {
  Download,
  Search,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

const ordersData = [
  {
    id: "ORD-2024-0091",
    vendor: "Nexus Electronics",
    initials: "NE",
    avatarColor: "bg-indigo-50 text-indigo-600",
    items: 24,
    total: 12450.0,
    date: "Oct 24, 2024",
    time: "02:14 PM",
  },
  {
    id: "ORD-2024-0088",
    vendor: "Apex Supply Co.",
    initials: "AS",
    avatarColor: "bg-amber-50 text-amber-700",
    items: 8,
    total: 3200.0,
    date: "Oct 24, 2024",
    time: "11:42 AM",
  },
  {
    id: "ORD-2024-0085",
    vendor: "Oasis Lifestyle",
    initials: "OL",
    avatarColor: "bg-green-50 text-green-700",
    items: 41,
    total: 28900.0,
    date: "Oct 23, 2024",
    time: "04:05 PM",
  },
  {
    id: "ORD-2024-0079",
    vendor: "Vanguard Gear",
    initials: "VG",
    avatarColor: "bg-red-50 text-red-600",
    items: 5,
    total: 870.5,
    date: "Oct 22, 2024",
    time: "09:30 AM",
  },
  {
    id: "ORD-2024-0072",
    vendor: "Lumina Goods",
    initials: "LG",
    avatarColor: "bg-blue-50 text-blue-600",
    items: 13,
    total: 5640.0,
    date: "Oct 21, 2024",
    time: "01:18 PM",
  },
];

const OrdersManagement = () => {
  const [search, setSearch] = useState("");

  const filtered = ordersData.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.vendor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Orders</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            A log of all completed orders across vendors.
          </p>
        </div>
        <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-primary hover:bg-gray-50 cursor-pointer self-start sm:self-auto">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-secondary" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-secondary bg-green-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" /> +9.2%
            </span>
          </div>
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-primary mt-1">3,842</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-secondary bg-green-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" /> +14.1%
            </span>
          </div>
          <p className="text-sm text-gray-500">Revenue This Month</p>
          <p className="text-2xl font-bold text-primary mt-1">$284K</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-500" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-secondary bg-green-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" /> +3.8%
            </span>
          </div>
          <p className="text-sm text-gray-500">Avg. Order Value</p>
          <p className="text-2xl font-bold text-primary mt-1">$1,240</p>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">

        {/* Search */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID or vendor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3 font-medium">Order ID</th>
                <th className="px-5 py-3 font-medium">Vendor</th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell text-right">Items</th>
                <th className="px-5 py-3 font-medium text-right">Total</th>
                <th className="px-5 py-3 font-medium hidden md:table-cell">Date & Time</th>
                <th className="px-5 py-3 font-medium text-right">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                  <td className="px-5 py-4">
                    <span className="font-mono text-xs text-gray-500">{o.id}</span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${o.avatarColor}`}>
                        {o.initials}
                      </div>
                      <span className="font-medium text-primary whitespace-nowrap">{o.vendor}</span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-gray-600 hidden sm:table-cell text-right">
                    {o.items}
                  </td>

                  <td className="px-5 py-4 font-semibold text-primary text-right">
                    ${o.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </td>

                  <td className="px-5 py-4 hidden md:table-cell">
                    <p className="text-gray-700">{o.date}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{o.time}</p>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      title="View Receipt"
                      className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 cursor-pointer inline-flex"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>

                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-400">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 py-4 border-t border-gray-100 gap-3">
          <p className="text-xs text-gray-400">
            Showing 1 to {filtered.length} of 3,842 orders
          </p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 cursor-pointer">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {["1", "2", "3", "...", "25"].map((p, i) => (
              <button
                key={i}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  p === "1"
                    ? "bg-secondary text-white"
                    : p === "..."
                    ? "text-gray-400"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 cursor-pointer">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrdersManagement;
