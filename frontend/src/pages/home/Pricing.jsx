import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Minus} from "lucide-react";
import PricingCard from "../../components/home/PricingCard";
import SectionHeading from "../../components/home/SectionHeading";
import { plans, comparisonRows,FAQS } from "../../data/index.js";
import FAQItem from "../../components/home/FAQItem.jsx";


const Pricing = () => {
  const [annual, setAnnual] = useState(false);

  const ComparisonCell = ({ value }) => {
  if (value === true)  return <Check className="w-4 h-4 text-secondary mx-auto" />;
  if (value === false) return <Minus className="w-4 h-4 text-gray-300 mx-auto" />;
  return <span className="text-xs text-gray-600">{value}</span>;
};

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary leading-tight">
          Real-time POS pricing for high-performance stores.
        </h1>
        <p className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed">
          Whether you're a local boutique or a national retail chain, StockFlow gives
          you the tools to master your in-store efficiency and streamline checkout operations.
        </p>

        {/* Monthly / Annual toggle */}
        <div className="mt-7 inline-flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">
          <span className={`text-sm font-medium transition-colors ${!annual ? "text-primary" : "text-gray-400"}`}>
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${
              annual ? "bg-secondary" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                annual ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors ${annual ? "text-primary" : "text-gray-400"}`}>
            Annual
            <span className="ml-1.5 text-xs font-bold text-secondary bg-secondary/10 px-1.5 py-0.5 rounded-full">
              Save 20%
            </span>
          </span>
        </div>
      </section>

      {/* ── Pricing Cards ──────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              price={plan.monthly === "Custom" ? "Custom" : (annual ? plan.annual : plan.monthly)}
              period={plan.period}
              description={plan.description}
              features={plan.features}
              ctaLabel={plan.ctaLabel}
              ctaTo={plan.ctaTo}
              highlighted={plan.highlighted}
            />
          ))}
        </div>
      </section>

      {/* ── Comparison Table ───────────────────────────────────────── */}
      <section className="bg-secondary/5 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading title="Compare features in depth" />
          <div className="mt-10 bg-white border border-gray-100 rounded-2xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide w-1/2">
                    Features
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Starter
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wide">
                    Professional
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 text-gray-700">{row.feature}</td>
                    <td className="px-4 py-3.5 text-center">
                      <ComparisonCell value={row.starter} />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <ComparisonCell value={row.pro} />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <ComparisonCell value={row.enterprise} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <SectionHeading title="Frequently Asked Questions" />
        <div className="mt-8 space-y-3">
          {FAQS.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* ── CTA (dark) ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-primary rounded-2xl py-14 px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to optimize your flow?
          </h2>
          <p className="mt-3 text-gray-400 max-w-md mx-auto text-sm">
            Join over 12,000 merchants who trust StockFlow to manage their $2B+ in
            annual inventory.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/register"
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              to="/solutions"
              className="border border-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
