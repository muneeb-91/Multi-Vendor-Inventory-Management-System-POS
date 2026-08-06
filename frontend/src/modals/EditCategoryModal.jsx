import { useState, useEffect } from "react";
import { X, Tag, FileText, Save } from "lucide-react";
import { validateEditCategory } from "../utils/validations";

// Props:
// category   — the category object being edited { _id, categoryName, description }
// onClose    — function to close the modal
// onSave     — function called with updated { categoryName, description }

const EditCategoryModal = ({ category, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    description:  "",
  });
  const [errors, setErrors] = useState({});

  // Pre-fill fields when modal opens
  useEffect(() => {
    if (category) {
      setFormData({
        categoryName: category.categoryName || "",
        description:  category.description  || "",
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field as user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };


  const handleSubmit = () => {
    const err = validateEditCategory(formData);
    if (Object.keys(err).length) { setErrors(err); return; }
    onSave({ categoryName: formData.categoryName.trim(), description: formData.description.trim() });
    onClose();
  };

  const inputClass = (field) =>
    `w-full px-3 py-2.5 border rounded-lg text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all ${
      errors[field] ? "border-red-300 bg-red-50" : "border-gray-200"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-secondary" />
            <h2 className="text-base font-semibold text-primary">Edit Category</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">
              Category Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              placeholder="e.g. Electronics"
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
            <label className="block text-sm font-medium text-primary mb-1.5">
              Description <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-3.5 h-3.5 text-gray-400" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Short description of this category…"
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

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-5 py-2 bg-secondary hover:bg-secondary/90 text-white text-sm font-semibold rounded-lg cursor-pointer transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;