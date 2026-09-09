/**
 * Eurowings A320-200, true side profile, nose to the RIGHT.
 *
 * The geometry is derived from the real aircraft at a fixed scale of
 * 25.6 px/m (37.57 m of length -> 962 px of hull), so the stations below are
 * measurements rather than eyeballed curves. Move one and the rest lie:
 *
 *   fuselage        3.95 m diameter -> 101 px deep, centreline y=249.5
 *   overall height 11.76 m          -> fin tip y=50
 *   nose gear       5.07 m aft      -> x=1000
 *   wing root LE   16.90 m aft      -> x=697
 *   main gear      17.70 m aft      -> x=677
 *   nacelle         4.40 x 2.37 m   -> 113 x 58 px, 0.6 m ground clearance
 *
 * Ground contact (all wheels, gear down) sits at y=350 in this 1200x460
 * viewBox. That number is load-bearing: --ground in index.css positions this
 * and the van against one shared ground line, which is what lets the van take
 * over exactly where the aircraft finished rolling out.
 *
 * Being an orthographic side view has three consequences worth knowing:
 *   - both wings project onto each other, so the far wing and far tailplane
 *     are drawn a few pixels off and muted - just enough parallax to stop the
 *     shape reading flat;
 *   - an A320 main leg carries a side-by-side wheel PAIR, not a tandem bogie,
 *     so you see one wheel with the far one peeking out behind it;
 *   - the near engine genuinely sits in front of the near main gear. It is
 *     drawn the other way round here, because the gear coming down is a beat
 *     in the scroll story and a leg hidden behind a nacelle cannot play it.
 */

const HULL =
  'M182,240 C240,258 320,296 400,300 L1012,300 C1058,298 1094,291 1112,281 ' +
  'C1126,273 1132,268 1131,262 C1130,251 1121,240 1106,230 C1082,212 1050,201 1012,199 ' +
  'L400,199 C330,199 250,201 178,210 Z';

/* pax doors and the two overwing exits, which are shorter and narrower */
const DOORS = [
  { x: 976, y: 224, w: 30, h: 52 },
  { x: 733, y: 230, w: 17, h: 40 },
  { x: 695, y: 230, w: 17, h: 40 },
  { x: 362, y: 224, w: 30, h: 52 },
];

/* cabin windows sit above the centreline, and step around the doors */
const CABIN_WINDOWS = Array.from({ length: 26 }, (_, i) => 380 + i * 22.5).filter(
  (x) => !DOORS.some((d) => x + 9 > d.x - 5 && x < d.x + d.w + 5),
);

