import styles from "./SkipLink.module.css";

// Allows keyboard users to jump past the header straight to <main id="main-content">.
export default function SkipLink() {
  return (
    <a href="#main-content" className={styles.skipLink}>
      Skip to main content
    </a>
  );
}
