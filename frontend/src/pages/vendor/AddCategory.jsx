import { useState } from "react";
import { ArrowLeft, Tag, FileText, ToggleLeft, ToggleRight } from "lucide-react";
import { Link } from "react-router-dom";
import { validateCategory } from "../../utils/validations";

const AddCategory = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    categoryName: "",
    description:  "",
    status:       "active",
  });

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const toggleStatus = () =>
    setFormData((prev) => ({
      ...prev,
      status: prev.status === "active" ? "inactive" : "active",
    }));

  const handleSubmit = () => {
     const e = validateCategory();

      if (Object.keys(e).length) {
    setErrors(e);
    return;
  }
  setErrors({});
  // dispatch(addCategory(formData))
  console.log("Submit:", formData);
  };

  const inputClass = (field) =>
    `w-full px-3 py-2.5 border rounded-lg text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all ${
      errors[field] ? "border-red-300 bg-red-50" : "border-gray-200"
    }`;

  const labelClass = "block text-sm font-medium text-primary mb-1.5";

  return (
    <div className="space-y-5">

      {/* Back */}
      <Link
        to="/vendor/categories"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Categories
      </Link>

      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Add Category</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Create a new product category for your inventory.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-6">

        {/* ── Category Details ── */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Tag className="w-4 h-4 text-secondary" />
            <h2 className="text-base font-semibold text-primary">Category Details</h2>
          </div>

          <div className="space-y-4">

            {/* Category Name */}
            <div>
              <label className={labelClass}>
                Category Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="categoryName"
                placeholder="e.g. Electronics"
                value={formData.categoryName}
                onChange={handleChange}
                maxLength={25}
                className={inputClass("categoryName")}
              />
              <div className="flex items-center justify-between mt-1">
                {errors.categoryName
                  ? <p className="text-xs text-red-500">{errors.categoryName}</p>
                  : <span />
                }
                <p className={`text-xs ml-auto ${
                  formData.categoryName.length > 22 ? "text-red-400" : "text-gray-400"
                }`}>
                  {formData.categoryName.length}/25
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>
                Description <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-3.5 h-3.5 text-gray-400" />
                <textarea
                  name="description"
                  placeholder="Short description of this category…"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={45}
                  rows={3}
                  className={`${inputClass("description")} pl-8 resize-none`}
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                {errors.description
                  ? <p className="text-xs text-red-500">{errors.description}</p>
                  : <p className="text-xs text-gray-400">Between 5 and 45 characters.</p>
                }
                <p className={`text-xs ml-auto ${
                  formData.description.length > 40 ? "text-red-400" : "text-gray-400"
                }`}>
                  {formData.description.length}/45
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-6" />

        {/* ── Status ── */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            {formData.status === "active"
              ? <ToggleRight className="w-4 h-4 text-secondary" />
              : <ToggleLeft  className="w-4 h-4 text-gray-400"   />
            }
            <h2 className="text-base font-semibold text-primary">Status</h2>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
            <div>
              <p className="text-sm font-medium text-primary">Category Status</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {formData.status === "active"
                  ? "This category is visible and available for products."
                  : "This category is hidden and unavailable for products."}
              </p>
            </div>

            {/* Toggle */}
            <button
              onClick={toggleStatus}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${
                formData.status === "active" ? "bg-secondary" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  formData.status === "active" ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Status badge preview */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-gray-400">Preview:</span>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
              formData.status === "active"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-gray-50 text-gray-500 border-gray-200"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                formData.status === "active" ? "bg-green-500" : "bg-gray-400"
              }`} />
              {formData.status === "active" ? "Active" : "Inactive"}
            </span>
          </div>
        </section>

        <hr className="border-gray-100 my-6" />

        {/* ── Actions ── */}
        <div className="flex items-center justify-end gap-3">
          <Link
            to="/vendor/categories"
            className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-5 py-2 bg-secondary hover:bg-secondary/90 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <Tag className="w-4 h-4" />
            Save Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
