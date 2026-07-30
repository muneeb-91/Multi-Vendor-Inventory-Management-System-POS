import { useState } from "react";
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer}) => {
    const [open, setOpen] = useState(false);

  return (
        <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-primary">{question}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm text-gray-500 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default FAQItem;