export default function BrandLogo({ compact = false }) {
  return (
    <span className="brandLockup" aria-label="RevHack AI">
      <svg
        aria-hidden="true"
        className="brandMark"
        fill="none"
        viewBox="0 0 56 56"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect fill="#151515" height="56" rx="12" width="56" />
        <g opacity="0.36" stroke="#827B72" strokeWidth="0.65">
          <path d="M8 8v40M18 8v40M28 8v40M38 8v40M48 8v40" />
          <path d="M8 8h40M8 18h40M8 28h40M8 38h40M8 48h40" />
        </g>
        <path d="M12 12h10l4 4v9l-4 4H12V12Z" fill="#F7F1E7" />
        <path d="M16 16h5l1.5 1.5v5L21 24h-5v-8Z" fill="#151515" />
        <path d="M12 31h5l10 13h-6L12 35v-4Z" fill="#FF4D08" />
        <path d="M30 12h5v12h7V12h5v32h-5V30h-7v14h-5V12Z" fill="#F7F1E7" />
        <path d="m48 18 3.5 3.5-3.5 3.5-3.5-3.5L48 18Z" fill="#FFCB3D" />
        <path d="m48 31 3.5 3.5-3.5 3.5-3.5-3.5L48 31Z" fill="#FF4D08" />
        <path d="M48 25v6" stroke="#F7F1E7" strokeWidth="1.5" />
      </svg>
      {!compact && (
        <span className="brandName">
          REVHACK <i>AI</i>
        </span>
      )}
    </span>
  );
}
