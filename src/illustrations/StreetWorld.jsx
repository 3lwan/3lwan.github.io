/** Dusk city street: sky, rooflines, lit windows, shopfronts and lamp posts. */
export function StreetSky() {
  return (
    <svg className="world-sky" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="skyFP" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#190514" />
          <stop offset="30%" stopColor="#750B40" />
          <stop offset="58%" stopColor="#A50A50" />
          <stop offset="82%" stopColor="#D97A78" />
          <stop offset="100%" stopColor="#E9D9C6" />
        </linearGradient>
        <radialGradient id="lampGlow">
          <stop offset="0%" stopColor="#FFD98A" stopOpacity=".5" />
          <stop offset="100%" stopColor="#FFD98A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="700" fill="url(#skyFP)" />
      <g fill="#5A1236" opacity=".62">
        <path d="M0 400h130v-56h96v56h150v-88h110v88h190v-42h140v42h180v-72h120v72h140v-38h184v298H0z" />
      </g>
    </svg>
  );
}

const LIT_WINDOWS = [
  [46, 118], [92, 118], [196, 60], [242, 96], [470, 24], [516, 60], [562, 24],
  [760, 118], [806, 118], [980, 60], [1026, 96], [1200, 24], [1246, 60], [1292, 24],
];

const KERB_CRATES = [
  [54, 186], [54, 138], [1300, 186],
];

export function StreetHorizon() {
  return (
    <svg className="world-horizon" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden="true">
      <g fill="#2A0C1E">
        <path d="M0 96h170v-60h150v60h130v-92h180v92h140v-46h200v46h170v-78h150v78h150v144H0z" />
      </g>
      <g fill="#FFD98A" opacity=".8">
        {LIT_WINDOWS.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="22" height="28" rx="2" />
        ))}
      </g>
      <g>
        <rect x="150" y="150" width="230" height="90" fill="#3A1226" />
        <path d="M142 146h246l-18 32H160z" fill="#82BE3C" />
        <rect x="890" y="150" width="250" height="90" fill="#3A1226" />
        <path d="M882 146h266l-18 32H900z" fill="#82BE3C" />
      </g>
      <g stroke="#180712" strokeWidth="8" fill="none">
        <path d="M110 240V30h62" />
        <path d="M1340 240V30h-62" />
      </g>
      <circle cx="176" cy="34" r="11" fill="#FFE7B0" />
      <circle cx="1274" cy="34" r="11" fill="#FFE7B0" />
      <circle cx="176" cy="34" r="130" fill="url(#lampGlow)" />
      <circle cx="1274" cy="34" r="130" fill="url(#lampGlow)" />
      <g>
        {KERB_CRATES.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width="110" height="48" rx="5" fill="#5A9632" stroke="#20300F" strokeWidth="3" />
            {[1, 2, 3].map((s) => (
              <line key={s} x1={x + s * 27} y1={y + 6} x2={x + s * 27} y2={y + 42} stroke="#9FD46A" strokeWidth="3" opacity=".7" />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}
