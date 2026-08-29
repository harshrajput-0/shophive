import { CATEGORIES } from "../../utils/constants.js";

// eslint-disable-next-line react-refresh/only-export-components
export const chipClass = (active) =>
  `inline-flex items-center gap-2 px-5 py-[11px] rounded-full border font-semibold text-[0.9rem] cursor-pointer ${
    active
      ? "bg-primary border-primary text-primary-foreground"
      : "bg-transparent border-border-strong text-text-secondary"
  }`;
export function CategoryChips({ value, onChange, includeAll = true }) {
  return (
    <div className="flex flex-wrap gap-3 mb-11.5">
      {includeAll && (
        <button className={chipClass(!value)} onClick={() => onChange("")}>
          All
        </button>
      )}

      {CATEGORIES.map((c) => (
        <button key={c} className={chipClass(value === c)} onClick={() => onChange(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}
