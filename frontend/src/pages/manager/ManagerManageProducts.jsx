import { useState } from "react";
import { Link } from "react-router-dom";
import { productsData, CATEGORY_ICONS, stockDot, stockText, categoryPill } from "../../data";
import Pagination from "../../components/shared/Pagination";

const ManagerManageProducts = () => {
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
        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 cursor-pointer bg-white"
          >
            {categories.map((c) => (
              <option key={c}>{c === "All" ? "All Categories" : c}</option>
            ))}
          </select>
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
        <Pagination />
      </div>
    </div>
  );
};

export default ManagerManageProducts;
