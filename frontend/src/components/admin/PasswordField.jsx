import { Eye, EyeOff } from "lucide-react";

const PasswordField = ({ label, name, showKey, show, form, toggle, handleChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-primary mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          name={name}
          type={show[showKey] ? "text" : "password"}
          value={form[name]}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full px-3 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
        />
        <button
          onClick={() => toggle(showKey)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          {show[showKey] ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
