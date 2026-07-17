import type { ReactNode } from "react";
import styles from "./Card.module.css";

type CardTone = "paper" | "brand" | "ink" | "sunken" | "blueTint";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
  hover?: boolean;
  tone?: CardTone;
  hardShadow?: boolean;
  /* Soft "block" surface — hairline border, larger radius, soft shadow
     (reference: shadcnblocks feature/services cards) instead of the blocky
     2px-ink + hard-offset default. Opt-in per card. */
  soft?: boolean;
}

export default function Card({
  children,
  className,
  as = "div",
  hover = true,
  tone = "paper",
  hardShadow = false,
  soft = false,
}: CardProps) {
  const Tag = as;

  const classes = [
    styles.card,
    tone === "paper" ? null : styles[tone],
    soft ? styles.soft : null,
    hardShadow ? styles.hard : null,
    hover ? styles.hover : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
