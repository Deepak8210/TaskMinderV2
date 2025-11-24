import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomDropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full overflow-visible">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex justify-between items-center rounded-lg border border-border-dark bg-card-dark px-3 py-2 text-text-dark ${className}`}
      >
        <span>{value || placeholder}</span>
        <ChevronDown
          size={18}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute mt-2 w-full rounded-lg border border-border-dark bg-card-dark shadow-lg z-50 overflow-hidden">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-primary text-text-dark"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
