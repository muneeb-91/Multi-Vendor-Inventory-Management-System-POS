import { Link } from "react-router-dom";
import {
  ArrowRight,
  Boxes,
  LineChart,
  Network,
  CheckCircle2,
  Upload,
  BellRing,
  Star,
} from "lucide-react";
import FeatureCard from "../../components/home/FeatureCard";
import SectionHeading from "../../components/home/SectionHeading";

const Home = () => (
  <>
    {/* ── Hero ───────────────────────────────────────────────────── */}
    <section className="max-w-6xl mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <p className="inline-flex items-center gap-2 text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
          Trusted by 2,000+ Enterprises
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-primary leading-tight">
          Empower Your Business with <span className="text-secondary">StockFlow</span>
        </h1>
        <p className="mt-4 text-gray-500 leading-relaxed max-w-md">
          The all-in-one platform for modern vendors and managers to scale operations
          with precision. Synchronize your supply chain in real-time.
        </p>
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link
            to="/register?role=manager"
            className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Get Started as Vendor <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Visual placeholder */}
      <div className="relative">
        <div className="absolute -inset-4 bg-linear-to-br from-secondary/10 to-transparent rounded-3xl blur-xl" />
        <div className="relative bg-primary rounded-2xl p-4 shadow-2xl">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 h-24 bg-white/5 rounded-lg flex items-end p-3 gap-1">
              {[40, 65, 50, 80, 60, 95, 70].map((h, i) => (
                <div key={i} className="flex-1 bg-secondary rounded-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="h-20 bg-white/5 rounded-lg flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-secondary border-t-transparent" />
            </div>
            <div className="h-20 bg-white/5 rounded-lg p-3 space-y-1.5">
              <div className="h-2 bg-white/10 rounded w-3/4" />
              <div className="h-2 bg-white/10 rounded w-1/2" />
              <div className="h-2 bg-white/10 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Built for Growth ───────────────────────────────────────── */}
    <section className="bg-secondary/5 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Why StockFlow"
          title="Built for Growth"
          description="Precision-engineered tools to eliminate friction in your daily retail and wholesale operations."
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <FeatureCard
            icon={Boxes}
            title="Centralized Inventory"
            description="Manage all your products, variations, and stock levels across multiple locations from a single source of truth."
          />
          <FeatureCard
            icon={LineChart}
            title="Real-time Analytics"
            description="Instant insights into sales trends, vendor performance, and high-demand items with detailed visual reports."
          />
          <FeatureCard
            icon={Network}
            title="Multi-vendor Management"
            description="Seamlessly onboard and manage hundreds of vendors, commissions, and order fulfillments in one integrated flow."
          />
        </div>
      </div>
    </section>

    {/* ── For Managers ───────────────────────────────────────────── */}
    <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="order-2 lg:order-1">
        <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">For Managers</p>
        <h2 className="text-3xl font-bold text-primary">Total Operational Control</h2>
        <p className="mt-3 text-gray-500 leading-relaxed">
          Empower your team with professional-grade reporting and staff management.
          Oversee every transaction and movement within your business ecosystem with
          clinical precision.
        </p>
        <ul className="mt-5 space-y-2.5">
          {[
            "Customizable organizational reporting dashboards",
            "Role-based access control for team members",
            "Cross-platform POS connectivity",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Visual placeholder */}
      <div className="order-1 lg:order-2 bg-primary rounded-2xl h-64 lg:h-80 flex items-center justify-center">
        <LineChart className="w-16 h-16 text-secondary/40" />
      </div>
    </section>

    {/* ── For Vendors ────────────────────────────────────────────── */}
    <section className="bg-secondary/5 py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Visual placeholder */}
        <div className="bg-white rounded-2xl h-64 lg:h-80 flex items-center justify-center border border-gray-100">
          <Boxes className="w-16 h-16 text-secondary/30" />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">For Vendors</p>
          <h2 className="text-3xl font-bold text-primary">Effortless Product Listing</h2>
          <p className="mt-3 text-gray-500 leading-relaxed">
            List your products once and sync across all active outlets. Track your
            orders, payouts, and customer reviews through an interface designed for
            speed and clarity.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <Upload className="w-5 h-5 text-secondary mb-2" />
              <p className="font-semibold text-primary text-sm">Bulk Upload</p>
              <p className="text-xs text-gray-500 mt-1">
                CSV & API integrations for massive inventories.
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <BellRing className="w-5 h-5 text-secondary mb-2" />
              <p className="font-semibold text-primary text-sm">Smart Alerts</p>
              <p className="text-xs text-gray-500 mt-1">
                Get notified instantly on new orders and stock-outs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Testimonial ────────────────────────────────────────────── */}
    <section className="max-w-3xl mx-auto px-6 py-16 text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
        Powering Global Commerce
      </p>
      <div className="flex items-center justify-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
        ))}
      </div>
      <p className="text-lg sm:text-xl italic text-primary leading-relaxed">
        "StockFlow transitioned our multi-vendor chaos into a streamlined engine of
        growth. The real-time visibility is a game-changer for our scale."
      </p>
      <div className="mt-5 flex items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white text-sm font-bold">
          MT
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-primary">Marcus Thorne</p>
          <p className="text-xs text-gray-400">COO, Nexus Logistics</p>
        </div>
      </div>
    </section>

    {/* ── CTA ────────────────────────────────────────────────────── */}
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <div className="bg-primary rounded-2xl py-14 px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Ready to master your inventory?
        </h2>
        <p className="mt-3 text-gray-400 max-w-md mx-auto text-sm">
          Join thousands of successful businesses leveraging StockFlow's precision
          management platform today.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/register?role=manager"
            className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Create Manager Account
          </Link>
          <Link
            to="/pricing"
            className="border border-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            View Demo
          </Link>
        </div>
        <p className="mt-4 text-xs text-gray-500">No credit card required. 14-day free trial.</p>
      </div>
    </section>
  </>
);

export default Home;
