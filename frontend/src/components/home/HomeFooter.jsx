import { Link } from "react-router-dom";
import { Globe, Mail, Store } from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features",  to: "/features"  },
      { label: "Solutions", to: "/solutions" },
      { label: "Pricing",   to: "/pricing"   },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About",    to: "#" },
      { label: "Careers",  to: "#" },
      { label: "Contact",  to: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy",  to: "#" },
      { label: "Terms of Service", to: "#" },
    ],
  },
];

const HomeFooter = () => (
  <footer className="bg-primary text-gray-300">
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

      {/* Brand */}
      <div className="lg:col-span-1">
        <div className="flex items-center gap-2 mb-1">
          <Store className="text-secondary size-5 md:size-7" />
          <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight">Stock<span className="text-secondary">Flow</span></h1>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">
          Precision enterprise inventory and multi-vendor management platform built for modern scale.
        </p>
      </div>

      {/* Link columns */}
      {FOOTER_COLUMNS.map((col) => (
        <div key={col.title}>
          <p className="text-white text-sm font-semibold mb-3">{col.title}</p>
          <ul className="space-y-2">
            {col.links.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-gray-400 hover:text-secondary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Bottom bar */}
    <div className="border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-gray-500">© 2024 StockFlow ERP. All rights reserved.</p>
        <div className="flex items-center gap-3 text-gray-400">
          <Globe className="w-4 h-4" />
          <Mail className="w-4 h-4" />
        </div>
      </div>
    </div>
  </footer>
);

export default HomeFooter;
