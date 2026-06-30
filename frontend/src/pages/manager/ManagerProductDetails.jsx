import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  Info,
  Warehouse,
  Truck,
  TrendingUp,
  Clock,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

// ── Dummy data ─────────────────────────────────────────────────────────────────
const product = {
  name:        "Quantum Pro X1 Server Blade",
  status:      "Active",
  sku:         "SKU-99201-AX",
  category:    "Enterprise Electronics / Servers",
  basePrice:   "$2,499.00",
  weight:      "14.2 lbs (6.4 kg)",
  description:
    "High-performance 1U rackmount server blade optimised for virtualisation and dense computing environments. Features dual-socket architecture supporting the latest generation processors, redundant platinum-level power supplies, and advanced thermal management.",
  image: null, // no real image — we'll use a placeholder
};

const inventoryValue = 514794;
const inventoryChange = "+2.4%";

const stockLocations = [
  { location: "Main Warehouse (NYC)",   available: 142, reserved: 12, status: "In Stock"  },
  { location: "West Coast Dist. (LA)",  available: 8,   reserved: 2,  status: "Low Stock" },
  { location: "European Hub (FRA)",     available: 56,  reserved: 0,  status: "In Stock"  },
];

const supplier = {
  primaryVendor:        "TechCorp Manufacturing Inc.",
  leadTime:             "14 – 21 Days",
  unitCost:             "$1,850.00",
  reorderThreshold:     50,
  currentStock:         206, // sum of available
};

const recentActivity = [
  { label: "Last Restocked",    value: "Oct 18, 2024",  icon: Warehouse  },
  { label: "Last Ordered",      value: "Oct 22, 2024",  icon: Truck      },
  { label: "Avg. Monthly Sales",value: "38 units",      icon: TrendingUp },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
const stockStyle = (s) =>
  s === "In Stock"  ? "bg-green-100 text-green-700"  :
  s === "Low Stock" ? "bg-red-100 text-red-600"      :
                      "bg-gray-100 text-gray-500";

const fmt = (n) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0 });

const ManagerProductDetails = () => {
  // reorder bar — percentage of threshold filled
  const reorderPct = Math.min((supplier.currentStock / (supplier.reorderThreshold * 4)) * 100, 100);

  return (
    <div className="space-y-5">

      {/* Back */}
      <div className="flex items-center gap-2">
        <Link
          to="/vendor/products"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-primary">{product.name}</h1>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
            {product.status}
          </span>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-primary hover:bg-gray-50 cursor-pointer transition-colors">
            <Pencil className="w-3.5 h-3.5" /> Edit Product
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── LEFT: 2 col span ─────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Product Information card */}
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-secondary" />
                <h2 className="font-semibold text-primary">Product Information</h2>
              </div>
            </div>
            <div className="p-5">
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Image placeholder */}
                <div className="w-full sm:w-48 h-44 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden border border-gray-100">
                  <div className="flex flex-col items-center gap-2 text-gray-300">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="m21 15-5-5L5 21"/>
                    </svg>
                    <span className="text-xs">Product Image</span>
                  </div>
                </div>

                {/* Details grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "SKU",        value: product.sku        },
                    { label: "Category",   value: product.category   },
                    { label: "Base Price", value: product.basePrice  },
                    { label: "Weight",     value: product.weight     },
                  ].map((f) => (
                    <div key={f.label}>
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{f.label}</p>
                      <p className="text-sm font-medium text-primary">{f.value}</p>
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Description</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stock Information card */}
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
              <Warehouse className="w-4 h-4 text-secondary" />
              <h2 className="font-semibold text-primary">Stock Information</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                    <th className="px-5 py-3 font-medium">Location</th>
                    <th className="px-5 py-3 font-medium text-right">Available</th>
                    <th className="px-5 py-3 font-medium text-right">Reserved</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stockLocations.map((s) => (
                    <tr key={s.location} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-primary">{s.location}</td>
                      <td className="px-5 py-3.5 text-right text-gray-700">{s.available}</td>
                      <td className="px-5 py-3.5 text-right text-gray-500">{s.reserved}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${stockStyle(s.status)}`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Low stock warning */}
            <div className="flex items-center gap-2 px-5 py-3 border-t border-gray-100 bg-red-50">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <p className="text-xs text-red-600">
                West Coast Dist. is running low. Consider restocking soon.
              </p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h2 className="font-semibold text-primary mb-4">Recent Activity</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recentActivity.map((a) => (
                <div key={a.label} className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-9 h-9 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0">
                    <a.icon className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{a.label}</p>
                    <p className="text-sm font-semibold text-primary">{a.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── RIGHT: 1 col ─────────────────────────────────────────── */}
        <div className="space-y-5">

          {/* Total Inventory Value */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Total Inventory Value
            </p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-primary">{fmt(inventoryValue)}</p>
              <span className="flex items-center gap-1 text-xs font-semibold text-secondary bg-green-50 px-2 py-1 rounded-full mb-1">
                <TrendingUp className="w-3 h-3" />
                {inventoryChange}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Based on {supplier.currentStock} units × {supplier.unitCost}
            </p>
          </div>

          {/* Supplier Information */}
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
              <Truck className="w-4 h-4 text-secondary" />
              <h2 className="font-semibold text-primary">Supplier Info</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Primary Vendor</p>
                <p className="text-sm font-semibold text-primary">{supplier.primaryVendor}</p>
                <button className="text-xs text-secondary hover:underline mt-0.5 cursor-pointer">
                  View Vendor Profile
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Lead Time</p>
                  <p className="text-sm font-medium text-primary">{supplier.leadTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Unit Cost</p>
                  <p className="text-sm font-medium text-primary">{supplier.unitCost}</p>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Auto-Reorder Threshold */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs text-gray-400">Auto-Reorder Threshold</p>
                  <span className="text-xs font-semibold text-primary">{supplier.reorderThreshold} Units</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full transition-all"
                    style={{ width: `${reorderPct}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {supplier.currentStock} units in stock across all locations
                </p>
              </div>
            </div>
          </div>

          {/* Quick price summary */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-3">
            <h2 className="font-semibold text-primary">Price Summary</h2>
            <hr className="border-gray-100" />
            {[
              { label: "Base Price",   value: product.basePrice },
              { label: "Unit Cost",    value: supplier.unitCost },
              { label: "Gross Margin", value: "$649.00 (26%)"   },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{r.label}</span>
                <span className="font-semibold text-primary">{r.value}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManagerProductDetails;
