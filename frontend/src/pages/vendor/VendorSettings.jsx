import { useState, useRef } from "react";
import { Building2, Lock, Save, Eye, EyeOff } from "lucide-react";
import BusinessInformation from "../../components/vendor/BusinessInformation";
import ChangePassword from "../../components/vendor/ChangePassword";

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
