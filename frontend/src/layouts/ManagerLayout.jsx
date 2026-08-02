import { useState } from "react";
import { Outlet } from "react-router-dom";
import ManagerSidebar from "../components/manager/ManagerSidebar";
import ManagerTopNavbar from "../components/manager/ManagerTopNavbar";


const ManagerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-tertiary">
      {/* Sidebar — desktop always visible, mobile as overlay */}
      <>
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className="hidden lg:block sticky top-0 h-screen">
          <ManagerSidebar />
        </div>
        <div
          onClick={() => setSidebarOpen(false)}
          className={`lg:hidden fixed top-0 left-0 z-30 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ManagerSidebar />
        </div>
      </>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <ManagerTopNavbar onMenuToggle={() => setSidebarOpen((p) => !p)} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default ManagerLayout;
