// Reusable card for feature/benefit grids — used across Home & Solutions pages.
// Pass any lucide-react icon component as `icon`.
const FeatureCard = ({ icon: Icon, title, description, variant = "light" }) => {
  const isDark = variant === "dark";

  return (
    <div
      className={`rounded-2xl p-6 border transition-colors ${
        isDark
          ? "bg-white/5 border-white/10"
          : "bg-white border-gray-100"
      }`}
    >
      {Icon && (
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
            isDark ? "bg-secondary/15" : "bg-secondary/10"
          }`}
        >
          <Icon className="w-5 h-5 text-secondary" />
        </div>
      )}
      <h3 className={`font-bold text-lg mb-2 ${isDark ? "text-white" : "text-primary"}`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
