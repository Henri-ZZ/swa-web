/**
 * Optional third-party promotion badge.
 * To remove it later, delete this component and its single usage in site-footer.tsx.
 */
export function FoundrListBadge() {
  return (
    <a
      href="https://www.foundrlist.com/product/stealthbrowserassistant?utm_source=badge&amp;utm_medium=embed"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View Stealth Browser Assistant on FoundrList"
      className="mt-5 inline-flex rounded-md transition-opacity hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-[var(--purple-bright)] focus:ring-offset-2 focus:ring-offset-[var(--dark)]"
      data-no-image-zoom
    >
      {/* The badge is served dynamically by FoundrList. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://www.foundrlist.com/api/badge/stealthbrowserassistant"
        alt="Featured on FoundrList"
        width="150"
        height="48"
        className="h-12 w-[150px]"
        loading="lazy"
      />
    </a>
  );
}
