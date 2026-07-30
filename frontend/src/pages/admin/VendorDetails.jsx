import { Mail, Phone, TrendingUp, Package, Truck, Pencil, MessageSquare } from "lucide-react";
import { vendor, topProducts, purchaseOrders } from "../../data";
import StockBar from "../../components/admin/Stockbar";

const statusStyle = (s) => {
  if (s === "Delivered") return "bg-green-100 text-green-700";
  if (s === "In Transit") return "bg-blue-100 text-blue-600";
  return "bg-gray-100 text-gray-500";
};

const VendorDetails = () => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-400">
        <span className="text-gray-500">Vendors</span> &rsaquo;{" "}
        <span className="text-primary font-medium">Vendor Details</span>
      </p>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-primary">{vendor.name}</h1>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
            {vendor.status}
          </span>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <button className="flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-lg text-sm font-medium text-primary hover:bg-gray-50 cursor-pointer">
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>
          <button className="flex items-center gap-2 bg-secondary text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-secondary/90 cursor-pointer transition-colors">
            <MessageSquare className="w-3.5 h-3.5" />
            Contact
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left column */}
        <div className="space-y-4">

          {/* Business Profile */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                <Package className="w-5 h-5 text-indigo-500" />
              </div>
              <h2 className="font-semibold text-primary">Business Profile</h2>
            </div>
            <hr className="border-gray-100" />
            {[
              { label: "Vendor ID", value: vendor.vendorId },
              { label: "Tax ID / EIN", value: vendor.taxId },
              { label: "Category", value: vendor.category },
              { label: "HQ Address", value: vendor.address },
            ].map((f) => (
              <div key={f.label}>
                <p className="text-xs text-gray-400 uppercase tracking-wide">{f.label}</p>
                <p className="text-sm text-primary mt-0.5 whitespace-pre-line">{f.value}</p>
              </div>
            ))}
          </div>

          {/* Primary Contact */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-4">
            <h2 className="font-semibold text-primary">Primary Contact</h2>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">RS</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">{vendor.contact.name}</p>
                <p className="text-xs text-gray-400">{vendor.contact.title}</p>
              </div>
            </div>
            <hr className="border-gray-100" />
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                {vendor.contact.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                {vendor.contact.phone}
              </div>
            </div>
          </div>
        </div>

        {/* Right column — 2 cols wide */}
        <div className="lg:col-span-2 space-y-5">

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <Package className="w-5 h-5 text-secondary" />
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-secondary">
                  <TrendingUp className="w-3 h-3" /> 12%
                </span>
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Active Products</p>
              <p className="text-2xl font-bold text-primary mt-1">
                1,204 <span className="text-sm font-normal text-gray-400">SKUs</span>
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-purple-500" />
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-secondary">
                  <TrendingUp className="w-3 h-3" /> 8.4%
                </span>
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Total Lifetime Orders</p>
              <p className="text-2xl font-bold text-primary mt-1">
                $3.2M <span className="text-sm font-normal text-gray-400">YTD</span>
              </p>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-primary">Top Products</h2>
              <button className="text-sm text-secondary hover:underline font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                    <th className="px-5 py-3 font-medium">SKU</th>
                    <th className="px-5 py-3 font-medium hidden sm:table-cell">Product Name</th>
                    <th className="px-5 py-3 font-medium text-right">Unit Cost</th>
                    <th className="px-5 py-3 font-medium text-right">Stock Level</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((p) => (
                    <tr key={p.sku} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 font-mono text-xs text-gray-500">{p.sku}</td>
                      <td className="px-5 py-3.5 font-medium text-primary hidden sm:table-cell">{p.name}</td>
                      <td className="px-5 py-3.5 text-right text-gray-700">{p.cost}</td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <StockBar level={p.stockLevel} />
                          <span className="text-gray-700 w-12 text-right">{p.stock}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Purchase Orders */}
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-primary">Recent Purchase Orders</h2>
              <button className="text-sm text-secondary hover:underline font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                    <th className="px-5 py-3 font-medium">PO Number</th>
                    <th className="px-5 py-3 font-medium hidden sm:table-cell">Date</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium text-right">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders.map((o) => (
                    <tr key={o.po} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 font-mono text-xs text-gray-600">{o.po}</td>
                      <td className="px-5 py-3.5 text-gray-500 hidden sm:table-cell">{o.date}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle(o.status)}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right font-medium text-primary">{o.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
