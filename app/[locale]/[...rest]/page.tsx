import { notFound } from "next/navigation";

// Catch-all for unknown paths within a locale → renders the localized 404
// (app/[locale]/not-found.tsx). Needed because the whole app lives under
// [locale]; the proxy routes non-locale paths to the default locale, which then
// land here.
export default function CatchAllPage() {
  notFound();
}
