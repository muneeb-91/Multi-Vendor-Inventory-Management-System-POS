import { Link, NavLink } from "react-router-dom";
import {
  Store,
  LayoutDashboard,
  Users,
  ClipboardList,
  ShoppingCart,
  BarChart2,
  Settings,
  LifeBuoy,
} from "lucide-react";
import { adminNavItems } from "../../data";

const Sidebar = () => {
  return (
    <aside className="w-60 sticky min-h-screen bg-primary flex flex-col shrink-0">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link to={'/'} className="flex items-center gap-2 mb-1">
          <Store className="text-secondary size-5" />
          <h1 className="text-white text-xl font-bold tracking-tight">Stock<span className="text-secondary">Flow</span></h1>
        </Link>
        <p className="text-gray-400 text-xl">Admin Pannel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {adminNavItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-secondary text-white"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User profile block */}
    <div className="px-4 py-3 border-t border-white/10">
      <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold">MA</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-semibold truncate">Methew Admin</p>
          <p className="text-gray-400 text-[10px] truncate">Operations</p>
        </div>
      </div>
      <div className="mt-2 space-y-0.5">
          <a
            href="mailto:vendor@gmail.com"
            className={
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-gray-400`
            }
          >
            <LifeBuoy className="w-4 h-4 shrink-0" />
            Support
          </a>
      </div>
    </div>
    </aside>
  );
};

export default Sidebar;
