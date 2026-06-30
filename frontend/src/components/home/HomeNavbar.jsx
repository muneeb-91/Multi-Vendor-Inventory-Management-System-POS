import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Store } from "lucide-react";

const HomeNavbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Features",  to: "/"  },
    { label: "Solutions", to: "/solutions" },
    { label: "Pricing",   to: "/pricing"   },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Brand */}
        <div className="flex items-center gap-2 mb-1">
          <Store className="text-secondary size-5 md:size-7" />
          <h1 className="text-primary text-xl md:text-2xl font-bold tracking-tight">Stock<span className="text-secondary">Flow</span></h1>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-3">
          {links.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-1 py-1.5 text-sm font-medium transition-colors ${
                  isActive ? "border-b-2 border-secondary" : "text-gray-600 hover:text-primary"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors px-3 py-1.5"
          >
            Login
          </Link>
          <Link
            to="/register-vendor"
            className="bg-secondary hover:bg-secondary/90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-1">
          {links.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "text-secondary bg-green-50" : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="flex gap-3 pt-3 border-t border-gray-100 mt-2">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex-1 text-center py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="flex-1 text-center py-2 rounded-lg bg-secondary text-white text-sm font-semibold hover:bg-secondary/90"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default HomeNavbar;
