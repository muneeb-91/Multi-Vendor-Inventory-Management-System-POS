import {
  Clock,
  XCircle,
  ShieldOff,
  Store,
  Package,
  ShoppingCart,
  User,
  Lock,
  SlidersHorizontal,
} from "lucide-react";

/* ── Home Layout ────────────────────────────────────────────── */

// Account Status Page
export const STATUS_CONFIG = {
  pending: {
    Icon: Clock,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    ring: "ring-amber-100",
    bar: "bg-amber-400",
    badge: "bg-amber-50 text-amber-600 border-amber-200",
    accent: "text-amber-500",
    heading: "Account Pending",
  },
  rejected: {
    Icon: XCircle,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    ring: "ring-red-100",
    bar: "bg-red-500",
    badge: "bg-red-50 text-red-600 border-red-200",
    accent: "text-red-500",
    heading: "Account Rejected",
  },
  suspended: {
    Icon: ShieldOff,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    ring: "ring-orange-100",
    bar: "bg-orange-500",
    badge: "bg-orange-50 text-orange-600 border-orange-200",
    accent: "text-orange-500",
    heading: "Account Suspended",
  },
};

// Pricing Page
export const plans = [
  {
    name: "Starter",
    monthly: "$49",
    annual: "$39",
    period: "/mo",
    description:
      "Essential tools for small vendors to manage core inventory and basic sales.",
    features: [
      "Unlimited Daily Transactions",
      "Basic Receipt Customization",
      "Mobile POS Support",
    ],
    ctaLabel: "Get Started",
    ctaTo: "/register",
    highlighted: false,
  },
  {
    name: "Professional",
    monthly: "$149",
    annual: "$119",
    period: "/mo",
    description:
      "Powerful automation and integrations for growing medium-sized businesses.",
    features: [
      "Offline Mode Sync",
      "Employee Shift Management",
      "Customer Loyalty Program",
      "Advanced Analytics",
    ],
    ctaLabel: "Get Started",
    ctaTo: "/register",
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthly: "Custom",
    annual: "Custom",
    period: null,
    description:
      "Tailored workflows, dedicated support, and enterprise-grade security controls.",
    features: [
      "Custom POS Hardware Integration",
      "Advanced Fraud Detection",
      "White-label Receipts",
      "24/7 Dedicated Support",
    ],
    ctaLabel: "Contact Sales",
    ctaTo: "#",
    highlighted: false,
  },
];

export const comparisonRows = [
  { feature: "Offline Mode", starter: false, pro: true, enterprise: true },
  {
    feature: "Barcode Scanner Support",
    starter: true,
    pro: true,
    enterprise: true,
  },
  {
    feature: "Receipt Printing",
    starter: true,
    pro: true,
    enterprise: true,
  },
  {
    feature: "Split Payments",
    starter: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: "API Access",
    starter: "Restricted",
    pro: "Full POS API",
    enterprise: "Webhooks + SDKs",
  },
];

export const FAQS = [
  {
    question: "Can I change my plan later?",
    answer:
      "Absolutely. You can upgrade or downgrade your plan at any time from your billing settings. Changes take effect at the start of your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, Amex), as well as bank transfers for annual Enterprise plans.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes — all plans include a 14-day free trial with no credit card required. You'll have full access to every feature in your chosen tier.",
  },
  {
    question: "Do you offer discounts for non-profits?",
    answer:
      "Yes, we offer a 30% discount for registered non-profit organisations. Contact our sales team with your documentation to get started.",
  },
];

/* ── Admin Layout ────────────────────────────────────────────── */

// Orders Management
export const ordersData = [
  {
    id: "ORD-2024-0091",
    vendor: "Nexus Electronics",
    initials: "NE",
    avatarColor: "bg-indigo-50 text-indigo-600",
    items: 24,
    total: 12450.0,
    date: "Oct 24, 2024",
    time: "02:14 PM",
  },
  {
    id: "ORD-2024-0088",
    vendor: "Apex Supply Co.",
    initials: "AS",
    avatarColor: "bg-amber-50 text-amber-700",
    items: 8,
    total: 3200.0,
    date: "Oct 24, 2024",
    time: "11:42 AM",
  },
  {
    id: "ORD-2024-0085",
    vendor: "Oasis Lifestyle",
    initials: "OL",
    avatarColor: "bg-green-50 text-green-700",
    items: 41,
    total: 28900.0,
    date: "Oct 23, 2024",
    time: "04:05 PM",
  },
  {
    id: "ORD-2024-0079",
    vendor: "Vanguard Gear",
    initials: "VG",
    avatarColor: "bg-red-50 text-red-600",
    items: 5,
    total: 870.5,
    date: "Oct 22, 2024",
    time: "09:30 AM",
  },
  {
    id: "ORD-2024-0072",
    vendor: "Lumina Goods",
    initials: "LG",
    avatarColor: "bg-blue-50 text-blue-600",
    items: 13,
    total: 5640.0,
    date: "Oct 21, 2024",
    time: "01:18 PM",
  },
];

// System Analytics
export const vendorPerformanceData = [
  { name: "V1", revenue: 48000 },
  { name: "V2", revenue: 37000 },
  { name: "V3", revenue: 29000 },
  { name: "V4", revenue: 41000 },
  { name: "V5", revenue: 22000 },
];

export const productDistribution = [
  { label: "Electronics", pct: 45, color: "#10B981" },
  { label: "Apparel", pct: 30, color: "#6366F1" },
  { label: "Other", pct: 25, color: "#D1D5DB" },
];

export const periods = ["30 Days", "Quarter", "YTD"];

export const stats = [
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

// System Settings
export const settingsMenu = [
  {
    key: "profile",
    label: "Profile Settings",
    icon: User,
  },
  {
    key: "password",
    label: "Change Password",
    icon: Lock,
  },
  {
    key: "preferences",
    label: "System Preferences",
    icon: SlidersHorizontal,
  },
];

export const systemStatus = [
  { label: "Database Sync", status: "Online", ok: true },
  { label: "API Gateway", status: "Online", ok: true },
];

// Vendor Details
export const vendor = {
  name: "Acme Electronics Corp",
  status: "Active",
  vendorId: "VND-8834-ACE",
  taxId: "**-***4921",
  category: "Consumer Electronics, Components",
  address: "1245 Innovation Pkwy, Suite 400\nSan Jose, CA 95110",
  contact: {
    name: "Robert Sterling",
    title: "VP of Global Distribution",
    email: "r.sterling@acme-corp.com",
    phone: "+1 (408) 555-0199",
  },
};

export const topProducts = [
  { sku: "ACM-CPU-X9", name: "Quantum Core Processor X9", cost: "$245.00", stock: 850, stockLevel: "high" },
  { sku: "ACM-MEM-32G", name: "32GB DDR5 RAM Kit", cost: "$112.50", stock: 120, stockLevel: "low" },
  { sku: "ACM-SSD-2T", name: "2TB NVMe Solid State Drive", cost: "$165.00", stock: 1200, stockLevel: "high" },
];

export const purchaseOrders = [
  { po: "PO-2023-8942", date: "Oct 24, 2023", status: "Delivered", amount: "$45,200.00" },
  { po: "PO-2023-8901", date: "Oct 12, 2023", status: "In Transit", amount: "$12,850.50" },
  { po: "PO-2023-8876", date: "Sep 28, 2023", status: "Delivered", amount: "$89,400.00" },
];

