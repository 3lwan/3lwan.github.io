/**
 * Eurowings A320, side profile, nose to the RIGHT.
 *
 * Ground contact (all wheels, gear down) sits at y=350 in this 1200x460
 * viewBox. That number is load-bearing: --ground in index.css positions this
 * and the van against one shared ground line, which is what lets the van take
 * over exactly where the aircraft finished rolling out.
 *
 * Every part overlaps whatever it attaches to - the pylon is drawn before the
 * nacelle, the sharklet base sits inside the wing tip, and the main gear is
 * placed aft of the engine so it is not buried behind it.
 */

const CABIN_WINDOWS = Array.from({ length: 27 }, (_, i) => 470 + i * 21.5);
const DOORS = [
  [1006, 32],
  [820, 30],
  [470, 30],
  [260, 26],
];

export function Aircraft({ frame }) {
  const { gearMainDeg, gearNoseDeg, gearOpacity, spoilerDeg, smokeOpacity, smokeScale } = frame;

  return (
    <svg viewBox="0 0 1200 460" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#F7F3F1" />
          <stop offset="66%" stopColor="#E2D9D6" />
          <stop offset="100%" stopColor="#B3A6A5" />
        </linearGradient>
        <linearGradient id="finG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B32A6C" />
          <stop offset="100%" stopColor="#6F1444" />
        </linearGradient>
        <linearGradient id="wingG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2ECEA" />
          <stop offset="100%" stopColor="#AA9D9C" />
        </linearGradient>
        <linearGradient id="nacG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="58%" stopColor="#E6DDD9" />
          <stop offset="100%" stopColor="#96898A" />
        </linearGradient>
        <radialGradient id="fanG">
          <stop offset="0%" stopColor="#6B6567" />
          <stop offset="65%" stopColor="#2C282B" />
          <stop offset="100%" stopColor="#151316" />
        </radialGradient>
        <linearGradient id="glassG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CDECF5" />
          <stop offset="100%" stopColor="#476F82" />
        </linearGradient>
        <clipPath id="hullClip">
          <path d="M1130,232 C1114,208 1090,192 1054,190 L480,186 C400,184 300,178 168,166 C214,188 268,214 340,234 C400,250 450,258 500,260 L1046,262 C1088,261 1114,252 1130,232 Z" />
        </clipPath>
      </defs>

      {/* far wing - sweeps aft, stays under the fuselage roof */}
      <path d="M782,222 C700,212 580,202 482,194 L452,197 C540,211 662,227 772,238 Z" fill="#9C8F91" opacity=".8" />
      {/* horizontal stabiliser */}
      <path d="M344,214 C292,204 240,192 196,182 L162,187 C210,201 268,219 332,233 Z" fill="#BCB0AF" stroke="#4A4144" strokeWidth="2" />
      {/* vertical stabiliser */}
      <path d="M398,186 C352,140 292,86 240,54 C236,50 232,50 226,52 L182,58 C178,58 176,62 178,68 C186,110 190,150 192,186 Z" fill="url(#finG)" stroke="#4A4144" strokeWidth="2" />
      <path d="M262,72 C276,116 284,152 288,186 L192,186 C190,150 186,110 178,68 C176,62 178,58 182,58 L226,52 Z" fill="#CF4E8B" opacity=".55" />

      {/* sharklet - base buried inside the wing tip */}
      <path d="M434,318 C424,296 422,276 428,258 L448,258 C446,278 450,300 458,320 Z" fill="#AF1E65" stroke="#4A4144" strokeWidth="2" />

      <g
        id="gearNose"
        style={{
          transformBox: 'view-box',
          transformOrigin: '1012px 254px',
          transform: `rotate(${gearNoseDeg}deg)`,
          opacity: gearOpacity,
        }}
      >
        <rect x="1005" y="250" width="14" height="66" rx="6" fill="#8D8A88" stroke="#4A4144" strokeWidth="2" />
        <circle cx="1012" cy="332" r="18" fill="#1D1B1C" stroke="#4A4144" strokeWidth="2" />
        <circle cx="1012" cy="332" r="7" fill="#9B9896" />
      </g>

      <path d="M1130,232 C1114,208 1090,192 1054,190 L480,186 C400,184 300,178 168,166 C214,188 268,214 340,234 C400,250 450,258 500,260 L1046,262 C1088,261 1114,252 1130,232 Z" fill="url(#hull)" stroke="#4A4144" strokeWidth="2.5" />
      <g clipPath="url(#hullClip)">
        <path d="M320,240 L1160,244 L1160,300 L320,300 Z" fill="#AF1E65" />
        <path d="M320,234 L1160,238 L1160,244 L320,240 Z" fill="#6F1444" opacity=".65" />
        <path d="M470,190 L1060,194 C1060,202 1042,205 1006,205 L480,200 Z" fill="#FFFFFF" opacity=".9" />
        {CABIN_WINDOWS.map((x) => (
          <rect key={x} x={x} y={214} width={9} height={11} rx={4} fill="#3E4A52" opacity=".92" />
        ))}
        {DOORS.map(([x, w]) => (
          <rect key={x} x={x} y={200} width={w} height={62} rx={9} fill="none" stroke="#BCAFAE" strokeWidth={2} />
        ))}
        <rect x="690" y="204" width="26" height="50" rx="8" fill="none" stroke="#BCAFAE" strokeWidth="2" />
        <path d="M1046,202 L1094,208 C1101,210 1104,215 1102,221 L1044,221 Z" fill="url(#glassG)" stroke="#4A4144" strokeWidth="1.8" />
        <path d="M1022,202 L1038,202 L1036,221 L1020,221 Z" fill="url(#glassG)" stroke="#4A4144" strokeWidth="1.8" />
        <path d="M1080,194 C1096,208 1102,226 1098,244" fill="none" stroke="#B6A9A8" strokeWidth="1.8" />
        <path d="M168,166 C300,178 400,184 480,186 L480,200 C398,198 296,190 176,176 Z" fill="#C2B4B3" opacity=".5" />
      </g>

      {/* near wing - crosses in front of the belly */}
      <path d="M862,244 C740,262 600,288 462,318 L438,326 C442,336 452,340 464,338 C600,314 730,292 846,272 Z" fill="url(#wingG)" stroke="#4A4144" strokeWidth="2.5" />

      <g id="spoilers" fill="#EDE6E3" stroke="#4A4144" strokeWidth="2">
        {[
          [756, 250],
          [694, 259],
          [632, 270],
        ].map(([x, y]) => (
          <rect
            key={x}
            x={x}
            y={y}
            width={46}
            height={8}
            rx={3}
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'right bottom',
              transform: `rotate(${spoilerDeg}deg)`,
            }}
          />
        ))}
      </g>

      <g
        id="gearMain"
        style={{
          transformBox: 'view-box',
          transformOrigin: '530px 256px',
          transform: `rotate(${gearMainDeg}deg)`,
          opacity: gearOpacity,
        }}
      >
        <path d="M508,250 h44 v14 h-44 z" fill="#C9BDBA" stroke="#4A4144" strokeWidth="2" />
        <rect x="522" y="256" width="17" height="62" rx="7" fill="#8D8A88" stroke="#4A4144" strokeWidth="2" />
        <rect x="506" y="304" width="48" height="11" rx="5" fill="#6E6B69" />
        <circle cx="512" cy="329" r="21" fill="#1D1B1C" stroke="#4A4144" strokeWidth="2" />
        <circle cx="548" cy="329" r="21" fill="#1D1B1C" stroke="#4A4144" strokeWidth="2" />
        <circle cx="512" cy="329" r="8" fill="#9B9896" />
        <circle cx="548" cy="329" r="8" fill="#9B9896" />
      </g>

      {/* pylon before nacelle, so the engine visibly hangs from the wing */}
      <path d="M700,286 L728,254 L776,246 L750,282 Z" fill="#C6B9B7" stroke="#4A4144" strokeWidth="2" />
      <path d="M800,286 C816,300 816,330 798,342 L668,346 C630,342 612,326 614,312 C616,294 638,282 668,280 Z" fill="url(#nacG)" stroke="#4A4144" strokeWidth="2.5" />
      <path d="M796,284 C810,298 810,332 794,344 L772,344 C788,330 788,296 774,284 Z" fill="#AF1E65" />
      <ellipse cx="797" cy="313" rx="11" ry="29" fill="url(#fanG)" stroke="#4A4144" strokeWidth="2" />
      <path d="M614,316 C610,328 616,340 630,344" fill="none" stroke="#4A4144" strokeWidth="2.5" />

      <g
        id="smoke"
        fill="#FBF2EE"
        style={{
          /* tyre smoke should read as thin dust, not solid shapes */
          opacity: smokeOpacity * 0.5,
          transformBox: 'fill-box',
          transformOrigin: 'center',
          transform: `scale(${smokeScale})`,
        }}
      >
        <circle cx="486" cy="344" r="18" />
        <circle cx="446" cy="336" r="14" />
        <circle cx="412" cy="344" r="11" />
        <circle cx="574" cy="342" r="15" />
        <circle cx="612" cy="334" r="11" />
      </g>
    </svg>
  );
}
