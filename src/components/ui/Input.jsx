export default function Input({
  label,
  hint,
  error,
  as = "input",
  className = "",
  children,
  ...props
}) {
  const Component = as;

  return (
    <label className="flex w-full flex-col gap-2">
      {label ? (
        <span className="text-sm font-medium text-slate-100">{label}</span>
      ) : null}
      <Component
        className={`w-full rounded-2xl border border-line bg-slate-950/50 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20 ${className}`}
        {...props}
      >
        {children}
      </Component>
      {error ? (
        <span className="text-xs text-danger">{error}</span>
      ) : hint ? (
        <span className="text-xs text-muted">{hint}</span>
      ) : null}
    </label>
  );
}
