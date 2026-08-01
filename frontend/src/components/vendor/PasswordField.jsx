import { Eye, EyeOff } from "lucide-react";
import { useState } from 'react';

const PasswordField = ({ label, name, hint, form, show, handleChange, toggleShow }) => {

  return (
    <div>
      <label className="block text-sm font-medium text-primary mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          name={name}
          type={show[name] ? "text" : "password"}
          value={form[name]}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full px-3 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm text-primary placeholder-gray-400 outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
        />
        <button
          onClick={() => toggleShow(name)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          {show[name] ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
};

export default PasswordField;
