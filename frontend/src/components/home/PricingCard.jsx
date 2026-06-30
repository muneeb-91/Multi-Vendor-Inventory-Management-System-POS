import { Check } from "lucide-react";
import { Link } from "react-router-dom";

// Reusable pricing tier card — used on the Pricing page.
// `highlighted` adds the "Most Popular" ring + badge styling.
const PricingCard = ({ name, price, period, description, features, ctaLabel, ctaTo, highlighted = false }) => (
  <div
    className={`relative rounded-2xl p-6 flex flex-col bg-white transition-all ${
      highlighted
        ? "border-2 border-secondary shadow-lg lg:scale-105"
        : "border border-gray-100"
    }`}
  >
    {highlighted && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
        MOST POPULAR
      </span>
    )}

    <p className="text-sm font-semibold text-secondary">{name}</p>

    <div className="mt-2 flex items-baseline gap-1">
      <span className="text-3xl font-black text-primary">{price}</span>
      {period && <span className="text-sm text-gray-400">{period}</span>}
    </div>

    <p className="mt-3 text-sm text-gray-500 leading-relaxed">{description}</p>

    <ul className="mt-5 space-y-2.5 flex-1">
      {features.map((f) => (
        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
          <Check className="w-4 h-4 text-secondary shrink-0" />
          {f}
        </li>
      ))}
    </ul>

    <Link
      to={ctaTo || "/register"}
      className={`mt-6 text-center py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
        highlighted
          ? "bg-secondary hover:bg-secondary/90 text-white"
          : "border border-gray-200 text-primary hover:bg-gray-50"
      }`}
    >
      {ctaLabel}
    </Link>
  </div>
);

export default PricingCard;
