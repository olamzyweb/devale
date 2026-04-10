export default function Card({ children, className = "" }) {
  return (
    <section
      className={`glass-panel rounded-3xl border border-white/8 shadow-glow ${className}`}
    >
      {children}
    </section>
  );
}
