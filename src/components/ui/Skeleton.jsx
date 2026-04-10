export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700/70 to-slate-800 ${className}`}
    />
  );
}
