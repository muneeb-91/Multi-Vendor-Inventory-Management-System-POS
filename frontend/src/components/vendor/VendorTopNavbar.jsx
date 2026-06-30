import { Bell, HelpCircle, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

const NO_SEARCHBAR_ROUTES = ["/vendor", "/vendor/settings"];

const VendorTopNavbar = ({ onMenuToggle, placeholder = "Search..." }) => {
  const {pathname} = useLocation();
  const showSearchBar = !NO_SEARCHBAR_ROUTES.includes(pathname);

  return (
  <header className="h-14 bg-white border-b border-gray-100 flex items-center px-4 gap-4 sticky top-0 z-10">
    {/* Mobile toggle */}
    <button
      onClick={onMenuToggle}
      className="lg:hidden p-1.5 rounded-md text-gray-500 hover:bg-gray-100 cursor-pointer"
    >
      <Menu className="w-5 h-5" />
    </button>

    {/* Search */}
    {showSearchBar && <div className="flex-1 max-w-md">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all bg-gray-50"
        />
      </div>
    </div>}

    {/* Right */}
    <div className="ml-auto flex items-center gap-3">
      <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 cursor-pointer">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
      </button>
      <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 cursor-pointer max-sm:hidden">
        <HelpCircle className="w-5 h-5" />
      </button>
      <div className="w-px h-6 bg-gray-200" />
      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
        <span className="text-white text-xs font-semibold">JD</span>
      </div>
    </div>
  </header>
)
};

export default VendorTopNavbar;
