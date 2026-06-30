import { useState } from "react";
import {
  Store,
  Package,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Truck,
  ClipboardList,
  Download,
  MoreHorizontal,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

const vendorPerformanceData = [
  { name: "V1", revenue: 48000 },
  { name: "V2", revenue: 37000 },
  { name: "V3", revenue: 29000 },
  { name: "V4", revenue: 41000 },
  { name: "V5", revenue: 22000 },
];

const productDistribution = [
  { label: "Electronics", pct: 45, color: "#10B981" },
  { label: "Apparel", pct: 30, color: "#6366F1" },
  { label: "Other", pct: 25, color: "#D1D5DB" },
];

const periods = ["30 Days", "Quarter", "YTD"];

// Simple donut via SVG
const Donut = ({ data }) => {
  const r = 48;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const slices = data.map((d) => {
    const slice = { ...d, offset, dash: (d.pct / 100) * circumference };
    offset += slice.dash;
    return slice;
  });

  return (
    <svg width={120} height={120} viewBox="0 0 120 120">
      {slices.map((s) => (
        <circle
          key={s.label}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={s.color}
          strokeWidth={18}
          strokeDasharray={`${s.dash} ${circumference - s.dash}`}
          strokeDashoffset={-s.offset}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      ))}
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#0F172A">
        100%
      </text>
    </svg>
  );
};

const SystemAnalytics = () => {
  const [activePeriod, setActivePeriod] = useState("30 Days");

  const stats = [
    {
      label: "Total Active Vendors",
      value: "1,284",
      change: "+12.5%",
      up: true,
      icon: Store,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-500",
    },
    {
      label: "Products Managed",
      value: "45.2K",
      change: "+8.2%",
      up: true,
      icon: Package,
      iconBg: "bg-green-50",
      iconColor: "text-secondary",
    },
    {
      label: "Orders Processed",
      value: "8,932",
      change: "-2.4%",
      up: false,
      icon: ShoppingCart,
      iconBg: "bg-red-50",
      iconColor: "text-red-400",
    },
  ];

  return (
    <div className="space-y-6 my-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Analytics Overview</h1>
          <p className="text-sm text-gray-500 mt-0.5">Comprehensive view of enterprise performance.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Period toggle */}
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setActivePeriod(p)}
                className={`px-3 py-1.5 text-sm font-medium cursor-pointer transition-colors ${
                  activePeriod === p
                    ? "bg-secondary text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-3xl font-bold text-primary mt-1">{s.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg ${s.iconBg} flex items-center justify-center shrink-0`}>
                <s.icon className={`w-5 h-5 ${s.iconColor}`} />
              </div>
            </div>
            <div className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
              s.up ? "bg-green-50 text-secondary" : "bg-red-50 text-red-500"
            }`}>
              {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {s.change}
              <span className="font-normal text-gray-400 ml-1">vs last 30 days</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Bar chart — spans 2 cols */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-primary">Vendor Performance</h2>
            <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 cursor-pointer">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={vendorPerformanceData} barSize={32}>
              <CartesianGrid vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94A3B8" }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip
                formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]}
                contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }}
              />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                {vendorPerformanceData.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? "#10B981" : "#E2E8F0"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Right column */}
        <div className="space-y-4">

          {/* Product Distribution */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h2 className="font-semibold text-primary mb-4">Product Distribution</h2>
            <div className="flex items-center gap-4">
              <Donut data={productDistribution} />
              <div className="space-y-2">
                {productDistribution.map((d) => (
                  <div key={d.label} className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }}></span>
                      <span className="text-xs text-gray-600">{d.label}</span>
                    </div>
                    <span className="text-xs font-semibold text-primary">{d.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h2 className="font-semibold text-primary mb-4">Activity Summary</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                    <Truck className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary">Shipped</p>
                    <p className="text-xs text-gray-400">Last 24 hours</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-primary">412</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                    <ClipboardList className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary">Pending</p>
                    <p className="text-xs text-gray-400">Awaiting fulfillment</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-primary">89</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;
