import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Store,
  ScanLine,
  Repeat,
  CheckCircle2,
  Globe,
  Workflow,
  Boxes,
} from "lucide-react";
import FeatureCard from "../../components/home/FeatureCard";
import SectionHeading from "../../components/home/SectionHeading";
import { posProperties, wholesaleProperties } from "../../data";

const Solutions = () => (
  <>
    <section className="bg-primary">
      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <p className="inline-flex items-center gap-2 text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full mb-5">
          <ShieldCheck className="w-3.5 h-3.5" />
          Enterprise Grade Solutions
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight max-w-2xl">
          Engineered for <span className="text-secondary">Absolute Precision</span>
        </h1>
        <p className="mt-4 text-gray-400 leading-relaxed max-w-xl">
          StockFlow provides industry-specific inventory architectures designed to
          eliminate friction across global supply chains. Scale with confidence using
          our high-density data synchronization.
        </p>
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link
            to="/register"
            className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-center"
          >
            Explore Platform
          </Link>
          <Link
            to="/pricing"
            className="border border-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-center"
          >
            Request Demo
          </Link>
        </div>
      </div>
    </section>

    {/* ── Industry-Specific Ecosystems ───────────────────────────── */}
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-2">
        <p className="text-sm font-semibold text-primary border-b-2 border-secondary inline-block pb-2">
          Industry-Specific Ecosystems
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Retail */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Retail</p>
          <h3 className="text-xl font-bold text-primary">Omnichannel Point of Sale</h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Bridge the gap between physical storefronts and digital storefronts with
            sub-second inventory updates. Our retail engine supports multi-store
            replenishment and real-time click-and-collect workflows.
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {posProperties.map(({ label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl py-3 px-2 text-center">
                <Icon className="w-4 h-4 text-secondary" />
                <span className="text-xs text-gray-600">{label}</span>
              </div>
            ))}
          </div>

          {/* Visual placeholder */}
          <div className="mt-5 h-32 rounded-xl bg-gray-100 flex items-center justify-center">
            <Store className="w-10 h-10 text-gray-300" />
          </div>
        </div>

        {/* Wholesale */}
        <div className="bg-secondary/5 border border-secondary/10 rounded-2xl p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Wholesale</p>
          <h3 className="text-xl font-bold text-primary">Bulk Logistics &amp; B2B</h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Massive SKU management with tiered pricing models and automated reorder
            triggers for high-volume distributors.
          </p>

          <ul className="mt-5 space-y-2.5">
            {wholesaleProperties.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {/* Visual placeholder */}
          <div className="mt-5 h-32 rounded-xl bg-primary/90 flex items-center justify-center">
            <Boxes className="w-10 h-10 text-secondary/50" />
          </div>
        </div>
      </div>

      {/* E-commerce — full width dark */}
      <div className="mt-5 bg-primary rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="p-6 lg:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">E-Commerce</p>
          <h3 className="text-xl font-bold text-white">Headless Inventory Control</h3>
          <p className="mt-2 text-sm text-gray-400 leading-relaxed">
            Our API-first architecture allows you to plug StockFlow into any
            storefront — Shopify, Magento, or Custom React apps. Maintain a single
            source of truth for global availability.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-2xl font-bold text-secondary">99.99%</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide">API Uptime</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-2xl font-bold text-secondary">&lt; 50ms</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Sync Latency</p>
            </div>
          </div>
        </div>

        {/* Code/API visual placeholder */}
        <div className="bg-gray-100 m-4 lg:m-6 lg:ml-0 rounded-xl p-5 flex flex-col gap-3">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <span className="ml-auto text-[10px] font-mono text-gray-400">api.stockflow.io/v1/sync</span>
          </div>
          <div className="h-2 bg-secondary/40 rounded w-3/4" />
          <div className="h-2 bg-gray-300 rounded w-1/2" />
          <div className="h-2 bg-gray-300 rounded w-2/3" />
          <div className="grid grid-cols-4 gap-2 mt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── The Technical Core ─────────────────────────────────────── */}
    <section className="bg-secondary/5 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="The Technical Core"
          description="Enterprise-ready primitives that power the world's most complex supply chains."
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <FeatureCard
            icon={Globe}
            title="Global Inventory Sync"
            description="A distributed ledger for physical goods. Propagate inventory changes across 200+ nodes in less than 100ms. Prevent overselling on every channel, every time."
          />
          <FeatureCard
            icon={Workflow}
            title="Advanced Vendor Portal"
            description="Empower suppliers with a dedicated interface for order fulfillment, shipment tracking, and self-service SKU management. Reduce manual email overhead by 85%."
          />
          <FeatureCard
            icon={Repeat}
            title="Real-time API Integrations"
            description="Webhooks, RESTful endpoints, and GraphQL support. StockFlow integrates seamlessly with your existing ERP, CRM, and WMS without breaking a sweat."
          />
        </div>
      </div>
    </section>

    {/* ── CTA (solid green) ──────────────────────────────────────── */}
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="bg-secondary rounded-2xl py-14 px-6 lg:px-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white max-w-md">
          Ready to revolutionize your operations?
        </h2>
        <p className="mt-3 text-white/80 max-w-md text-sm leading-relaxed">
          Join 500+ global enterprises who trust StockFlow for their mission-critical
          inventory data. We offer white-glove onboarding and 24/7 technical support.
        </p>
        <Link
          to="/register"
          className="mt-6 inline-block bg-white text-secondary font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Schedule a Strategic Review
        </Link>
      </div>
    </section>
  </>
);

export default Solutions;
