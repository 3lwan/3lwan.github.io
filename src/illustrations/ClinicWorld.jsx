/**
 * Conze Informatik: a dental practice treatment room.
 *
 * Deliberately the calmest, brightest world in the story - it is the earliest
 * job, and the scenes cool and settle as the visitor scrolls back in time.
 */
export function ClinicSky() {
  return (
    <svg className="world-sky" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="clinicWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B2732" />
          <stop offset="45%" stopColor="#14556E" />
          <stop offset="100%" stopColor="#2E93B4" />
        </linearGradient>
        <linearGradient id="clinicWindow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BFE7F2" />
          <stop offset="100%" stopColor="#5FA9C4" />
        </linearGradient>
        <radialGradient id="lampCone">
          <stop offset="0%" stopColor="#FFF8E4" stopOpacity=".5" />
          <stop offset="100%" stopColor="#FFF8E4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="700" fill="url(#clinicWall)" />
      {/* window band along the treatment room wall */}
      <g>
        <rect x="120" y="150" width="500" height="300" rx="10" fill="url(#clinicWindow)" opacity=".55" />
        <rect x="860" y="150" width="440" height="300" rx="10" fill="url(#clinicWindow)" opacity=".55" />
        <g stroke="#0B2732" strokeWidth="10" fill="none" opacity=".65">
          <path d="M370,150 V450 M120,300 H620 M1080,150 V450 M860,300 H1300" />
        </g>
      </g>
      {/* operating light on its arm */}
      <g>
        <path d="M720,60 L720,180 C720,196 736,206 754,206" fill="none" stroke="#0B2732" strokeWidth="10" />
        <ellipse cx="790" cy="212" rx="62" ry="20" fill="#EFF6F8" stroke="#0B2732" strokeWidth="5" />
        <ellipse cx="790" cy="220" rx="46" ry="12" fill="#FFF8E4" />
        <ellipse cx="790" cy="330" rx="200" ry="140" fill="url(#lampCone)" />
      </g>
    </svg>
  );
}

export function ClinicHorizon() {
  return (
    <svg className="world-horizon" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden="true">
      {/* cabinetry running along the back wall */}
      <rect y="70" width="1440" height="170" fill="#0E3A4B" />
      <rect y="58" width="1440" height="18" rx="6" fill="#DCE9ED" />
      <g fill="#12495E" stroke="#0A2E3C" strokeWidth="3">
        {[40, 260, 480, 960, 1180].map((x) => (
          <rect key={x} x={x} y="86" width="200" height="130" rx="6" />
        ))}
      </g>
      <g fill="#8FC7D8">
        {[130, 350, 570, 1050, 1270].map((x) => (
          <rect key={x} x={x} y="140" width="44" height="8" rx="4" />
        ))}
      </g>
      {/* a treatment chair, kept in silhouette so the CEREC unit stays the subject */}
      <g fill="#0A2E3C" opacity=".9">
        <path d="M700,216 C700,180 726,158 762,156 L900,150 C920,149 930,160 928,176 L924,216 Z" />
        <rect x="742" y="120" width="120" height="44" rx="18" />
        <rect x="800" y="200" width="22" height="40" />
      </g>
    </svg>
  );
}
