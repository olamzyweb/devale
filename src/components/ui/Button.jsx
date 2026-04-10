export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  ...props
}) {
  const variantClasses = {
    primary:
      "bg-accentStrong text-slate-950 hover:bg-accent disabled:bg-sky-900/60 disabled:text-slate-300",
    secondary:
      "border border-line bg-panelAlt text-slate-100 hover:border-sky-400/40 hover:bg-slate-800/80 disabled:opacity-60",
    ghost:
      "text-slate-300 hover:bg-slate-800/60 hover:text-white disabled:opacity-60",
    danger:
      "bg-danger/90 text-white hover:bg-danger disabled:bg-rose-900/70"
  };

  const sizeClasses = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-5 text-sm"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400/40 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
