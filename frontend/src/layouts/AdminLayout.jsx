import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/AdminSidebar";
import TopNavbar from "../components/admin/AdminTopNavbar";

const AdminLayout = () => {
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
        <div
          className={`fixed top-0 left-0 h-full z-30 lg:static lg:z-auto transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <Sidebar />
        </div>
      </>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
