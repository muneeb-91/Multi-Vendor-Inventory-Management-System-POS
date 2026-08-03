import { useState } from "react";
import {
  AlertTriangle,
  ShoppingCart,
  CheckCircle2,
  Bell,
  Trash2,
  CheckCheck,
} from "lucide-react";
import { initialNotifications, FILTERS } from "../../data";

const ManagerNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter]   = useState("All");

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const dismiss = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  const filtered = notifications.filter((n) => {
    if (activeFilter === "Unread")       return !n.read;
    if (activeFilter === "Stock Alerts") return n.type === "critical" || n.type === "stock";
    if (activeFilter === "Orders")       return n.type === "order";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-primary">Notifications</h1>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">
            Stock alerts and order updates assigned to you.
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="self-start sm:self-auto flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
              activeFilter === f
                ? "bg-secondary text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-50">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
            <Bell className="w-10 h-10 text-gray-200" />
            <p className="text-sm">No notifications here.</p>
          </div>
        )}

        {filtered.map((n) => (
          <div
            key={n.id}
            onClick={() => markRead(n.id)}
            className={`flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${
              !n.read ? "bg-blue-50/30" : ""
            }`}
          >
            {/* Icon */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${n.iconBg}`}>
              <n.icon className={`w-5 h-5 ${n.iconColor}`} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={`text-sm font-semibold leading-tight ${n.read ? "text-gray-700" : "text-primary"}`}>
                  {n.title}
                </p>
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.message}</p>
              <p className="text-xs text-gray-400 mt-1.5">{n.time}</p>
            </div>

            {/* Dismiss */}
            <button
              onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-300 hover:text-gray-500 cursor-pointer transition-colors shrink-0 mt-0.5"
              title="Dismiss"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerNotifications;
