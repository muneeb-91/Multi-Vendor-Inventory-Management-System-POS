import { useEffect, useState } from "react";
import {
  Store,
  ClipboardList,
  CreditCard,
  TrendingUp,
  AlertCircle,
  MoreVertical,
  Download,
  CheckCircle,
  Users,
  Megaphone,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVendorsRequest } from "../../features/vendor/vendorAPI";
import { fetchVendorRequestsStart, fetchVendorRequestsSuccess, fetchVendorRequestsFailure } from "../../features/vendor/vendorSlice";


const statusStyle = (status) => {
  if (status === "Active") return "bg-green-100 text-green-700";
  if (status === "Review") return "bg-purple-100 text-purple-700";
  return "bg-gray-100 text-gray-600";
};

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(null);
  const { vendorRequests, error } = useSelector((state) => state.vendors.vendorRequests);

  useEffect(()=>{
    const getAllVendors = async () => {
      try{
        dispatch(fetchVendorRequestsStart());
        const res = await getAllVendorsRequest();
        dispatch(fetchVendorRequestsSuccess(res.vendorRequests));
      }catch(error){
        console.log(error);
        dispatch(fetchVendorRequestsFailure(error.response?.data?.message || "Something went wrong."));
      }
    }

    getAllVendors();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Super Admin Overview</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage global platform metrics and vendor operations.
          </p>
        </div>
        <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-primary hover:bg-gray-50 cursor-pointer self-start sm:self-auto">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <Store className="w-5 h-5 text-secondary" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-secondary">
              <TrendingUp className="w-3 h-3" /> 12%
            </span>
          </div>
          <p className="text-sm text-gray-500">Total Active Vendors</p>
          <p className="text-2xl font-bold text-primary mt-1">1,248</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-purple-500" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-red-500">
              <AlertCircle className="w-3 h-3" /> Action Required
            </span>
          </div>
          <p className="text-sm text-gray-500">Pending Requests</p>
          <p className="text-2xl font-bold text-primary mt-1">42</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-gray-100 rounded-xl p-5 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-500" />
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-secondary">
              <TrendingUp className="w-3 h-3" /> 8.4%
            </span>
          </div>
          <p className="text-sm text-gray-500">Monthly Platform Volume</p>
          <p className="text-2xl font-bold text-primary mt-1">$2.4M</p>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recently Registered Vendors */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-primary">Recently Registered Vendors</h2>
            <button className="text-sm text-secondary hover:underline font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
                  <th className="px-5 py-3 font-medium">Vendor Name</th>
                  <th className="px-5 py-3 font-medium hidden sm:table-cell">Category</th>
                  <th className="px-5 py-3 font-medium hidden md:table-cell">Reg. Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentVendors.map((v) => (
                  <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">
                          {v.initials}
                        </div>
                        <span className="font-medium text-primary">{v.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 hidden sm:table-cell">{v.category}</td>
                    <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell">{v.date}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle(v.status)}`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === v.id ? null : v.id)}
                          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {openMenu === v.id && (
                          <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-100 rounded-lg shadow-lg z-10 py-1">
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              View Details
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h2 className="font-semibold text-primary mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between bg-secondary text-white px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:bg-secondary/90 transition-colors">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Review Pending Requests
                </div>
                <span className="bg-white/25 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  42
                </span>
              </button>
              <button className="w-full flex items-center gap-2 border border-gray-200 px-4 py-2.5 rounded-lg text-sm font-medium text-primary hover:bg-gray-50 cursor-pointer transition-colors">
                <Users className="w-4 h-4 text-gray-400" />
                Manage Vendor Accounts
              </button>
              <button className="w-full flex items-center gap-2 border border-gray-200 px-4 py-2.5 rounded-lg text-sm font-medium text-primary hover:bg-gray-50 cursor-pointer transition-colors">
                <Megaphone className="w-4 h-4 text-gray-400" />
                Global Announcement
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              System Status
            </p>
            <div className="space-y-3">
              {[
                { label: "Core API", status: "99.9% Uptime", color: "bg-green-500" },
                { label: "Payment Gateway", status: "Operational", color: "bg-green-500" },
                { label: "Email Service", status: "Delayed", color: "bg-purple-400" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${s.color}`}></span>
                    <span className="text-sm text-gray-700">{s.label}</span>
                  </div>
                  <span className="text-xs text-gray-500">{s.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
