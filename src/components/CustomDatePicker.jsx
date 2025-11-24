import { useState, useRef, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function CustomDatePicker() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const wrapperRef = useRef(null);

  const handleDateSelect = (date) => {
    const formatted = date.toLocaleDateString("en-GB");
    setValue(formatted);
    setOpen(false);
  };

  useEffect(() => {
    function handleOutside(event) {
      if (!wrapperRef.current) return;
      // If click/touch is outside the wrapper, close popup
      if (!wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="form-inputs flex items-center justify-between"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <span className={value ? "text-text-dark" : "text-gray-500"}>
          {value || "dd-mm-yyyy"}
        </span>
        <CalendarIcon className="text-gray-400" size={18} />
      </button>

      {open && (
        <div
          className="
            absolute mt-2 w-[260px]
            bg-[#0f1115]
            border border-[#2a2d33]
            text-text-dark
            rounded-lg
            shadow-lg shadow-black/40
            p-3
            z-50
          "
        >
          <CalendarUI onSelect={handleDateSelect} />
        </div>
      )}
    </div>
  );
}

function CalendarUI({ onSelect }) {
  const [current, setCurrent] = useState(new Date());

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const firstDay = new Date(current.getFullYear(), current.getMonth(), 1);
  const startDay = firstDay.getDay();
  const totalDays = new Date(
    current.getFullYear(),
    current.getMonth() + 1,
    0
  ).getDate();

  const dates = Array(startDay)
    .fill(null)
    .concat(Array.from({ length: totalDays }, (_, i) => i + 1));

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() =>
            setCurrent(new Date(current.getFullYear(), current.getMonth() - 1))
          }
          className="p-1 rounded hover:bg-white/5"
          aria-label="Previous month"
        >
          <ChevronLeft className="text-muted-dark" />
        </button>

        <span className="font-medium">
          {current.toLocaleString("en-us", { month: "long" })},{" "}
          {current.getFullYear()}
        </span>

        <button
          type="button"
          onClick={() =>
            setCurrent(new Date(current.getFullYear(), current.getMonth() + 1))
          }
          className="p-1 rounded hover:bg-white/5"
          aria-label="Next month"
        >
          <ChevronRight className="text-muted-dark" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-gray-400 text-sm mb-1">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center text-sm gap-1">
        {dates.map((d, i) => (
          <button
            key={i}
            type="button"
            onClick={() =>
              d &&
              onSelect(new Date(current.getFullYear(), current.getMonth(), d))
            }
            className={`
              h-8 flex items-center justify-center rounded-md
              ${
                d
                  ? "cursor-pointer hover:bg-primary/20"
                  : "opacity-20 pointer-events-none"
              }
            `}
            aria-label={d ? `Select ${d}` : undefined}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}
