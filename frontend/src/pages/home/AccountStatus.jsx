import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import {STATUS_CONFIG} from '../../data/index.js'

const AccountStatus = () => {
  const { user } = useSelector((state) => state.auth);
  const status   = user?.status ?? "pending";
  const cfg      = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  const { Icon } = cfg;

  return (
    <div className="min-h-[calc(100vh-112px)] flex items-center justify-center px-4 py-16 bg-tertiary">
      <div className="w-full max-w-md space-y-5">

        {/* ── Card ── */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

          {/* colour bar */}
          <div className={`h-1.5 w-full ${cfg.bar}`} />

          <div className="px-8 py-10 flex flex-col items-center text-center">

            {/* Icon ring */}
            <div className={`w-20 h-20 rounded-full ${cfg.iconBg} ring-8 ${cfg.ring} flex items-center justify-center mb-5`}>
              <Icon className={`w-9 h-9 ${cfg.iconColor}`} />
            </div>

            {/* Status pill */}
            <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${cfg.badge}`}>
              {status}
            </span>

            {/* Heading */}
            <h1 className="mt-4 text-2xl font-bold text-primary">{cfg.heading}</h1>

            {/* User name if available */}
            {user?.name && (
              <p className="mt-1 text-sm text-gray-400">
                Hi, <span className="font-medium text-gray-600">{user?.name}</span>
              </p>
            )}

            {/* Description */}
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Unfortunately your account has been{" "}
              <span className={`font-semibold ${cfg.accent}`}>{status}</span>.
              <br />
              Please contact the administrator or wait for their approval.
            </p>

            <hr className="w-full border-gray-100 my-7" />

            {/* Actions */}
            <div className="w-full space-y-3">
              <a
                href="mailto:admin@stockflow.erp"
                className={`w-full flex items-center justify-center gap-2 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer ${cfg.bar} hover:opacity-90`}
              >
                <Mail className="w-4 h-4" />
                Contact Administrator
              </a>

              <Link
                to="/"
                className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium px-5 py-2.5 rounded-xl transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>

            {/* Support note */}
            <p className="mt-6 text-xs text-gray-400">
              Need help?{" "}
              <a href="mailto:support@stockflow.erp" className="text-secondary hover:underline">
                support@stockflow.erp
              </a>
            </p>
          </div>
        </div>

        {/* Below card */}
        <p className="text-center text-xs text-gray-400">
          © 2024 StockFlow ERP. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AccountStatus;
