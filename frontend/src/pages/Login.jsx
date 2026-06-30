import { useState } from "react";
import { Mail, Lock, ArrowRight, Store } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-tertiary px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-tertiary border border-gray-200 flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-secondary">
              <rect x="2" y="3" width="20" height="5" rx="1" />
              <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
              <path d="M10 12h4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">StockFlow</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to manage your enterprise inventory.</p>
        </div>

        {/* Form */}
        <div className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-primary mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-primary">Password</label>
              <button className="text-sm text-secondary hover:underline font-medium">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Login to Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-400">New to StockFlow?</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Register as Vendor */}
          <Link to={'/vendor-register'} className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-primary font-medium py-2.5 rounded-lg transition-colors duration-200 cursor-pointer">
            <Store className="w-4 h-4 text-gray-500" />
            Register as Vendor
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Login;
