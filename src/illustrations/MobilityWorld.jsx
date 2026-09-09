/** INVERS: a night city where the fleet lives - bays, route lines, chargers. */
export function MobilitySky() {
  return (
    <svg className="world-sky" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="skyINV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#040A1A" />
          <stop offset="34%" stopColor="#012C6B" />
          <stop offset="66%" stopColor="#00469C" />
          <stop offset="88%" stopColor="#1E86B8" />
          <stop offset="100%" stopColor="#7FE3D2" />
        </linearGradient>
        <radialGradient id="tealGlow">
          <stop offset="0%" stopColor="#00C8AA" stopOpacity=".42" />
          <stop offset="100%" stopColor="#00C8AA" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="700" fill="url(#skyINV)" />
      {/* route lines drawn across the sky like a live fleet map */}
      <g fill="none" stroke="#00C8AA" strokeOpacity=".32" strokeWidth="2" strokeDasharray="9 13">
        <path d="M-40,250 C240,190 520,300 820,236 C1060,186 1280,250 1500,208" />
        <path d="M-40,360 C260,318 480,392 760,344 C1040,296 1260,360 1500,318" />
      </g>
      <g fill="#00C8AA" opacity=".8">
        <circle cx="300" cy="222" r="5" />
        <circle cx="820" cy="236" r="5" />
        <circle cx="1180" cy="228" r="5" />
        <circle cx="470" cy="378" r="5" />
        <circle cx="1010" cy="330" r="5" />
      </g>
      <g fill="#021A3C" opacity=".85">
        <path d="M0 430h140v-72h104v72h150v-104h120v104h176v-56h150v56h164v-86h130v86h150v-42h196v312H0z" />
      </g>
    </svg>
  );
}

const TOWER_WINDOWS = [
  [58, 96], [104, 96], [58, 140], [212, 60], [258, 104], [430, 44], [476, 88],
  [640, 120], [686, 66], [900, 96], [946, 140], [1120, 52], [1166, 96], [1300, 110],
];

export function MobilityHorizon() {
  return (
    <svg className="world-horizon" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden="true">
      <g fill="#01142F">
        <path d="M0 110h160v-70h140v70h150v-96h170v96h150v-52h190v52h160v-82h160v82h160v134H0z" />
      </g>
      <g fill="#7FE3D2" opacity=".75">
        {TOWER_WINDOWS.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="20" height="26" rx="2" />
        ))}
      </g>
      {/* charging posts with teal status lamps */}
      <g>
        {[150, 700, 1250].map((x) => (
          <g key={x}>
            <rect x={x} y="150" width="16" height="90" rx="4" fill="#0A2A4E" />
            <rect x={x - 5} y="140" width="26" height="20" rx="6" fill="#0F3A66" stroke="#00C8AA" strokeWidth="2.5" />
            <circle cx={x + 8} cy="150" r="4" fill="#00C8AA" />
            <circle cx={x + 8} cy="150" r="34" fill="url(#tealGlow)" />
          </g>
        ))}
      </g>
      {/* painted bay markings on the far side of the street */}
      <g stroke="#7FE3D2" strokeOpacity=".35" strokeWidth="4" fill="none">
        <path d="M300,236 l34,-46 M420,236 l34,-46 M540,236 l34,-46 M900,236 l34,-46 M1020,236 l34,-46" />
      </g>
    </svg>
  );
}
