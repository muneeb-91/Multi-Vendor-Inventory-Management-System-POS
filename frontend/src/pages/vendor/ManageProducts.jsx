import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  MoreVertical,
  Laptop,
  Printer,
  Headphones,
  Armchair,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const CATEGORY_ICONS = {
  Electronics: Laptop,
  Furniture: Armchair,
  "Office Supplies": Printer,
  Audio: Headphones,
};

const productsData = [
  { id: 1, name: "ThinkPad X1 Carbon Gen 10", sku: "SKU-8472-LC", category: "Electronics",     supplier: "TechData Corp",    stock: 142, stockLevel: "high", price: "$1,499.00" },
  { id: 2, name: "Ergonomic Office Chair V2",  sku: "SKU-9921-FC", category: "Furniture",       supplier: "Herman Miller Inc", stock: 8,   stockLevel: "low",  price: "$845.00"   },
  { id: 3, name: "LaserJet Pro MFP M428fdw",  sku: "SKU-3324-HP", category: "Office Supplies", supplier: "HP Enterprise",     stock: 24,  stockLevel: "mid",  price: "$429.99"   },
  { id: 4, name: "Noise Cancelling Pro",       sku: "SKU-7751-S0", category: "Electronics",     supplier: "Sony Audio",        stock: 89,  stockLevel: "high", price: "$348.00"   },
];

const stockDot = (level) => {
  if (level === "high") return "bg-green-500";
  if (level === "low")  return "bg-red-500";
  return "bg-amber-400";
};

const stockText = (level, count) => {
  if (level === "low") return `text-red-600 font-semibold`;
  return "text-gray-700";
};

const categoryPill = "bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md text-xs font-medium";

const ManageProducts = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);
  const [products, setProducts] = useState(productsData);

  const categories = ["All", ...new Set(productsData.map((p) => p.category))];

  const filtered = products.filter(
    (p) => categoryFilter === "All" || p.category === categoryFilter
  );

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setOpenMenu(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage vendor products, pricing, and stock levels.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 cursor-pointer bg-white"
          >
            {categories.map((c) => (
              <option key={c}>{c === "All" ? "All Categories" : c}</option>
            ))}
          </select>
          <Link to={'/vendor/products/add'} className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors">
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3 font-medium">Product Name</th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell">Category</th>
                <th className="px-5 py-3 font-medium hidden lg:table-cell">Supplier</th>
                <th className="px-5 py-3 font-medium text-right">Stock</th>
                <th className="px-5 py-3 font-medium text-right">Selling Price</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const Icon = CATEGORY_ICONS[p.category] ?? Package;
                return (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                    {/* Product */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-indigo-500" />
                        </div>
                        <div>
                          <p className="font-medium text-primary">{p.name}</p>
                          <p className="text-xs font-mono text-gray-400 mt-0.5">{p.sku}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className={categoryPill}>{p.category}</span>
                    </td>

                    {/* Supplier */}
                    <td className="px-5 py-4 text-gray-600 hidden lg:table-cell">
                      {p.supplier}
                    </td>

                    {/* Stock */}
                    <td className="px-5 py-4 text-right">
                      <span className={`flex items-center justify-end gap-1.5 ${stockText(p.stockLevel, p.stock)}`}>
                        <span className={`w-2 h-2 rounded-full shrink-0 ${stockDot(p.stockLevel)}`} />
                        {p.stock}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4 text-right font-semibold text-primary">
                      {p.price}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setOpenMenu(openMenu === p.id ? null : p.id)}
                          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {openMenu === p.id && (
                          <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-100 rounded-lg shadow-lg z-10 py-1">
                            <button
                              onClick={() => setOpenMenu(null)}
                              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-400">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 py-4 border-t border-gray-100 gap-3">
          <p className="text-xs text-gray-400">
            Showing 1 to {filtered.length} of 1,248 results
          </p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 cursor-pointer">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {["1", "2", "3", "...", ].map((p, i) => (
              <button key={i} className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                p === "1" ? "bg-secondary text-white" : p === "..." ? "text-gray-400" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}>
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

export default ManageProducts;
