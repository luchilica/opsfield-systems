import type { ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
  hover?: boolean;
}

export default function Card({
  children,
  className,
  as = "div",
  hover = true,
}: CardProps) {
  const Tag = as;

  const classes = [styles.card, hover ? styles.hover : null, className]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
