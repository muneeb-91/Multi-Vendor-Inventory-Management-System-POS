import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Store } from "lucide-react";
import { useSelector } from "react-redux";
import { LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { logoutRequest } from "../../features/auth/authAPI";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const HomeNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const profileMenuRef = useRef(null);

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const links = [
    { label: "Features", to: "/" },
    { label: "Solutions", to: "/solutions" },
    { label: "Pricing", to: "/pricing" },
  ];

  const  handleLogout = async () => {
    try{
      await logoutRequest();
      dispatch(logout());
      toast.success("Logout Successful");
      navigate("/");
    }catch(error){
      console.log(error);
      toast.error("Logout failed")
    }
  }

  useEffect(() => {
    const menuHandler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const profileMenuHandler = (e) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target)
      ) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", menuHandler);
    document.addEventListener("mousedown", profileMenuHandler);
    return () => {
      document.removeEventListener("mousedown", menuHandler);
      document.removeEventListener("mousedown", profileMenuHandler);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2 mb-1">
          <Store className="text-secondary size-5 md:size-7" />
          <h1 className="text-primary text-2xl md:text-3xl font-bold tracking-tight">
            Stock<span className="text-secondary">Flow</span>
          </h1>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-3">
          {links.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-1 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-b-2 border-secondary"
                    : "text-gray-600 hover:text-primary"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        {isAuthenticated && user ? (
          <button
            onClick={() => setProfileMenuOpen((p) => !p)}
            className="hidden md:flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-gray-200 hover:border-secondary/40 hover:bg-gray-50 transition-all cursor-pointer group"
          >
            <span className="flex items-center justify-center size-8 bg-secondary text-white rounded-full text-sm font-semibold shrink-0">
              {user?.name?.[0]?.toUpperCase()}
            </span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
              {user?.name}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${profileMenuOpen ? "rotate-180" : ""}`}
            />
          </button>
        ) : (
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
        )}

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-3">
          {isAuthenticated && user ? (
            <button
              onClick={() => setProfileMenuOpen((p) => !p)}
              ref={profileMenuRef}
              className="md:hidden flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-gray-200 hover:border-secondary/40 hover:bg-gray-50 transition-all cursor-pointer group"
            >
              <span className="flex items-center justify-center size-8 bg-secondary text-white rounded-full text-sm font-semibold shrink-0">
                {user?.name?.[0]?.toUpperCase()}
              </span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                {user?.name}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${profileMenuOpen ? "rotate-180" : ""}`}
              />
            </button>
          ) : (
            ""
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            ref={menuRef}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-1">
          {links.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-secondary bg-green-50"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {!isAuthenticated && !user ? (
            <div className="flex gap-3 pt-3 border-t border-gray-100 mt-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                to="/register-vendor"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2 rounded-lg bg-secondary text-white text-sm font-semibold hover:bg-secondary/90"
              >
                Get Started
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      )}

      {/* Profile Dropdown */}
      {profileMenuOpen && (
        <div ref={profileMenuRef} className="absolute right-0 mt-1 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
          {/* User info */}
          <div className="px-4 py-3.5 border-b border-gray-100 bg-gray-50">
            <p className="text-sm font-semibold text-primary truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-400 truncate mt-0.5">
              {user?.email}
            </p>
          </div>

          {/* Profile dropdown items */}
          <div onClick={()=>{
            setProfileMenuOpen(false);
          }} className="p-1.5 space-y-0.5">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-secondary/8 hover:text-secondary transition-colors cursor-pointer">
              <div className="w-7 h-7 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                <LayoutDashboard className="w-3.5 h-3.5 text-secondary" />
              </div>
              Dashboard
            </button>

            <button onClick={()=>{
              handleLogout()
              setProfileMenuOpen(false);
            }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
              <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                <LogOut className="w-3.5 h-3.5 text-red-500" />
              </div>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default HomeNavbar;
