import { useState, useRef } from "react";
import { User, Lock, SlidersHorizontal, Database, Save, Eye, EyeOff, Upload } from "lucide-react";

// ─── Sub-section components ───────────────────────────────────────────────────

const ProfileSettings = () => {
  const [form, setForm] = useState({
    firstName: "Super",
    lastName: "Admin",
    email: "admin@stockflow.enterprise",
    role: "",
  });
  const fileRef = useRef();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary">Profile Settings</h2>
        <p className="text-sm text-gray-500 mt-0.5">Update your administrative account details.</p>
      </div>

      <hr className="border-gray-100" />

      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shrink-0">
          <span className="text-white text-xl font-bold">SA</span>
        </div>
        <div>
          <button
            onClick={() => fileRef.current.click()}
            className="flex items-center gap-2 border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium text-primary hover:bg-gray-50 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            Change Avatar
          </button>
          <p className="text-xs text-gray-400 mt-1">JPG, GIF or PNG. Max size of 2MB.</p>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" />
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1.5">Email Address</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-1.5">Role / Title</label>
        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="System Administrator"
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
        />
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const ChangePassword = () => {
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });

  const toggle = (field) => setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const strength = (() => {
    const p = form.newPass;
    if (!p) return null;
    if (p.length < 6) return { label: "Weak", color: "bg-red-400", width: "w-1/4" };
    if (p.length < 10) return { label: "Fair", color: "bg-amber-400", width: "w-2/4" };
    if (/[A-Z]/.test(p) && /[0-9]/.test(p) && /[^a-zA-Z0-9]/.test(p))
      return { label: "Strong", color: "bg-secondary", width: "w-full" };
    return { label: "Good", color: "bg-blue-400", width: "w-3/4" };
  })();

  const PasswordField = ({ label, name, showKey }) => (
    <div>
      <label className="block text-sm font-medium text-primary mb-1.5">{label}</label>
      <div className="relative">
        <input
          name={name}
          type={show[showKey] ? "text" : "password"}
          value={form[name]}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full px-3 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
        />
        <button
          onClick={() => toggle(showKey)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          {show[showKey] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary">Change Password</h2>
        <p className="text-sm text-gray-500 mt-0.5">Update your login credentials securely.</p>
      </div>

      <hr className="border-gray-100" />

      <PasswordField label="Current Password" name="current" showKey="current" />
      <PasswordField label="New Password" name="newPass" showKey="newPass" />

      {/* Strength meter */}
      {strength && (
        <div className="space-y-1.5">
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
          </div>
          <p className={`text-xs font-medium ${strength.color.replace("bg-", "text-")}`}>
            {strength.label}
          </p>
        </div>
      )}

      <PasswordField label="Confirm New Password" name="confirm" showKey="confirm" />

      {form.confirm && form.newPass !== form.confirm && (
        <p className="text-xs text-red-500">Passwords do not match.</p>
      )}

      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors">
          <Save className="w-4 h-4" />
          Update Password
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const SystemPreferences = () => {
  const [prefs, setPrefs] = useState({
    emailNotifications: true,
    vendorAlerts: true,
    maintenanceMode: false,
    timezone: "UTC",
  });

  const toggle = (key) => setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  const Toggle = ({ value, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
        value ? "bg-secondary" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
          value ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-primary">System Preferences</h2>
        <p className="text-sm text-gray-500 mt-0.5">Control global platform behaviour.</p>
      </div>

      <hr className="border-gray-100" />

      <div className="space-y-5">
        {[
          { key: "emailNotifications", label: "Email Notifications", desc: "Receive system alerts via email" },
          { key: "vendorAlerts", label: "Vendor Alerts", desc: "Get notified for new vendor requests" },
          { key: "maintenanceMode", label: "Maintenance Mode", desc: "Put platform in read-only mode" },
        ].map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-primary">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
            </div>
            <Toggle value={prefs[key]} onToggle={() => toggle(key)} />
          </div>
        ))}

        <hr className="border-gray-100" />

        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">Default Timezone</label>
          <select
            value={prefs.timezone}
            onChange={(e) => setPrefs((p) => ({ ...p, timezone: e.target.value }))}
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 cursor-pointer w-full sm:w-64"
          >
            {["UTC", "America/New_York", "America/Los_Angeles", "Asia/Karachi", "Europe/London"].map((tz) => (
              <option key={tz}>{tz}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors">
          <Save className="w-4 h-4" />
          Save Preferences
        </button>
      </div>
    </div>
  );
};

// ─── Main Settings Page ───────────────────────────────────────────────────────

const menuItems = [
  { key: "profile", label: "Profile Settings", icon: User },
  { key: "password", label: "Change Password", icon: Lock },
  { key: "preferences", label: "System Preferences", icon: SlidersHorizontal },
];

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    if (activeTab === "profile") return <ProfileSettings />;
    if (activeTab === "password") return <ChangePassword />;
    return <SystemPreferences />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Super Admin Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage global system configurations and administrative access controls.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Left panel */}
        <div className="w-full lg:w-64 shrink-0 space-y-4">

          {/* Configuration Menu */}
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-primary">Configuration Menu</p>
            </div>
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

          {/* System Status */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-primary">System Status</p>
              <Database className="w-4 h-4 text-secondary" />
            </div>
            {[
              { label: "Database Sync", status: "Online", ok: true },
              { label: "API Gateway", status: "Online", ok: true },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{s.label}</span>
                <span className={`flex items-center gap-1 font-medium ${s.ok ? "text-secondary" : "text-red-500"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${s.ok ? "bg-secondary" : "bg-red-500"}`}></span>
                  {s.status}
                </span>
              </div>
            ))}
            <hr className="border-gray-100" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Last Backup</span>
              <span className="text-gray-700 font-mono text-xs">02:34 AM UTC</span>
            </div>
          </div>
        </div>

        {/* Right panel — active section */}
        <div className="flex-1 bg-white border border-gray-100 rounded-xl p-6 min-w-0">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
