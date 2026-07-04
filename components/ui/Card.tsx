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
}

export default function Card({
  children,
  className,
  as = "div",
  hover = true,
  tone = "paper",
  hardShadow = false,
}: CardProps) {
  const Tag = as;

  const classes = [
    styles.card,
    tone === "paper" ? null : styles[tone],
    hardShadow ? styles.hard : null,
    hover ? styles.hover : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
