import { useState } from "react";
import { ArrowLeft, Info, Package } from "lucide-react";
import { Link } from "react-router-dom";

const AddNewProduct = () => {
  const [formData, setFormData] = useState({
    productName:   "",
    category:      "",
    supplier:      "",
    stockQuantity: "",
    sellingPrice:  "",
    purchaseDate:  "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const inputClass =
    "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all";

  const labelClass = "block text-sm font-medium text-primary mb-1.5";

  return (
    <div className="space-y-5">

      {/* Back */}
      <Link
        to="/vendor/products"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Inventory
      </Link>

      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Add New Product</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Enter the details for the new inventory item.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-6">

        {/* ── Basic Information ── */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Info className="w-4 h-4 text-secondary" />
            <h2 className="text-base font-semibold text-primary">Basic Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className={labelClass}>
                Product Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="productName"
                placeholder="e.g. Industrial Steel Widget"
                value={formData.productName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Category <span className="text-red-400">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`${inputClass} text-gray-600 cursor-pointer`}
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="furniture">Furniture</option>
                  <option value="office-supplies">Office Supplies</option>
                  <option value="audio">Audio</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Supplier</label>
                <select
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  className={`${inputClass} text-gray-600 cursor-pointer`}
                >
                  <option value="">Select supplier</option>
                  <option value="techcorp">TechCorp Manufacturing Inc.</option>
                  <option value="hermanmiller">Herman Miller Inc.</option>
                  <option value="hp">HP Enterprise</option>
                  <option value="sony">Sony Audio</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-6" />

        {/* ── Inventory & Pricing ── */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Package className="w-4 h-4 text-secondary" />
            <h2 className="text-base font-semibold text-primary">Inventory &amp; Pricing</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>
                Stock Quantity <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="stockQuantity"
                placeholder="0"
                value={formData.stockQuantity}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Selling Price <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  $
                </span>
                <input
                  type="number"
                  name="sellingPrice"
                  placeholder="0.00"
                  step="0.01"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  className={`${inputClass} pl-7`}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Purchase Date</label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                className={`${inputClass} text-gray-600`}
              />
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-6" />

        {/* ── Actions ── */}
        <div className="flex items-center justify-end gap-3">
          <Link
            to="/vendor/products"
            className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </Link>
          <button className="flex items-center gap-2 px-5 py-2 bg-secondary hover:bg-secondary/90 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer">
            <Package className="w-4 h-4" />
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
