// eslint-disable-next-line react-refresh/only-export-components
export const ICON_BUTTON_SIZE_CLASSES = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

// Exported so non-button usages (e.g. an <a> for an external social link)
// can render the identical look without duplicating the button itself.
export const ICON_BUTTON_BASE_CLASSNAME =
  "inline-flex items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-colors duration-150 hover:bg-surface-hover hover:text-text";

// Borderless variant — used for inline overflow-menu triggers (comment
// ⋯, post ⋯, follow ⋯) and modal close buttons, where the mock has no
// border/background, just a hover state.
export const ICON_BUTTON_GHOST_CLASSNAME =
  "inline-flex items-center justify-center rounded-full border border-transparent bg-transparent text-text-muted transition-colors duration-150 hover:bg-surface-hover hover:text-text";

/**
 * @typedef {Object} IconButtonProps
 * @property {import('react').ReactNode} icon
 * @property {string} label - used for aria-label + title
 * @property {'xs'|'sm'|'md'|'lg'} [size]
 * @property {'bordered'|'ghost'} [variant]
 */

/** @param {IconButtonProps & import('react').ButtonHTMLAttributes<HTMLButtonElement>} props */
export function IconButton({
  icon,
  label,
  size = "sm",
  variant = "bordered",
  className = "",
  ...rest
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={[
        variant === "ghost" ? ICON_BUTTON_GHOST_CLASSNAME : ICON_BUTTON_BASE_CLASSNAME,
        ICON_BUTTON_SIZE_CLASSES[size],
        className,
      ].join(" ")}
      {...rest}
    >
      {icon}
    </button>
  );
}