/* spoiler panels lie along the wing trailing edge, which rakes up at 23 deg */
const SPOILERS = [
  [512, 279],
  [490, 269],
  [468, 260],
];
const WING_RAKE = 23;

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
        <linearGradient id="fairG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0E9E7" />
          <stop offset="100%" stopColor="#BCAFAE" />
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
          <path d={HULL} />
        </clipPath>
      </defs>

      {/* the far tailplane, offset by its dihedral - the only surface with
          enough separation to be worth drawing twice in a side view */}
      <path d="M344,248 C312,239 278,229 228,221 L190,232 L242,258 Z" fill="#6E6264" opacity=".55" />

      {/* dorsal fillet, then the fin: swept leading edge, rounded tip */}
      <path d="M440,204 C406,202 384,196 372,208 Z" fill="#B32A6C" stroke="#4A4144" strokeWidth="2" />
      <path
        d="M372,208 C332,156 288,102 258,60 C254,52 248,48 240,50 L194,56 C186,58 182,62 184,70
           C198,118 212,162 222,208 Z"
        fill="url(#finG)"
        stroke="#4A4144"
        strokeWidth="2"
      />
      <path
        d="M266,74 C282,124 294,166 302,208 L222,208 C212,162 198,118 184,70 C182,62 186,58 194,56 L240,50 Z"
        fill="#CF4E8B"
        opacity=".5"
      />

      {/* nose gear is drawn before the hull, so it retracts up into the belly */}
      <g
        id="gearNose"
        style={{
          transformBox: 'view-box',
          transformOrigin: '1000px 292px',
          transform: `rotate(${gearNoseDeg}deg)`,
          opacity: gearOpacity,
        }}
      >
        <rect x="993" y="288" width="13" height="52" rx="5" fill="#8D8A88" stroke="#4A4144" strokeWidth="2" />
        <circle cx="1007" cy="339" r="11" fill="#141214" stroke="#4A4144" strokeWidth="1.5" />
        <circle cx="998" cy="339" r="11" fill="#1D1B1C" stroke="#4A4144" strokeWidth="2" />
        <circle cx="998" cy="339" r="4" fill="#9B9896" />
      </g>

      <path d={HULL} fill="url(#hull)" stroke="#4A4144" strokeWidth="2.5" />
      <g clipPath="url(#hullClip)">
        <path d="M160,276 L1180,276 L1180,320 L160,320 Z" fill="#AF1E65" />
        <path d="M160,270 L1180,270 L1180,276 L160,276 Z" fill="#6F1444" opacity=".6" />
        {CABIN_WINDOWS.map((x) => (
          <rect key={x} x={x} y={228} width={9} height={12} rx={4} fill="#3E4A52" opacity=".92" />
        ))}
        {DOORS.map((d) => (
          <rect key={d.x} x={d.x} y={d.y} width={d.w} height={d.h} rx={7} fill="none" stroke="#BCAFAE" strokeWidth={2} />
        ))}
        {/* the painted cockpit mask is what makes a nose read as an airliner */}
        <path d="M1016,212 L1100,221 C1112,226 1116,236 1112,244 L1016,244 Z" fill="#2C2A2E" opacity=".9" />
        <path d="M1050,218 L1096,225 C1104,227 1106,233 1104,239 L1052,239 Z" fill="url(#glassG)" stroke="#4A4144" strokeWidth="1.6" />
        <path d="M1026,219 L1044,218 L1042,239 L1024,239 Z" fill="url(#glassG)" stroke="#4A4144" strokeWidth="1.6" />
        {/* radome seam */}
        <path d="M1086,206 C1102,222 1108,244 1102,264" fill="none" stroke="#B6A9A8" strokeWidth="1.8" />
        {/* APU exhaust in the blunt end of the tail cone */}
        <ellipse cx="182" cy="224" rx="7" ry="10" fill="#514649" />
      </g>

      {/* horizontal stabiliser, on the upswept cone */}
      <path
        d="M352,256 C318,246 282,236 232,228 L194,238 L246,266 Z"
        fill="#8A7D7F"
        stroke="#4A4144"
        strokeWidth="2"
      />

      {/* wing-to-body fairing: the belly bulge the wing box actually roots into */}
      <path
        d="M800,286 C792,300 758,309 700,310 L572,308 C514,306 486,298 484,286 Z"
        fill="url(#fairG)"
        stroke="#4A4144"
        strokeWidth="1.6"
      />

      {/* pylon behind the wing, engine in front of it: the near nacelle is the
          closest thing to the camera on this side of the aircraft */}
      <path d="M598,282 L644,266 L670,270 L624,286 Z" fill="#C6B9B7" stroke="#4A4144" strokeWidth="2" />

      {/* near wing: root chord at the fairing, sweeping aft and up to the tip */}
      <path
        d="M697,281 C640,268 560,254 497,242 L453,246 C500,258 522,271 542,285 Z"
        fill="url(#wingG)"
        stroke="#4A4144"
        strokeWidth="2.5"
      />
      <path d="M697,283 C640,270 560,256 500,244 L497,250 C558,262 638,276 694,288 Z" fill="#7E7274" opacity=".28" />
      {/* leading-edge root fairing, so the wing grows out of the body */}
      <path d="M712,283 C706,274 702,270 694,268 L697,281 Z" fill="#D9D0CE" stroke="#4A4144" strokeWidth="1.6" />
      {/* sharklet: raked aft, tapering, and short of the fuselage crown */}
      <path
        d="M497,242 C494,230 492,220 495,211 L474,207 C466,220 459,233 453,246 Z"
        fill="#AF1E65"
        stroke="#4A4144"
        strokeWidth="1.8"
      />
      <path d="M495,211 C492,220 494,230 497,242 L488,240 C486,229 488,218 492,209 Z" fill="#CF4E8B" opacity=".5" />

      <g id="spoilers" fill="#EDE6E3" stroke="#4A4144" strokeWidth="1.8">
        {SPOILERS.map(([x, y]) => (
          <rect
            key={x}
            x={x}
            y={y}
            width={34}
            height={7}
            rx={2}
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'right bottom',
              transform: `rotate(${WING_RAKE + spoilerDeg}deg)`,
            }}
          />
        ))}
      </g>

      <path
        d="M634,276 C646,278 653,290 653,305 C653,320 646,332 634,334 L588,334
           C572,332 564,321 564,305 C564,289 572,278 588,276 Z"
        fill="url(#nacG)"
        stroke="#4A4144"
        strokeWidth="2.5"
      />
      <path
        d="M630,276 C643,279 649,291 649,305 C649,319 643,331 630,334 L610,334
           C623,330 629,318 629,305 C629,292 623,280 610,276 Z"
        fill="#AF1E65"
      />
      <ellipse cx="649" cy="305" rx="10" ry="28" fill="url(#fanG)" stroke="#4A4144" strokeWidth="2" />
      <path d="M564,291 L542,297 L542,313 L564,320 Z" fill="#B7ABA9" stroke="#4A4144" strokeWidth="2" />
      <path d="M542,301 L526,306 L542,311 Z" fill="#6E6564" stroke="#4A4144" strokeWidth="1.6" />

      <g
        id="gearMain"
        style={{
          transformBox: 'view-box',
          transformOrigin: '677px 292px',
          transform: `rotate(${gearMainDeg}deg)`,
          opacity: gearOpacity,
        }}
      >
        <rect x="669" y="288" width="16" height="48" rx="6" fill="#8D8A88" stroke="#4A4144" strokeWidth="2" />
        <rect x="660" y="325" width="34" height="9" rx="4" fill="#6E6B69" />
        <circle cx="687" cy="335" r="15" fill="#141214" stroke="#4A4144" strokeWidth="1.5" />
        <circle cx="675" cy="335" r="15" fill="#1D1B1C" stroke="#4A4144" strokeWidth="2" />
        <circle cx="675" cy="335" r="6" fill="#9B9896" />
      </g>

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
        <circle cx="612" cy="345" r="16" />
        <circle cx="570" cy="339" r="12" />
        <circle cx="536" cy="345" r="9" />
        <circle cx="962" cy="344" r="12" />
        <circle cx="930" cy="338" r="9" />
      </g>
    </svg>
  );
}
