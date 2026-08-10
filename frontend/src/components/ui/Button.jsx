import {Link } from "react-router-dom"
const VARIANT_CLASSES = {
  primary: 'border border-transparent bg-primary text-text-on-primary hover:bg-primary-hover active:bg-primary-active',
  outline: 'border border-border-strong bg-surface text-text hover:bg-surface-hover',
  danger: 'border border-transparent bg-danger text-white hover:bg-danger-hover',
  ghost: 'border border-transparent bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text',
};

const SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-base gap-2',
};

const BASE_CLASSNAME =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50';

/**
 * @typedef {Object} ButtonProps
 * @property {'primary'|'outline'|'danger'|'ghost'} [variant]
 * @property {'sm'|'md'|'lg'} [size]
 * @property {boolean} [fullWidth]
 * @property {import('react').ReactNode} [iconLeft]
 * @property {import('react').ReactNode} [iconRight]
 * @property {string} [href] - If set, renders as a Next.js Link styled like a button instead of a <button>. Covers the "Button that navigates" case without pulling in Radix Slot for a one-off.
 */

/** @param {ButtonProps & import('react').ButtonHTMLAttributes<HTMLButtonElement>} props */
export function Button({
  variant = 'primary',
  size = 'sm',
  fullWidth = false,
  iconLeft,
  iconRight,
  href,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const classes = [
    BASE_CLASSNAME,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ');

  const content = (
    <>
      {iconLeft && <span className="shrink-0">{iconLeft}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}