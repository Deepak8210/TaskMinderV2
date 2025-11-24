import React from "react";

const priorityColors = {
  high: "badge-high-soft",
  medium: "badge-medium-soft",
  low: "badge-low-soft",
};

const statusColors = {
  "not started": "bg-gray-500/20 text-muted-dark",
  "in progress": "bg-primary/20 text-muted-dark",
  completed: "bg-green-500/20 text-muted-dark",
};

export default function Badge({
  children,
  size = "md",
  priority,
  status,
  className = "",
}) {
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";
  const priorityKey = priority?.trim(" ").toLowerCase();
  const statusKey = status?.trim(" ").toLowerCase();

  const tone =
    (priorityKey && priorityColors[priorityKey]) ||
    (statusKey && statusColors[statusKey]) ||
    "bg-gray-800 text-gray-200";

  return (
    <span
      className={`inline-flex items-center rounded-full capitalize ${sizeClass} ${tone} ${className}`}
    >
      {children}
    </span>
  );
}
