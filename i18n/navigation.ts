import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation APIs. Internal links should use this `Link` (and
// usePathname/useRouter) so the active locale + prefix are preserved.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
