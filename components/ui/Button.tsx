import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import styles from "./Button.module.css";

interface ButtonProps {
  variant?: "primary" | "secondary";
  href?: string;
  icon?: boolean;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  // Remaining HTML attributes (e.g. data-request-type, aria-*, onClick).
  [key: string]: unknown;
}

export default function Button({
  variant = "primary",
  href,
  icon = false,
  children,
  className,
  type = "button",
  disabled = false,
  ...rest
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    disabled ? styles.disabled : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {icon && <ArrowRight size={20} className={styles.icon} aria-hidden="true" />}
    </>
  );

  // href present → render an anchor with the same styling.
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={disabled || undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }

  // Otherwise render a native button.
  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}
