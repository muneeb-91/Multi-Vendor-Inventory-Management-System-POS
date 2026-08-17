import { useState, useEffect } from "react";
import { X, Building2, Phone, Mail, MapPin, Save } from "lucide-react";
import { validateEditSupplier } from "../utils/validations";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  updateSupplierStart,
  updateSupplierSuccess,
  updateSupplierFailure,
} from "../features/supplier/supplierSlice.js";

import { updateSupplierRequest } from "../features/supplier/supplierAPI.js";

// Props:
// supplier  — the supplier object being edited { _id, supplierName, phone, email, address }
// onClose   — function to close the modal

const EditSupplierModal = ({ supplier, onClose }) => {
  const [formData, setFormData] = useState({
    supplierName: "",
    phone:        "",
    email:        "",
    address:      "",
  });
  const [errors, setErrors]   = useState({});
  const dispatch              = useDispatch();

  // Pre-fill fields when modal opens
  useEffect(() => {
    if (supplier) {
      setFormData({
        supplierName: supplier.supplierName?.trim() || "",
        phone:        supplier.phone?.trim()        || "",
        email:        supplier.email?.trim()        || "",
        address:      supplier.address?.trim()      || "",
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field as user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateEditSupplier(formData);
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }
    setErrors({});
    try {
      dispatch(updateSupplierStart());
      const res = await updateSupplierRequest(supplier._id, formData);
      dispatch(updateSupplierSuccess(res.supplier));
      toast.success("Supplier updated successfully");
      onClose();
    } catch (error) {
      dispatch(updateSupplierFailure());
      toast.error(error.response?.data?.error || "Something went wrong.");
    }
  };

  const inputClass = (field) =>
    `w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all ${
      errors[field] ? "border-red-300 bg-red-50" : "border-gray-200"
    }`;

  // Reusable field row
  const Field = ({ label, name, type = "text", placeholder, icon: Icon, required, maxLength, showCounter }) => (
    <div>
      <label className="block text-sm font-medium text-primary mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        <input
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={inputClass(name)}
        />
      </div>
      <div className="flex items-center justify-between mt-1">
        {errors[name]
          ? <p className="text-xs text-red-500">{errors[name]}</p>
          : <span />
        }
        {showCounter && maxLength && (
          <p className={`text-xs ml-auto ${
            formData[name].length > maxLength - 3 ? "text-red-400" : "text-gray-400"
          }`}>
            {formData[name].length}/{maxLength}
          </p>
        )}
      </div>
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
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-secondary" />
            <h2 className="text-base font-semibold text-primary">Edit Supplier</h2>
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

          {/* Supplier Name */}
          <Field
            label="Supplier Name"
            name="supplierName"
            placeholder="e.g. TechCorp Manufacturing Inc."
            icon={Building2}
            required
            maxLength={30}
            showCounter
          />

          {/* Phone + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Phone Number"
              name="phone"
              placeholder="+1 (555) 000-0000"
              icon={Phone}
              required
              maxLength={15}
              showCounter
            />
            <Field
              label="Email Address"
              name="email"
              type="email"
              placeholder="contact@supplier.com"
              icon={Mail}
            />
          </div>

          {/* Address — textarea, different from Field */}
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">
              Address <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-3.5 h-3.5 text-gray-400" />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address, city, state..."
                maxLength={20}
                rows={3}
                className={`w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all resize-none ${
                  errors.address ? "border-red-300 bg-red-50" : "border-gray-200"
                }`}
              />
            </div>
            <div className="flex items-center justify-between mt-1">
              {errors.address
                ? <p className="text-xs text-red-500">{errors.address}</p>
                : <span />
              }
              <p className={`text-xs ml-auto ${
                formData.address.length > 17 ? "text-red-400" : "text-gray-400"
              }`}>
                {formData.address.length}/20
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

export default EditSupplierModal;
