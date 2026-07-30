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
  Keyboard,
  Mouse,
  Monitor,
  Headphones,
  Cpu,
  Laptop,
  Armchair,
  Printer,
  Warehouse,
  Truck,
  TrendingUp,
  Building2,
  Plus,
  UserPlus,
  ClipboardList,
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

// Super Admin Dashboard
export const adminSystemsStatus = [
  { label: "Core API", status: "99.9% Uptime", color: "bg-green-500" },
  { label: "Payment Gateway", status: "Operational", color: "bg-green-500" },
  { label: "Email Service", status: "Delayed", color: "bg-purple-400" },
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
  {
    sku: "ACM-CPU-X9",
    name: "Quantum Core Processor X9",
    cost: "$245.00",
    stock: 850,
    stockLevel: "high",
  },
  {
    sku: "ACM-MEM-32G",
    name: "32GB DDR5 RAM Kit",
    cost: "$112.50",
    stock: 120,
    stockLevel: "low",
  },
  {
    sku: "ACM-SSD-2T",
    name: "2TB NVMe Solid State Drive",
    cost: "$165.00",
    stock: 1200,
    stockLevel: "high",
  },
];

export const purchaseOrders = [
  {
    po: "PO-2023-8942",
    date: "Oct 24, 2023",
    status: "Delivered",
    amount: "$45,200.00",
  },
  {
    po: "PO-2023-8901",
    date: "Oct 12, 2023",
    status: "In Transit",
    amount: "$12,850.50",
  },
  {
    po: "PO-2023-8876",
    date: "Sep 28, 2023",
    status: "Delivered",
    amount: "$89,400.00",
  },
];

export const vendorDetailItems = [
  { label: "Vendor ID", value: vendor.vendorId },
  { label: "Tax ID / EIN", value: vendor.taxId },
  { label: "Category", value: vendor.category },
  { label: "HQ Address", value: vendor.address },
];

export const singleVendorStatusStyle = (s) => {
  if (s === "Delivered") return "bg-green-100 text-green-700";
  if (s === "In Transit") return "bg-blue-100 text-blue-600";
  return "bg-gray-100 text-gray-500";
};

// Vendor Requests
export const requestsData = [
  {
    id: 1,
    initial: "A",
    shopName: "Apex Supplies Ltd",
    ownerName: "Sarah Jenkins",
    email: "sarah@apexsupplies.com",
    phone: "+1 (555) 019-2834",
    requestDate: "2023-10-24",
    status: "Pending Review",
  },
  {
    id: 2,
    initial: "G",
    shopName: "Global Tech Traders",
    ownerName: "Marcus Chen",
    email: "m.chen@globaltech.io",
    phone: "+44 7700 900077",
    requestDate: "2023-10-23",
    status: "Pending Review",
  },
  {
    id: 3,
    initial: "B",
    shopName: "Blue Ridge Supplies",
    ownerName: "Amara Osei",
    email: "amara@blueridge.co",
    phone: "+1 (312) 456-7890",
    requestDate: "2023-10-21",
    status: "Pending Review",
  },
];

// Vendors Directory
export const vendorsData = [
  {
    id: 1,
    initial: "N",
    shopName: "Nexus Electronics",
    ownerName: "Sarah Jenkins",
    products: 1245,
    orders: 8902,
    status: "Active",
  },
  {
    id: 2,
    initial: "O",
    shopName: "Oasis Lifestyle",
    ownerName: "Marcus Thorne",
    products: 432,
    orders: 1105,
    status: "Active",
  },
  {
    id: 3,
    initial: "V",
    shopName: "Vanguard Gear",
    ownerName: "Elena Rostova",
    products: 89,
    orders: 0,
    status: "Suspended",
  },
  {
    id: 4,
    initial: "L",
    shopName: "Lumina Goods",
    ownerName: "Rachel Green",
    products: 12,
    orders: 45,
    status: "Pending",
  },
];

export const vendorsStatusStyle = (status) => {
  if (status === "Active") return "bg-green-100 text-green-700";
  if (status === "Suspended") return "bg-red-100 text-red-600";
  return "bg-gray-100 text-gray-500";
};

/* ── Vendor Layout ────────────────────────────────────────────── */

