/** Backdrops for the three closing scenes. */

/* ---- 05 Education: a blueprint drawing office ---- */
export function BlueprintSky() {
  return (
    <svg className="world-sky" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="skyEdu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04121C" />
          <stop offset="45%" stopColor="#0A2E42" />
          <stop offset="100%" stopColor="#155066" />
        </linearGradient>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M60,0 L0,0 L0,60" fill="none" stroke="#7FD3E2" strokeWidth="1" opacity=".16" />
        </pattern>
      </defs>
      <rect width="1440" height="700" fill="url(#skyEdu)" />
      <rect width="1440" height="700" fill="url(#grid)" />
      {/* dimensioned construction lines, as on a technical drawing */}
      <g stroke="#7FD3E2" strokeWidth="1.4" opacity=".4" fill="none">
        <circle cx="330" cy="270" r="120" strokeDasharray="8 10" />
        <circle cx="330" cy="270" r="66" />
        <path d="M150,270 H510 M330,90 V450" strokeDasharray="14 8" />
        <path d="M980,180 h300 M980,174 v12 M1280,174 v12" />
        <path d="M1010,300 l120,-90 l150,60" strokeDasharray="6 8" />
      </g>
      <g fill="#7FD3E2" opacity=".55">
        <circle cx="330" cy="270" r="5" />
        <circle cx="1130" cy="210" r="5" />
      </g>
    </svg>
  );
}

export function BlueprintHorizon() {
  return (
    <svg className="world-horizon" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden="true">
      {/* a drawing board and shelving along the back wall */}
      <rect y="96" width="1440" height="144" fill="#0B2836" />
      <rect y="86" width="1440" height="14" rx="5" fill="#2A6076" opacity=".8" />
      <g fill="#123A4C" stroke="#092431" strokeWidth="2.5">
        <rect x="60" y="112" width="250" height="112" rx="5" />
        <rect x="1130" y="112" width="250" height="112" rx="5" />
      </g>
      <g fill="#2A6076" opacity=".85">
        <rect x="82" y="132" width="206" height="7" rx="3" />
        <rect x="82" y="152" width="150" height="7" rx="3" />
        <rect x="1152" y="132" width="206" height="7" rx="3" />
        <rect x="1152" y="152" width="120" height="7" rx="3" />
      </g>
      {/* an angled drafting board */}
      <g>
        <path d="M470,224 L560,110 L900,110 L860,224 Z" fill="#16455A" stroke="#092431" strokeWidth="2.5" />
        <path d="M556,124 L880,124 M540,150 L864,150 M520,180 L846,180" stroke="#5FA9C4" strokeWidth="2" opacity=".55" />
      </g>
    </svg>
  );
}

/* ---- 06 Languages: warm dusk, quiet ---- */
export function LanguagesSky() {
  return (
    <svg className="world-sky" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="skyLang" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#120A22" />
          <stop offset="38%" stopColor="#3B2258" />
          <stop offset="72%" stopColor="#8A4A72" />
          <stop offset="100%" stopColor="#E2A177" />
        </linearGradient>
      </defs>
      <rect width="1440" height="700" fill="url(#skyLang)" />
      <circle cx="1120" cy="470" r="90" fill="#FFE3B8" opacity=".85" />
      <circle cx="1120" cy="470" r="180" fill="#FFE3B8" opacity=".12" />
      <g fill="#FFE9D2" opacity=".55">
        {[[180, 120], [420, 84], [700, 150], [980, 96], [1290, 170], [560, 220], [860, 250]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" />
        ))}
      </g>
    </svg>
  );
}

export function LanguagesHorizon() {
  return (
    <svg className="world-horizon" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden="true">
      <g fill="#2B1B3C" opacity=".9">
        <path d="M0 150h150v-58h120v58h170v-86h140v86h190v-46h160v46h150v-70h130v70h230v90H0z" />
      </g>
      <g fill="#4A2C4E">
        <path d="M0 200h1440v40H0z" />
      </g>
      {/* trees, so the bench sits somewhere rather than nowhere */}
      <g>
        <rect x="230" y="150" width="12" height="90" fill="#2A1C24" />
        <circle cx="236" cy="140" r="42" fill="#3A2A3C" />
        <rect x="1200" y="150" width="12" height="90" fill="#2A1C24" />
        <circle cx="1206" cy="140" r="36" fill="#3A2A3C" />
      </g>
    </svg>
  );
}

/* ---- 07 Contact: first light, the end of the journey ---- */
export function ContactSky() {
  return (
    <svg className="world-sky" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="skyContact" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B1730" />
          <stop offset="40%" stopColor="#2C4A78" />
          <stop offset="74%" stopColor="#7C86A8" />
          <stop offset="100%" stopColor="#E9C9A4" />
        </linearGradient>
        <radialGradient id="dawn">
          <stop offset="0%" stopColor="#FFE6BE" stopOpacity=".8" />
          <stop offset="100%" stopColor="#FFE6BE" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="700" fill="url(#skyContact)" />
      <circle cx="600" cy="640" r="230" fill="url(#dawn)" />
      <circle cx="600" cy="646" r="54" fill="#FFF0D2" opacity=".9" />
      {/* a departing aircraft, closing the loop the story opened with */}
      <g opacity=".5" fill="#F2E7DE">
        <path d="M1130,214 L1178,206 L1210,214 L1176,222 Z" />
        <path d="M1160,210 L1146,192 L1152,190 L1174,208 Z" />
        <path d="M1160,218 L1148,232 L1154,234 L1174,220 Z" />
      </g>
      <path d="M900,240 C990,228 1070,220 1128,215" fill="none" stroke="#F2E7DE" strokeWidth="2" strokeDasharray="6 10" opacity=".35" />
    </svg>
  );
}

export function ContactHorizon() {
  return (
    <svg className="world-horizon" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden="true">
      <g fill="#243A54" opacity=".8">
        <path d="M0 170 C 220 120 420 190 660 150 C 900 110 1120 180 1440 138 L1440 240 L0 240 Z" />
      </g>
      <g fill="#16263A">
        <path d="M0 206 C 260 178 520 220 800 196 C 1060 174 1250 210 1440 190 L1440 240 L0 240 Z" />
      </g>
    </svg>
  );
}
