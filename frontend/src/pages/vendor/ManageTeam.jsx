import { useState } from "react";
import {
  Plus,
  TrendingUp,
  Users,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { managersData, managerStatuses, managerStatusStyle, managerStatusDot } from "../../data";
import Pagination from "../../components/shared/Pagination";


const ManageTeam = () => {
  const [managers, setManagers] = useState(managersData);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [openMenu, setOpenMenu]         = useState(null);

  const filtered = managers.filter(
    (m) => statusFilter === "All Status" || m.status === statusFilter
  );

  const handleRemove = (id) => {
    setManagers((prev) => prev.filter((m) => m.id !== id));
    setOpenMenu(null);
  };

  const handleToggleStatus = (id) => {
    setManagers((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "Active" ? "Pending" : "Active" }
          : m
      )
    );
    setOpenMenu(null);
  };

  return (
    <div className="space-y-6">

      {/* Breadcrumb */}
      <p className="text-sm text-gray-400">
        <span className="text-gray-500">Vendors</span>{" "}
        <span className="text-gray-300 mx-1">›</span>{" "}
        <span className="text-primary font-medium">Managers</span>
      </p>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Vendor Managers</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage administrative access and roles for vendor partners.
          </p>
        </div>
        <button className="self-start sm:self-auto flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-4 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors">
          <Plus className="w-4 h-4" />
          Add Manager
        </button>
      </div>

      {/* Content grid */}
      <div className="flex flex-col sm:flex-row gap-5 items-start">

        {/* Stat card */}
        <div className="w-full sm:w-56 shrink-0 bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Total Managers
            </p>
            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
              <Users className="w-4 h-4 text-secondary" />
            </div>
          </div>
          <p className="text-4xl font-bold text-primary">248</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-3.5 h-3.5 text-secondary" />
            <span className="text-xs font-semibold text-secondary">+12%</span>
            <span className="text-xs text-gray-400">this month</span>
          </div>
        </div>

        {/* Table card */}
        <div className="flex-1 bg-white border border-gray-100 rounded-xl overflow-hidden">

          {/* Table header row */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-primary">Active Personnel</h2>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 outline-none focus:border-secondary cursor-pointer bg-white"
            >
              {managerStatuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium hidden sm:table-cell">Email</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    {/* Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${m.color}`}>
                          {m.initials}
                        </div>
                        <span className="font-medium text-primary">{m.name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4 text-gray-500 hidden sm:table-cell">
                      {m.email}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${managerStatusStyle(m.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${managerStatusDot(m.status)}`} />
                        {m.status}
                      </span>
                    </td>

                    {/* 3-dot actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setOpenMenu(openMenu === m.id ? null : m.id)}
                          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {openMenu === m.id && (
                          <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-100 rounded-lg shadow-lg z-10 py-1">
                            <button
                              onClick={() => { setOpenMenu(null); }}
                              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleToggleStatus(m.id)}
                              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              {m.status === "Active" ? "Deactivate" : "Activate"}
                            </button>
                            <button
                              onClick={() => handleRemove(m.id)}
                              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-sm text-gray-400">
                      No managers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default ManageTeam;