// Create Order
export const catalogue = [
  {
    id: 1,
    name: "Mechanical Keyboard Pro",
    sku: "COMP-KB-88",
    price: 129.99,
    category: "Electronics",
    stock: 45,
    Icon: Keyboard,
  },
  {
    id: 2,
    name: "Wireless Ergonomic Mouse",
    sku: "COMP-MS-24",
    price: 79.5,
    category: "Accessories",
    stock: 90,
    Icon: Mouse,
  },
  {
    id: 3,
    name: 'UltraBook Pro 15"',
    sku: "TECH-LT-15",
    price: 1499.0,
    category: "Electronics",
    stock: 0,
    Icon: Monitor,
  },
  {
    id: 4,
    name: "Noise-Cancelling Headset",
    sku: "AUDIO-NC-01",
    price: 249.99,
    category: "Electronics",
    stock: 30,
    Icon: Headphones,
  },
  {
    id: 5,
    name: "USB-C Hub 7-in-1",
    sku: "PERI-HUB-7",
    price: 49.99,
    category: "Peripherals",
    stock: 120,
    Icon: Cpu,
  },
  {
    id: 6,
    name: 'Curved Monitor 27"',
    sku: "DISP-GM-27",
    price: 399.0,
    category: "Electronics",
    stock: 12,
    Icon: Monitor,
  },
];

export const categories = [
  "All Items",
  "Electronics",
  "Accessories",
  "Peripherals",
];

// Manage Products
export const CATEGORY_ICONS = {
  Electronics: Laptop,
  Furniture: Armchair,
  "Office Supplies": Printer,
  Audio: Headphones,
};

export const productsData = [
  {
    id: 1,
    name: "ThinkPad X1 Carbon Gen 10",
    sku: "SKU-8472-LC",
    category: "Electronics",
    supplier: "TechData Corp",
    stock: 142,
    stockLevel: "high",
    price: "$1,499.00",
  },
  {
    id: 2,
    name: "Ergonomic Office Chair V2",
    sku: "SKU-9921-FC",
    category: "Furniture",
    supplier: "Herman Miller Inc",
    stock: 8,
    stockLevel: "low",
    price: "$845.00",
  },
  {
    id: 3,
    name: "LaserJet Pro MFP M428fdw",
    sku: "SKU-3324-HP",
    category: "Office Supplies",
    supplier: "HP Enterprise",
    stock: 24,
    stockLevel: "mid",
    price: "$429.99",
  },
  {
    id: 4,
    name: "Noise Cancelling Pro",
    sku: "SKU-7751-S0",
    category: "Electronics",
    supplier: "Sony Audio",
    stock: 89,
    stockLevel: "high",
    price: "$348.00",
  },
];

export const stockDot = (level) => {
  if (level === "high") return "bg-green-500";
  if (level === "low") return "bg-red-500";
  return "bg-amber-400";
};

export const stockText = (level, count) => {
  if (level === "low") return `text-red-600 font-semibold`;
  return "text-gray-700";
};

// Manage Teams
export const managersData = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "schen@globaltech.io",
    status: "Active",
    initials: "SC",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    email: "mjohnson@apexlogistics.com",
    status: "Active",
    initials: "MJ",
    color: "bg-green-100 text-green-700",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    email: "elena.r@nexussupply.net",
    status: "Pending",
    initials: "ER",
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: 4,
    name: "David Kim",
    email: "d.kim@techcorp.io",
    status: "Suspended",
    initials: "DK",
    color: "bg-purple-100 text-purple-600",
  },
];

export const managerStatusStyle = (s) => {
  if (s === "Active") return "bg-green-50 text-green-700 border-green-200";
  if (s === "Pending") return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-gray-50 text-gray-500 border-gray-200";
};

export const managerStatusDot = (s) => {
  if (s === "Active") return "bg-green-500";
  if (s === "Pending") return "bg-amber-400";
  return "bg-gray-400";
};

