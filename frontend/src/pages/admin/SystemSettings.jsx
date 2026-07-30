import { useState } from "react";
import { Database } from "lucide-react";
import ProfileSettings from "../../components/admin/ProfileSettings";
import SystemPreferences from "../../components/admin/SystemPreferences";
import { settingsMenu } from "../../data";
import ChangePassword from "../../components/admin/ChangePassword";
import { systemStatus } from "../../data";

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
              {settingsMenu.map(({ key, label, icon: Icon }) => (
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
            {systemStatus.map((s) => (
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
