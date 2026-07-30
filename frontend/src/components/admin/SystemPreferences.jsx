import { useState } from "react";
import { Save } from "lucide-react";

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
}

export default SystemPreferences