// Order History
export const orders = [
  {
    id: "ORD-2023-8901",
    customer: "Acme Corp Logistics",
    amount: "$12,450.00",
    createdBy: "Sarah Jenkins",
    date: "Oct 24, 2023",
  },
  {
    id: "ORD-2023-8895",
    customer: "Global Tech Supplies",
    amount: "$3,210.50",
    createdBy: "Mike Ross",
    date: "Oct 23, 2023",
  },
  {
    id: "ORD-2023-8882",
    customer: "Stark Industries",
    amount: "$45,000.00",
    createdBy: "Tony Stark",
    date: "Oct 21, 2023",
  },
  {
    id: "ORD-2023-8879",
    customer: "Wayne Enterprises",
    amount: "$8,950.25",
    createdBy: "Lucius Fox",
    date: "Oct 20, 2023",
  },
  {
    id: "ORD-2023-8871",
    customer: "Ollivander's Wand Shop",
    amount: "$1,200.00",
    createdBy: "Garrick Ollivander",
    date: "Oct 19, 2023",
  },
];

// Order Receipt
export const receipt = {
  invoiceNumber: "INV-2023-8472",
  dateIssued: "Oct 24, 2023",
  paymentMethod: "Corporate Card ending ****4242",
  billedTo: {
    company: "Acme Corporation",
    contact: "Jane Doe (Procurement)",
    address: "99 Industry Way, Building B",
    city: "Manufacturing District, MD 10001",
    email: "jane.doe@acmecorp.com",
  },
  shippedTo: {
    company: "Acme Warehouse #4",
    attn: "Attn: Receiving Dock",
    address: "4500 Freight Road",
    city: "Logistics Hub, LH 90211",
  },
  items: [
    {
      description: "Industrial Actuator V2",
      sku: "ACT-002-V2",
      qty: 12,
      unitPrice: 450.0,
    },
    {
      description: "Precision Proximity Sensor",
      sku: "SEN-PROX-8M",
      qty: 50,
      unitPrice: 24.5,
    },
    {
      description: "Heavy Duty Conveyor Belt Segment (10m)",
      sku: "BELT-HD-10M",
      qty: 3,
      unitPrice: 1200.0,
    },
  ],
  shipping: 350.0,
  taxRate: 0.085,
};

// Product Details
export const product = {
  name: "Quantum Pro X1 Server Blade",
  status: "Active",
  sku: "SKU-99201-AX",
  category: "Enterprise Electronics / Servers",
  basePrice: "$2,499.00",
  weight: "14.2 lbs (6.4 kg)",
  description:
    "High-performance 1U rackmount server blade optimised for virtualisation and dense computing environments. Features dual-socket architecture supporting the latest generation processors, redundant platinum-level power supplies, and advanced thermal management.",
  image: null, // no real image — we'll use a placeholder
};

export const stockLocations = [
  {
    location: "Main Warehouse (NYC)",
    available: 142,
    reserved: 12,
    status: "In Stock",
  },
  {
    location: "West Coast Dist. (LA)",
    available: 8,
    reserved: 2,
    status: "Low Stock",
  },
  {
    location: "European Hub (FRA)",
    available: 56,
    reserved: 0,
    status: "In Stock",
  },
];

export const supplier = {
  primaryVendor: "TechCorp Manufacturing Inc.",
  leadTime: "14 – 21 Days",
  unitCost: "$1,850.00",
  reorderThreshold: 50,
  currentStock: 206, // sum of available
};

export const recentActivity = [
  { label: "Last Restocked", value: "Oct 18, 2024", icon: Warehouse },
  { label: "Last Ordered", value: "Oct 22, 2024", icon: Truck },
  { label: "Avg. Monthly Sales", value: "38 units", icon: TrendingUp },
];

export const stockStyle = (s) => {
  if (s === "In Stock") return "bg-green-100 text-green-700";
  if (s === "Low Stock") return "bg-red-100 text-red-600";
  return "bg-gray-100 text-gray-500";
};

export const singleProductLabels = [
  { label: "SKU", value: product.sku },
  { label: "Category", value: product.category },
  { label: "Base Price", value: product.basePrice },
  { label: "Weight", value: product.weight },
];

export const productPriceSummary = [
  { label: "Base Price", value: product.basePrice },
  { label: "Unit Cost", value: supplier.unitCost },
  { label: "Gross Margin", value: "$649.00 (26%)" },
];

