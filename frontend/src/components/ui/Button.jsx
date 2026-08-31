import { Link } from "react-router-dom";

const base =
  "inline-block cursor-pointer rounded-[9px] px-7 py-3.5 text-center text-[14.5px] font-bold no-underline";

const variants = {
  primary: `${base} border border-primary bg-primary text-primary-foreground hover:bg-primary-dark`,
  secondary: `${base} border border-border-strong bg-transparent text-text hover:text-primary`,
  ghost: `${base} border border-primary bg-transparent text-primary hover:text-primary-dark hover:border-primary-dark`,
  danger: `${base} border border-danger bg-transparent text-danger hover:brightness-90`,
};

const Button = ({ as = "button", variant = "primary", children, className = "", ...props }) => {
  const classes = `${variants[variant]} ${className}`.trim();

  if (as === "link") {
    return (
      <Link className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (as === "a") {
    return (
      <a className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
