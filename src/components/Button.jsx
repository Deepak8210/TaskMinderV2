import React from "react";

{
  /* <button
  onClick={() => navigate("/tasks/new")}
  className="bg-primary cursor-pointer hover:bg-primary/90 transition-colors flex gap-2 px-4 py-2 rounded-lg font-semibold text-dark truncate "
>
  <Plus className="text-white" />{" "}
  <span className="truncate text-white">Add Task</span>
</button>; */
}

export default function Button({
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center cursor-pointer  justify-center gap-2 rounded-lg font-semibold transition-all truncate";

  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-white",
    outline: "border border-border-dark text-text-dark hover:bg-gray-800/40",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-gray-300 hover:bg-gray-700/40",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      {...props}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
