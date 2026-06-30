import { useState } from "react";
import { Outlet } from "react-router-dom";
import VendorSidebar from "../components/vendor/VendorSidebar";
import VendorTopNavbar from "../components/vendor/VendorTopNavbar";


const VendorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-tertiary">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-30 lg:static lg:z-auto transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <VendorSidebar />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <VendorTopNavbar onMenuToggle={() => setSidebarOpen((p) => !p)} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default VendorLayout;
