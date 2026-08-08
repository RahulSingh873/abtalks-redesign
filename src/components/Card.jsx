export default function Card({ children, className = "", padded = true, ...props }) {
  return (
    <div
      className={`rounded-2xl border border-border bg-surface ${padded ? "p-5" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
