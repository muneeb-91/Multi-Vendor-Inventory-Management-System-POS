// Reusable centered section heading — used across all home pages.
const SectionHeading = ({ eyebrow, title, description, light = false }) => (
  <div className="text-center max-w-2xl mx-auto">
    {eyebrow && (
      <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${
        light ? "text-secondary" : "text-secondary"
      }`}>
        {eyebrow}
      </p>
    )}
    <h2 className={`text-3xl sm:text-4xl font-bold ${light ? "text-white" : "text-primary"}`}>
      {title}
    </h2>
    {description && (
      <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
        light ? "text-gray-300" : "text-gray-500"
      }`}>
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
