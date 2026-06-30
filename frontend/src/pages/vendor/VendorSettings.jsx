import { useState, useRef } from "react";
import { Building2, Lock, Save, Eye, EyeOff } from "lucide-react";

// ── Business Information ──────────────────────────────────────────────────────
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
};

// ── Change Password ───────────────────────────────────────────────────────────
const ChangePassword = () => {
  const [form, setForm]   = useState({ current: "", newPass: "", confirm: "" });
  const [show, setShow]   = useState({ current: false, newPass: false, confirm: false });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const toggleShow   = (k)  => setShow((p) => ({ ...p, [k]: !p[k] }));

  const strength = (() => {
    const p = form.newPass;
    if (!p) return null;
    if (p.length < 6) return { label: "Weak",   color: "bg-red-400",    text: "text-red-500",    w: "w-1/4" };
    if (p.length < 10) return { label: "Fair",  color: "bg-amber-400",  text: "text-amber-500",  w: "w-2/4" };
    if (/[A-Z]/.test(p) && /[0-9]/.test(p) && /[^a-zA-Z0-9]/.test(p))
      return { label: "Strong", color: "bg-secondary", text: "text-secondary", w: "w-full" };
    return { label: "Good", color: "bg-blue-400", text: "text-blue-500", w: "w-3/4" };
  })();

  const PasswordField = ({ label, name, hint }) => (
    <div>
      <label className="block text-sm font-medium text-primary mb-1.5">{label}</label>
      <div className="relative">
        <input
          name={name}
          type={show[name] ? "text" : "password"}
          value={form[name]}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full px-3 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
        />
        <button
          onClick={() => toggleShow(name)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          {show[name] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary">Change Password</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </div>
      <hr className="border-gray-100" />

      <div className="space-y-4 max-w-md">
        <PasswordField label="Current Password" name="current" />
        <PasswordField
          label="New Password"
          name="newPass"
          hint="Minimum 8 characters, including letters and numbers."
        />

        {strength && (
          <div className="space-y-1">
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.w}`} />
            </div>
            <p className={`text-xs font-medium ${strength.text}`}>{strength.label}</p>
          </div>
        )}

        <PasswordField label="Confirm New Password" name="confirm" />
        {form.confirm && form.newPass !== form.confirm && (
          <p className="text-xs text-red-500 -mt-2">Passwords do not match.</p>
        )}
      </div>

      <hr className="border-gray-100" />
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-secondary hover:bg-secondary/90 text-white text-sm font-semibold cursor-pointer transition-colors">
          <Save className="w-4 h-4" /> Update Password
        </button>
      </div>
    </div>
  );
};

// ── Main Settings Page ────────────────────────────────────────────────────────
const menuItems = [
  { key: "business",  label: "Business Info",    icon: Building2 },
  { key: "password",  label: "Change Password",  icon: Lock      },
];

const VendorSettings = () => {
  const [activeTab, setActiveTab] = useState("business");

  const renderContent = () => {
    if (activeTab === "business") return <BusinessInformation />;
    return <ChangePassword />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage your vendor profile and account security preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-start">

        {/* Left nav */}
        <div className="w-full lg:w-52 shrink-0 bg-white border border-gray-100 rounded-xl overflow-hidden">
          <nav className="p-2 space-y-0.5">
            {menuItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer text-left ${
                  activeTab === key
                    ? "bg-secondary/10 text-secondary border-l-2 border-secondary"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right panel */}
        <div className="flex-1 bg-white border border-gray-100 rounded-xl p-6 min-w-0">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default VendorSettings;
