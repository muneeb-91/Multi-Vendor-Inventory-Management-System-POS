import { Link, NavLink } from "react-router-dom";
import {
  Store,
  LayoutDashboard,
  Tag,
  Truck,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LifeBuoy,
} from "lucide-react";

const navItems = [
  { label: "Dashboard",  icon: LayoutDashboard,  to: "/vendor" },
  { label: "Categories", icon: Tag,              to: "/vendor/categories" },
  { label: "Suppliers",  icon: Truck,            to: "/vendor/suppliers" },
  { label: "Products",   icon: Package,          to: "/vendor/products" },
  { label: "Orders",     icon: ShoppingCart,     to: "/vendor/orders" },
  { label: "Managers",   icon: Users,            to: "/vendor/managers" },
  { label: "Settings",   icon: Settings,         to: "/vendor/settings" },
];

const VendorSidebar = () => (
  <aside className="w-60 min-h-screen bg-primary flex flex-col shrink-0">
    {/* Brand */}
    <div className="px-6 py-5 border-b border-white/10">
      <div className="flex items-center gap-2 mb-1">
        <Store className="text-secondary size-5" />
        <h1 className="text-white text-xl font-bold tracking-tight">Stock<span className="text-secondary">Flow</span></h1>
      </div>
      <p className="text-gray-400 text-xl">Vendor Pannel</p>
    </div>

    {/* Create Order CTA */}
    <div className="px-3 pt-4">
      <NavLink
        to="/manager/orders/create"
        className="flex items-center justify-center gap-2 w-full border border-secondary hover:bg-white hover:text-primary text-white text-sm font-semibold py-2.5 rounded-lg transition-colors duration-300 cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        Create Order
      </NavLink>
    </div>

    {/* Nav */}
    <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
      {navItems.map(({ label, icon: Icon, to }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/vendor"}
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
          <span className="text-white text-xs font-bold">HV</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-semibold truncate">Hales Vendor</p>
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

export default VendorSidebar;
