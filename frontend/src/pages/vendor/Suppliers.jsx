import { useState } from "react";
import {
  Plus,
  Trash2,
  Search,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  X,
  Building2,
  Mail,
  Phone,
  MapPin,
  Package,
  Save,
} from "lucide-react";

// ── Dummy data ─────────────────────────────────────────────────────────────────
const initialSuppliers = [
  {
    id: 1,
    name: "TechCorp Manufacturing Inc.",
    email: "procurement@techcorp.io",
    phone: "+1 (408) 555-0100",
    location: "San Jose, CA",
    category: "Electronics",
    products: 142,
    status: "Active",
  },
  {
    id: 2,
    name: "Herman Miller Inc.",
    email: "trade@hermanmiller.com",
    phone: "+1 (616) 654-3000",
    location: "Zeeland, MI",
    category: "Furniture",
    products: 38,
    status: "Active",
  },
  {
    id: 3,
    name: "HP Enterprise Solutions",
    email: "partners@hp.com",
    phone: "+1 (650) 857-1501",
    location: "Palo Alto, CA",
    category: "Office Supplies",
    products: 76,
    status: "Active",
  },
  {
    id: 4,
    name: "Sony Audio Systems",
    email: "b2b@sony.com",
    phone: "+1 (212) 833-8000",
    location: "New York, NY",
    category: "Audio",
    products: 29,
    status: "Inactive",
  },
];

// ── Colour palette for letter avatars ─────────────────────────────────────────
const avatarColor = (name) => {
  const palette = [
    { bg: "bg-indigo-100", text: "text-indigo-600" },
    { bg: "bg-green-100",  text: "text-green-700"  },
    { bg: "bg-amber-100",  text: "text-amber-700"  },
    { bg: "bg-purple-100", text: "text-purple-600" },
    { bg: "bg-red-100",    text: "text-red-600"    },
    { bg: "bg-blue-100",   text: "text-blue-600"   },
    { bg: "bg-pink-100",   text: "text-pink-600"   },
    { bg: "bg-teal-100",   text: "text-teal-700"   },
  ];
  return palette[name.charCodeAt(0) % palette.length];
};

const statusStyle = (s) =>
  s === "Active"
    ? "bg-green-50 text-green-700 border-green-200"
    : "bg-gray-50 text-gray-500 border-gray-200";

// ── Add Supplier Modal ────────────────────────────────────────────────────────
const EMPTY_FORM = {
  name: "", email: "", phone: "", location: "", category: "", products: 0,
};

const AddSupplierModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())     e.name     = "Required";
    if (!form.email.trim())    e.email    = "Required";
    if (!form.category.trim()) e.category = "Required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onAdd({ ...form, id: Date.now(), status: "Active", products: Number(form.products) || 0 });
    onClose();
  };

  const Field = ({ label, name, placeholder, icon: Icon, required, type = "text" }) => (
    <div>
      <label className="block text-sm font-medium text-primary mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        )}
        <input
          name={name}
          type={type}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full ${Icon ? "pl-9" : "pl-3"} pr-3 py-2.5 rounded-lg border text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all ${
            errors[name] ? "border-red-300 bg-red-50" : "border-gray-200"
          }`}
        />
      </div>
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-primary">Add New Supplier</h2>
            <p className="text-xs text-gray-500 mt-0.5">Fill in the supplier's details below.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <Field
            label="Supplier Name" name="name"
            placeholder="e.g. TechCorp Manufacturing" icon={Building2} required
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Email" name="email" type="email"
              placeholder="contact@supplier.com" icon={Mail} required
            />
            <Field
              label="Phone" name="phone"
              placeholder="+1 (555) 000-0000" icon={Phone}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Location" name="location"
              placeholder="City, State" icon={MapPin}
            />
            <Field
              label="Category" name="category"
              placeholder="e.g. Electronics" icon={Package} required
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-secondary hover:bg-secondary/90 text-white text-sm font-semibold cursor-pointer transition-colors"
          >
            <Save className="w-4 h-4" /> Add Supplier
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Delete Confirmation ───────────────────────────────────────────────────────
const DeleteConfirmModal = ({ supplier, onClose, onConfirm }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm z-10 p-6 space-y-4">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto">
        <Trash2 className="w-5 h-5 text-red-500" />
      </div>
      <div className="text-center">
        <h3 className="font-bold text-primary text-lg">Remove Supplier?</h3>
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-medium text-primary">{supplier.name}</span> will be permanently
          removed from your supplier list.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold cursor-pointer transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const Suppliers = () => {
  const [suppliers, setSuppliers]       = useState(initialSuppliers);
  const [search, setSearch]             = useState("");
  const [showAdd, setShowAdd]           = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (supplier) =>
    setSuppliers((prev) => [supplier, ...prev]);

  const handleDelete = () => {
    setSuppliers((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const activeCount   = suppliers.filter((s) => s.status === "Active").length;
  const totalProducts = suppliers.reduce((sum, s) => sum + s.products, 0);

  return (
    <>
      {showAdd && (
        <AddSupplierModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />
      )}
      {deleteTarget && (
        <DeleteConfirmModal
          supplier={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      <div className="space-y-6">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-primary">Suppliers</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage your product supply chain and vendor contacts.
            </p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="self-start sm:self-auto flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-4 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Supplier
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Suppliers",   value: suppliers.length,         icon: Building2, bg: "bg-indigo-50", ic: "text-indigo-500" },
            { label: "Active",            value: activeCount,              icon: TrendingUp, bg: "bg-green-50", ic: "text-secondary"  },
            { label: "Total Products",    value: totalProducts,            icon: Package,   bg: "bg-amber-50",  ic: "text-amber-500"  },
            { label: "Categories",        value: new Set(suppliers.map(s => s.category)).size, icon: Building2, bg: "bg-purple-50", ic: "text-purple-500" },
          ].map((s) => (
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

        {/* ── Table Card ── */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">

          {/* Search bar */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search suppliers, categories..."
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
                  <th className="px-5 py-3 font-medium hidden lg:table-cell">Location</th>
                  <th className="px-5 py-3 font-medium text-right hidden sm:table-cell">Products</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => {
                  const { bg, text } = avatarColor(s.name);
                  return (
                    <tr
                      key={s.id}
                      className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors"
                    >
                      {/* Supplier name + letter avatar */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${bg} ${text}`}
                          >
                            {s.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-primary leading-tight">{s.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">{s.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-5 py-4 hidden md:table-cell">
                        <p className="text-gray-600 text-xs">{s.email}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{s.phone}</p>
                      </td>

                      {/* Location */}
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                          <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                          {s.location}
                        </div>
                      </td>

                      {/* Products count */}
                      <td className="px-5 py-4 text-right hidden sm:table-cell">
                        <div className="flex items-center justify-end gap-1 text-gray-700">
                          <Package className="w-3.5 h-3.5 text-gray-400" />
                          <span className="font-medium">{s.products}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyle(s.status)}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              s.status === "Active" ? "bg-green-500" : "bg-gray-400"
                            }`}
                          />
                          {s.status}
                        </span>
                      </td>

                      {/* Delete */}
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setDeleteTarget(s)}
                          className="p-1.5 rounded-md hover:bg-red-50 text-gray-300 hover:text-red-500 cursor-pointer transition-colors"
                          title="Remove supplier"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-14 text-center">
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <Building2 className="w-8 h-8 text-gray-200" />
                        <p className="text-sm">No suppliers found.</p>
                        <button
                          onClick={() => setShowAdd(true)}
                          className="mt-1 text-xs text-secondary hover:underline cursor-pointer"
                        >
                          + Add your first supplier
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination footer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 py-4 border-t border-gray-100 gap-3">
            <p className="text-xs text-gray-400">
              Showing 1 to {filtered.length} of {suppliers.length} suppliers
            </p>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 cursor-pointer">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary text-white text-xs font-semibold">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Suppliers;