// Suppliers
export const suppliers = [
  {
    id: 1,
    supplierName: "TechCorp Manufacturing Inc.",
    email: "procurement@techcorp.io",
    phone: "+1 (408) 555-0100",
    address: "San Jose, CA",
    status: "active",
  },
  {
    id: 2,
    supplierName: "Herman Miller Inc.",
    email: "trade@hermanmiller.com",
    phone: "+1 (616) 654-3000",
    address: "Zeeland, MI",
    status: "active",
  },
  {
    id: 3,
    supplierName: "HP Enterprise Solutions",
    email: "partners@hp.com",
    phone: "+1 (650) 857-1501",
    address: "Palo Alto, CA",
    status: "active",
  },
  {
    id: 4,
    supplierName: "Sony Audio Systems",
    email: "b2b@sony.com",
    phone: "+1 (212) 833-8000",
    address: "New York, NY",
    status: "inactive",
  },
];

export const avatarColor = (name) => {
  const palette = [
    { bg: "bg-indigo-100", text: "text-indigo-600" },
    { bg: "bg-green-100", text: "text-green-700" },
    { bg: "bg-amber-100", text: "text-amber-700" },
    { bg: "bg-purple-100", text: "text-purple-600" },
    { bg: "bg-red-100", text: "text-red-600" },
    { bg: "bg-blue-100", text: "text-blue-600" },
  ];
  return palette[name.charCodeAt(0) % palette.length];
};

const activeCount = suppliers.filter((s) => s.status === "active").length;

export const supplierStats = [
  {
    label: "Total Suppliers",
    value: suppliers.length,
    icon: Building2,
    bg: "bg-indigo-50",
    ic: "text-indigo-500",
  },
  {
    label: "Active",
    value: activeCount,
    icon: TrendingUp,
    bg: "bg-green-50",
    ic: "text-secondary",
  },
  {
    label: "Inactive",
    value: suppliers.length - activeCount,
    icon: Package,
    bg: "bg-red-50",
    ic: "text-red-400",
  },
];

// Vendor Dashboard
export const recentProducts = [
  {
    id: 1,
    name: "Minimalist Smartwatch",
    sku: "TECH-SW-01",
    price: "$249.99",
    stock: 124,
    low: false,
  },
  {
    id: 2,
    name: "Noise-Cancelling Headphones",
    sku: "AUDIO-NC-02",
    price: "$349.00",
    stock: 8,
    low: true,
  },
  {
    id: 3,
    name: "Mechanical Keyboard Pro",
    sku: "COMP-KB-88",
    price: "$129.50",
    stock: 45,
    low: false,
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    sku: "FURN-CH-12",
    price: "$499.00",
    stock: 12,
    low: false,
  },
];

export const recentOrders = [
  {
    id: "ORD-2023-8901",
    vendor: "Acme Corp",
    initials: "AC",
    color: "bg-indigo-100 text-indigo-600",
    amount: "$1,250.00",
    time: "2h ago",
    highlight: true,
  },
  {
    id: "ORD-2023-8900",
    vendor: "Global Tech LLC",
    initials: "GT",
    color: "bg-green-100 text-green-600",
    amount: "$345.50",
    time: "5h ago",
    highlight: false,
  },
  {
    id: "ORD-2023-8899",
    vendor: "Stark Industries",
    initials: "SI",
    color: "bg-amber-100 text-amber-700",
    amount: "$8,900.00",
    time: "1d ago",
    highlight: false,
  },
  {
    id: "ORD-2023-8898",
    vendor: "Wayne Design",
    initials: "WD",
    color: "bg-purple-100 text-purple-600",
    amount: "$125.00",
    time: "1d ago",
    highlight: false,
  },
];

export const quickActions = [
  { label: "Add Product", icon: Plus, to: "/vendor/products" },
  { label: "Create Order", icon: ClipboardList, to: "/vendor/orders" },
  { label: "Add Manager", icon: UserPlus, to: "/vendor/managers" },
];

export const vendorDashboardCards = [
  {
    label: "Total Products",
    value: "1,248",
    badge: "+12% this month",
    badgeOk: true,
    icon: Package,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
  {
    label: "Low Stock",
    value: "24",
    badge: "Needs immediate attention",
    badgeOk: false,
    icon: AlertTriangle,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    label: "Total Orders",
    value: "8,592",
    badge: "+5.4% this week",
    badgeOk: true,
    icon: ShoppingCart,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
  {
    label: "Monthly Revenue",
    value: "$142.5k",
    badge: null,
    badgeOk: true,
    icon: DollarSign,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
];

/* ── Manager Layout ────────────────────────────────────────────── */
