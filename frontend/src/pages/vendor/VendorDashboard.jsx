import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  HelpCircle,
  Menu,
  Package,
  AlertTriangle,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Plus,
  ClipboardList,
  UserPlus,
  MoreVertical,
  Search,
} from "lucide-react";
import { recentProducts, recentOrders, quickActions, vendorDashboardCards } from "../../data";

const VendorDashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="-m-6">
      <div className="p-6 space-y-6">

        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold text-primary">Dashboard Overview</h1>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {vendorDashboardCards.map((s) => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs text-gray-400 uppercase tracking-wide">{s.label}</p>
                <div className={`w-9 h-9 rounded-lg ${s.iconBg} flex items-center justify-center shrink-0`}>
                  <s.icon className={`w-4 h-4 ${s.iconColor}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              {s.badge && (
                <p className={`text-xs mt-1.5 flex items-center gap-1 font-medium ${s.badgeOk ? "text-secondary" : "text-red-500"}`}>
                  {s.badgeOk
                    ? <TrendingUp className="w-3 h-3" />
                    : <AlertCircle className="w-3 h-3" />}
                  {s.badge}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Left — Quick Actions + Recent Products */}
          <div className="lg:col-span-2 space-y-5">

            {/* Quick Actions */}
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <h2 className="font-semibold text-primary mb-4 flex items-center gap-2">
                <span className="text-secondary">⚡</span> Quick Actions
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {quickActions.map(({ label, icon: Icon, to }) => (
                  <Link
                    key={label}
                    to={to}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-secondary/30 hover:bg-secondary/5 transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-secondary/10 flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5 text-gray-500 group-hover:text-secondary transition-colors" />
                    </div>
                    <span className="text-xs font-medium text-gray-600 group-hover:text-primary text-center">
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Products */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-primary">Recent Products</h2>
                <Link to="/vendor/products" className="text-sm text-secondary hover:underline font-medium">
                  View All →
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100 bg-gray-50">
                      <th className="px-5 py-3 font-medium">Product</th>
                      <th className="px-5 py-3 font-medium hidden sm:table-cell">SKU</th>
                      <th className="px-5 py-3 font-medium">Price</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProducts.map((p) => (
                      <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                              <Package className="w-4 h-4 text-gray-400" />
                            </div>
                            <span className="font-medium text-primary text-sm">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 font-mono text-xs text-gray-400 hidden sm:table-cell">
                          {p.sku}
                        </td>
                        <td className="px-5 py-3.5 text-gray-700">{p.price}</td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                            p.low
                              ? "bg-red-50 text-red-600"
                              : "bg-indigo-50 text-indigo-600"
                          }`}>
                            {p.low ? `Low Stock (${p.stock})` : `In Stock (${p.stock})`}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right — Recent Orders */}
          <div className="bg-white border border-gray-100 rounded-xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-primary">Recent Orders</h2>
              <button className="p-1 rounded-md hover:bg-gray-100 text-gray-400 cursor-pointer">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 divide-y divide-gray-50">
              {recentOrders.map((o) => (
                <div key={o.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${o.color}`}>
                      {o.initials}
                    </div>
                    <div>
                      <p className="text-xs font-mono text-gray-500">{o.id}</p>
                      <p className="text-sm font-medium text-primary">{o.vendor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${o.highlight ? "text-secondary" : "text-primary"}`}>
                      {o.amount}
                    </p>
                    <p className="text-xs text-gray-400">{o.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-5 py-4 border-t border-gray-100">
              <Link
                to="/vendor/orders"
                className="block w-full text-center py-2 rounded-lg border border-gray-200 text-sm font-medium text-primary hover:bg-gray-50 transition-colors"
              >
                View All Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
