import { useState } from "react";
import { User, Store, Mail, Phone, Lock, MapPin, Info, ShieldCheck, Zap, Headphones } from "lucide-react";

const VendorRegister = () => {
  const [form, setForm] = useState({
    ownerName: "",
    shopName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Vendor registration submitted", form);
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-primary flex-col justify-center px-12 py-16">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
              <rect x="2" y="3" width="20" height="5" rx="1" />
              <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
              <path d="M10 12h4" />
            </svg>
          </div>
          <span className="text-white text-xl font-bold tracking-tight">StockFlow</span>
        </div>

        {/* Headline */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white leading-snug">
            Partner with the definitive enterprise network.
          </h2>
          <p className="text-gray-400 text-sm mt-4 leading-relaxed max-w-sm">
            Join our curated ecosystem of top-tier vendors. Manage your inventory, process orders seamlessly, and scale your operations with unmatched clarity and control.
          </p>
        </div>

        {/* Feature List */}
        <ul className="space-y-5">
          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-secondary/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-secondary" />
            </div>
            <span className="text-gray-300 text-sm">Rigorous verification for quality assurance</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-secondary/30 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-secondary" />
            </div>
            <span className="text-gray-300 text-sm">Accelerated onboarding workflow</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-secondary/30 flex items-center justify-center shrink-0">
              <Headphones className="w-4 h-4 text-secondary" />
            </div>
            <span className="text-gray-300 text-sm">Dedicated enterprise support</span>
          </li>
        </ul>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-12 bg-white overflow-y-auto">
        <div className="max-w-lg w-full mx-auto">

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-primary">Vendor Registration</h1>
            <p className="text-sm text-gray-500 mt-1">
              Complete your profile to request access to the StockFlow network.
            </p>
          </div>

          {/* Info Banner */}
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-7">
            <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-700 leading-relaxed">
              Please wait after submitting details until Admin approve your request. You will be notified via email upon status change.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">

            {/* Owner Name */}
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Owner Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="ownerName"
                  value={form.ownerName}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                />
              </div>
            </div>

            {/* Shop Name */}
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Shop Name</label>
              <div className="relative">
                <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="shopName"
                  value={form.shopName}
                  onChange={handleChange}
                  placeholder="Acme Supplies Ltd."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@acme.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                />
              </div>
            </div>

            {/* Business Address */}
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Business Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your registered business address..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Submit Application
            </button>

            {/* Terms */}
            <p className="text-center text-xs text-gray-400">
              By submitting, you agree to our{" "}
              <a href="#" className="text-secondary hover:underline">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="text-secondary hover:underline">Privacy Policy</a>.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
