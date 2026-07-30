import { useState } from "react";
import {
  Hourglass,
  CheckCircle2,
  Timer,
  MoreVertical,
  Filter,
  Download,
} from "lucide-react";
import { requestsData } from "../../data";

const VendorRequests = () => {
  const [requests, setRequests] = useState(requestsData);
  const [openMenu, setOpenMenu] = useState(null);

  const handleApprove = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    setOpenMenu(null);
  };

  const handleDelete = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    setOpenMenu(null);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-400">
        <span className="text-gray-500">Vendors</span> &rsaquo;{" "}
        <span className="text-primary font-medium">Requests</span>
      </p>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Vendor Onboarding Requests</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Review and manage incoming merchant applications.
          </p>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <button className="flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Pending Requests</p>
            <p className="text-2xl font-bold text-primary mt-0.5">{requests.length}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
            <Hourglass className="w-5 h-5 text-amber-500" />
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Approved This Week</p>
            <p className="text-2xl font-bold text-primary mt-0.5">8</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-secondary" />
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Average Review Time</p>
            <p className="text-2xl font-bold text-primary mt-0.5">2.4 days</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
            <Timer className="w-5 h-5 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3 font-medium">Shop Name</th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell">Owner Name</th>
                <th className="px-5 py-3 font-medium hidden lg:table-cell">Contact Info</th>
                <th className="px-5 py-3 font-medium hidden md:table-cell">Request Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">
                        {r.initial}
                      </div>
                      <span className="font-medium text-primary">{r.shopName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden sm:table-cell">{r.ownerName}</td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <p className="text-gray-600">{r.email}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{r.phone}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-500 hidden md:table-cell">{r.requestDate}</td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600">
                      {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setOpenMenu(openMenu === r.id ? null : r.id)}
                        className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {openMenu === r.id && (
                        <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-100 rounded-lg shadow-lg z-10 py-1">
                          <button
                            onClick={() => handleApprove(r.id)}
                            className="w-full text-left px-3 py-2 text-sm text-green-700 hover:bg-green-50 transition-colors"
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() => handleDelete(r.id)}
                            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-400">
                    No pending vendor requests.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Showing 1 to {requests.length} of {requests.length} requests
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorRequests;
