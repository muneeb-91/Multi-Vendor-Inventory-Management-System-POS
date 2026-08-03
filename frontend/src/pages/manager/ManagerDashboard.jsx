import { Link } from "react-router-dom";
import {
  Package,
  AlertTriangle,
  Truck,
  TrendingUp,
  AlertCircle,
  Clock,
  ShoppingCart,
  Package2,
  Cpu,
  Cable,
  Wifi,
  Search,
  Bell,
  HelpCircle,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { managerRecentOrders, criticalStock, leftColor } from "../../data";

const ManagerDashboard = () => {
  return (
    <div className="-m-6">
      {/* Page body */}
      <div className="p-6 space-y-5">

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Total Products</p>
              <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Package className="w-4 h-4 text-indigo-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-primary">4,285</p>
            <p className="text-xs text-secondary flex items-center gap-1 mt-2 font-medium">
              <TrendingUp className="w-3 h-3" /> +12% this month
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Low Stock Alerts</p>
              <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-primary">24</p>
            <p className="text-xs text-red-500 flex items-center gap-1 mt-2 font-medium">
              <AlertCircle className="w-3 h-3" /> Requires attention
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Pending Orders</p>
              <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                <Truck className="w-4 h-4 text-purple-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-primary">156</p>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-2">
              <Clock className="w-3 h-3" /> 42 due today
            </p>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Recent Orders — 2 cols */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-primary">Recent Orders</h2>
              <Link to="/manager/orders" className="text-sm text-secondary hover:underline font-medium">
                View All →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                    <th className="px-5 py-3 font-medium">Order ID</th>
                    <th className="px-5 py-3 font-medium hidden sm:table-cell">Customer</th>
                    <th className="px-5 py-3 font-medium hidden md:table-cell">Date</th>
                    <th className="px-5 py-3 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {managerRecentOrders.map((o) => (
                    <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 font-mono text-xs text-gray-500">{o.id}</td>
                      <td className="px-5 py-3.5 font-medium text-primary hidden sm:table-cell">{o.customer}</td>
                      <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell">{o.date}</td>
                      <td className="px-5 py-3.5 text-right font-semibold text-primary">{o.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">

            {/* Quick Actions */}
            <div className="bg-primary rounded-xl p-5">
              <h2 className="font-semibold text-white mb-3">Quick Actions</h2>
              <div className="space-y-2">
                <Link
                  to="/manager/orders/create"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/15 transition-colors cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <ShoppingCart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Create Order</p>
                    <p className="text-xs text-gray-400">Draft a new manual order</p>
                  </div>
                </Link>
                <Link
                  to="/manager/products"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/15 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                    <Package2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">View Products</p>
                    <p className="text-xs text-gray-400">Manage catalog</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Critical Stock */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <h2 className="font-semibold text-primary">Critical Stock</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {criticalStock.map((item) => (
                  <div key={item.sku} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary truncate">{item.name}</p>
                      <p className="text-xs font-mono text-gray-400">SKU: {item.sku}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-sm font-bold ${leftColor(item.left)}`}>
                        {item.left} left
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-gray-100">
                <Link
                  to="/manager/products"
                  className="block w-full text-center text-sm text-secondary hover:underline font-medium"
                >
                  View Inventory Report
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
