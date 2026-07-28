import { useState } from "react";
import { Plus, Search, SlidersHorizontal, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

const categoriesData = [
  { id: 1, name: "Electronics", description: "Consumer devices and components",  created: "Oct 24, 2023", status: "Active" },
  { id: 2, name: "Office Furniture", description: "Desks, chairs, and storage solutions", created: "Nov 12, 2023", status: "Active" },
  { id: 3, name: "Packaging Materials", description: "Boxes, tape, and shipping supplies", created: "Jan 05, 2024", status: "Inactive" },
  { id: 4, name: "Audio Equipment", description: "Speakers, headphones, and mixers", created: "Feb 18, 2024", status: "Active" },
];

// Generate a consistent colour pair from the first letter
const letterColor = (name) => {
  const palette = [
    "bg-indigo-100 text-indigo-600",
    "bg-green-100 text-green-700",
    "bg-amber-100 text-amber-700",
    "bg-purple-100 text-purple-600",
    "bg-red-100 text-red-600",
    "bg-blue-100 text-blue-600",
    "bg-pink-100 text-pink-600",
  ];
  return palette[name.charCodeAt(0) % palette.length];
};

const Categories = () => {
  const [search, setSearch]         = useState("");
  const [categories, setCategories] = useState(categoriesData);

  const filtered = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) =>
    setCategories((prev) => prev.filter((c) => c.id !== id));

  const toggleStatus = (id) =>
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" }
          : c
      )
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Categories</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage product classifications for vendor assignments.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Table card */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">

        {/* Filter bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Filter categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
          </div>
          <button className="ml-auto p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3 font-medium">Category Name</th>
                <th className="px-5 py-3 font-medium hidden md:table-cell">Description</th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell">Created Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                  {/* Name + letter avatar */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${letterColor(c.name)}`}>
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-primary">{c.name}</span>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-5 py-4 text-gray-500 hidden md:table-cell max-w-xs truncate">
                    {c.description}
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4 font-mono text-xs text-gray-500 hidden sm:table-cell">
                    {c.created}
                  </td>

                  {/* Status — clickable to toggle */}
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleStatus(c.id)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold border cursor-pointer transition-colors ${
                        c.status === "Active"
                          ? "border-secondary/40 bg-green-50 text-secondary hover:bg-green-100"
                          : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {c.status}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right">
                    <button
                      
                      className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                      title="Delete category"
                    >
                      {c?.status === "active" ? "Inactivate" : "Active"}
                    </button>
                  </td>

                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-gray-400">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 py-4 border-t border-gray-100 gap-3">
          <p className="text-xs text-gray-400">
            Showing 1 to {filtered.length} of {filtered.length} entries
          </p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 cursor-pointer">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium bg-secondary text-white cursor-pointer">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 cursor-pointer">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
