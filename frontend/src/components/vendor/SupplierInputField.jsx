const SupplierInputField = ({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
  required,
  error,
  maxLength,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-primary mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        )}

        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all ${
            error ? "border-red-300 bg-red-50" : "border-gray-200"
          }`}
        />
      </div>

      <div className="flex items-center justify-between mt-1">
        {error ? (
          <p className="text-xs text-red-500">{error}</p>
        ) : (
          <span />
        )}

        {maxLength && (
          <p
            className={`text-xs ml-auto ${
              value.length > maxLength - 3
                ? "text-red-400"
                : "text-gray-400"
            }`}
          >
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default SupplierInputField;