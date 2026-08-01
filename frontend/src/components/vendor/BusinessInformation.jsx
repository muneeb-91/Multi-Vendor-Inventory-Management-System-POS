import { useState } from "react";
import { Save } from "lucide-react";

const BusinessInformation = () => {
  const [form, setForm] = useState({
    shopName: "Apex Electronics Supply",
    registrationNumber: "REG-993-442",
    phone: "(555) 019-2837",
    addressLine: "100 Tech Boulevard, Suite 400",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary">Business Information</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Update your shop's primary details as they appear on orders and invoices.
        </p>
      </div>
      <hr className="border-gray-100" />

      <div className="space-y-4">
        {/* Shop Name + Registration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">Shop Name</label>
            <input
              name="shopName"
              value={form.shopName}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">Registration Number</label>
            <input
              name="registrationNumber"
              value={form.registrationNumber}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-gray-50"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">Phone Number</label>
          <div className="flex">
            <span className="flex items-center px-3 py-2.5 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 font-medium">
              +1
            </span>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="flex-1 px-3 py-2.5 rounded-r-lg border border-gray-200 text-sm text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">Business Address</label>
          <input
            name="addressLine"
            value={form.addressLine}
            onChange={handleChange}
            placeholder="Street address"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all mb-2"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="col-span-2 sm:col-span-1 px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
            <input
              name="zip"
              value={form.zip}
              onChange={handleChange}
              placeholder="ZIP"
              className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />
      <div className="flex items-center justify-end gap-3">
        <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
          Discard
        </button>
        <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-secondary hover:bg-secondary/90 text-white text-sm font-semibold cursor-pointer transition-colors">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>
    </div>
  );
}

export default BusinessInformation