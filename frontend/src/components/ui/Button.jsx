import { Link } from "react-router-dom";

const base =
  "inline-block cursor-pointer rounded-[9px] px-7 py-3.5 text-center text-[14.5px] font-bold no-underline";

const variants = {
  primary: `${base} border border-primary bg-primary text-primary-foreground`,
  secondary: `${base} border border-border-strong bg-transparent text-text`,
  ghost: `${base} border border-primary bg-transparent text-primary`,
  danger: `${base} border border-danger bg-transparent text-danger`,
};

const Button = ({
  as = "button",
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
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