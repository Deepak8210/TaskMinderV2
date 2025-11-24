import React, { forwardRef } from "react";

// CustomCheckbox.jsx
// Tailwind-friendly, accessible checkbox component with a white SVG check inside a transparent box
// Props: checked, defaultChecked, onChange, id, label, size ('sm'|'md'|'lg'), className, disabled

const SIZE_CLASSES = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const CustomCheckbox = forwardRef(
  (
    {
      id,
      checked,
      defaultChecked,
      onChange,
      label,
      size = "md",
      className = "",
      disabled = false,
      ariaLabel,
      ...rest
    },
    ref
  ) => {
    const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

    return (
      <label
        htmlFor={id}
        className={`relative inline-flex items-center cursor-pointer select-none ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        } ${className}`}
      >
        <input
          id={id}
          ref={ref}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          aria-label={ariaLabel}
          className={`peer appearance-none ${sizeClass} rounded-md border-2 border-border-dark bg-transparent
            checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary/50 focus:ring-offset-0
            transition-all outline-none`}
          {...rest}
        />

        <svg
          className={`absolute left-0 top-0 ${sizeClass} pointer-events-none
            opacity-0 peer-checked:opacity-100 transition-opacity`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          aria-hidden="true"
        >
          <path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {label && (
          <span className="ml-3 text-sm text-base-100 select-none">
            {label}
          </span>
        )}
      </label>
    );
  }
);

export default CustomCheckbox;

// ------------------
// Example usage:
// import CustomCheckbox from './CustomCheckbox';
//
// <CustomCheckbox
//   id="agree"
//   label="I agree"
//   size="md"
//   onChange={(e) => setChecked(e.target.checked)}
//   checked={checked}
// />
