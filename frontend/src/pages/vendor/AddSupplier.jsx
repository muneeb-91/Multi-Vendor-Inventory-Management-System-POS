import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  ToggleLeft,
  ToggleRight,
  Save,
} from "lucide-react";
import { Link } from "react-router-dom";
import SupplierInputField from "../../components/vendor/SupplierInputField";
import { validateSupplier } from "../../utils/validations";

const AddSupplier = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    supplierName: "",
    phone: "",
    email: "",
    address: "",
    status: "active",
  });
  console.log(formData);

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
    const e = validateSupplier(formData);

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setErrors({});
    console.log("Submit:", formData);
  };

  const inputClass = (field) =>
    `w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all ${
      errors[field] ? "border-red-300 bg-red-50" : "border-gray-200"
    }`;

  const labelClass = "block text-sm font-medium text-primary mb-1.5";

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link
        to="/vendor/suppliers"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Suppliers
      </Link>

      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Add Supplier</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Add a new supplier to your supply chain network.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-6">
        {/* ── Supplier Information ── */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="w-4 h-4 text-secondary" />
            <h2 className="text-base font-semibold text-primary">
              Supplier Information
            </h2>
          </div>

          <div className="space-y-4">
            {/* Supplier Name — full width, required */}
            <SupplierInputField
              label="Supplier Name"
              name="supplierName"
              placeholder="e.g. TechCorp Manufacturing Inc."
              icon={Building2}
              required
              value={formData.supplierName}
              onChange={handleChange}
              error={errors.supplierName}
              maxLength={30}
            />

            {/* Phone + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SupplierInputField
                label="Phone Number"
                name="phone"
                placeholder="+1 (555) 000-0000"
                icon={Phone}
                required
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                maxLength={15}
              />
              <SupplierInputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="contact@supplier.com"
                icon={Mail}
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>

            {/* Address — full width, optional */}
            <div>
              <label className={labelClass}>
                Address <span className="text-red-400">*</span>
              </label>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-3.5 h-3.5 text-gray-400" />

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  maxLength={20}
                  placeholder="Street address, city, state..."
                  rows={3}
                  className={`w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all resize-none ${
                    errors.address
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200"
                  }`}
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                {errors.address ? (
                  <p className="text-xs text-red-500">{errors.address}</p>
                ) : (
                  <span />
                )}

                <p
                  className={`text-xs ml-auto ${
                    formData.address.length > 17
                      ? "text-red-400"
                      : "text-gray-400"
                  }`}
                >
                  {formData.address.length}/20
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-6" />

        {/* ── Status ── */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            {formData.status === "active" ? (
              <ToggleRight className="w-4 h-4 text-secondary" />
            ) : (
              <ToggleLeft className="w-4 h-4 text-gray-400" />
            )}
            <h2 className="text-base font-semibold text-primary">Status</h2>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
            <div>
              <p className="text-sm font-medium text-primary">
                Supplier Status
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {formData.status === "active"
                  ? "This supplier is active and available for product assignments."
                  : "This supplier is inactive and unavailable for product assignments."}
              </p>
            </div>
            <button
              onClick={toggleStatus}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${
                formData.status === "active" ? "bg-secondary" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  formData.status === "active"
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Badge preview */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-gray-400">Preview:</span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                formData.status === "active"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-gray-50 text-gray-500 border-gray-200"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  formData.status === "active" ? "bg-green-500" : "bg-gray-400"
                }`}
              />
              {formData.status === "active" ? "Active" : "Inactive"}
            </span>
          </div>
        </section>

        <hr className="border-gray-100 my-6" />

        {/* ── Actions ── */}
        <div className="flex items-center justify-end gap-3">
          <Link
            to="/vendor/suppliers"
            className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-5 py-2 bg-secondary hover:bg-secondary/90 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save Supplier
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSupplier;
