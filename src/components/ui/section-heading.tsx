type Props = {
  label: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  invert?: boolean;
};

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  invert = false,
}: Props) {
  const isCenter = align === "center";

  return (
    <div className={`mb-14 md:mb-20 ${isCenter ? "text-center" : ""}`}>
      <span
        className={`reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium mb-5 ${
          invert
            ? "bg-white/10 border border-white/20 text-white"
            : "bg-primary-soft text-primary border border-primary/15"
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {label}
      </span>
      <h2
        className={`reveal text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.15] ${
          invert ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`reveal mt-5 text-lg leading-relaxed ${
            isCenter ? "max-w-2xl mx-auto" : "max-w-2xl"
          } ${invert ? "text-slate-300" : "text-secondary"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
