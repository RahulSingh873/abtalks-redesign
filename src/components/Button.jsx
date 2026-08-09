export default function Button({
  as: Tag = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const base =
    "focus-ring inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-ember text-ink hover:bg-ember-light shadow-[0_8px_24px_-8px_rgba(46,200,102,0.55)]",
    secondary:
      "bg-surface-3 text-text hover:bg-[#31364a] border border-border",
    ghost: "bg-transparent text-text hover:bg-surface-2",
    outline: "bg-transparent border border-border text-text hover:border-ember/60",
    success: "bg-mint text-ink hover:brightness-110",
    subtle: "bg-surface-2 text-muted hover:text-text",
  };

  const sizes = {
    sm: "text-sm px-3 py-2",
    md: "text-[15px] px-4 py-3",
    lg: "text-base px-5 py-4",
  };

  return (
    <Tag className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
