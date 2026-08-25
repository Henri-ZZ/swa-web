/**
 * Optional third-party promotion badges.
 * To remove them later, delete this component and its single usage in
 * site-footer.tsx.
 */
export function FooterBadges() {
  return (
    <div
      className="flex flex-wrap items-center gap-3"
      data-no-image-zoom
      aria-label="Featured listings"
    >
      <a
        href="https://www.foundrlist.com/product/stealthbrowserassistant?utm_source=badge&amp;utm_medium=embed"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View Stealth Browser Assistant on FoundrList"
        className="inline-flex rounded-md transition-opacity hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-[var(--purple-bright)] focus:ring-offset-2 focus:ring-offset-[var(--dark)]"
      >
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

      <a
        href="https://launchkiwi.com/p/stealth-browser-assistant"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View Stealth Browser Assistant on LaunchKiwi"
        className="inline-flex rounded-md transition-opacity hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-[var(--purple-bright)] focus:ring-offset-2 focus:ring-offset-[var(--dark)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://launchkiwi.com/badge-light.svg"
          alt="Featured on LaunchKiwi"
          width="198"
          height="62"
          className="h-[62px] w-[198px]"
          loading="lazy"
        />
      </a>
    </div>
  );
}
