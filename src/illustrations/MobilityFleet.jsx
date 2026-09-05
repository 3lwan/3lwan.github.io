/**
 * INVERS shared-mobility fleet: a car-sharing city car, a shared moped and a
 * kick scooter, side profile, all facing right.
 *
 * All three contact the ground at y=392 in this 1200x460 viewBox - the same
 * line as the Flaschenpost van, so the fleet rolls in where the van left.
 *
 * INVERS builds the telematics that make a vehicle shareable, so each vehicle
 * carries its unit: a shark-fin antenna on the car, a pod on the moped stem,
 * a lock collar on the scooter. Kept small and dark on the car specifically -
 * a light bar across the roof plus a body stripe reads as a police car.
 */

const CAR_BODY =
  // Drawn to the proportions of a modern premium compact hatchback: length 579
  // to height 176 (~3.3:1), wheelbase 0.65 of length, wheel diameter 0.43 of
  // body height. Arced roof dropping to a tailgate spoiler, heavily raked
  // windscreen, blistered arches. No manufacturer badging.
  'M44,348 L42,306 C42,296 48,290 58,286 ' +      // rear bumper and panel
  'L150,236 ' +                                    // tailgate: steeply raked
  'C170,224 196,216 224,214 ' +                    // C-pillar into the roof
  'L360,212 C376,212 388,215 397,224 ' +           // roof, then the A-pillar
  'L487,268 C498,274 508,278 520,279 ' +           // windscreen: heavily raked
  'L576,284 ' +                                    // bonnet
  'C598,287 612,296 616,310 L619,336 C620,346 615,352 606,352 ' +
  'L556,353 C556,308 537,294 514,294 C491,294 470,308 470,354 ' +
  'L186,357 C186,314 165,300 137,300 C109,300 88,314 88,358 ' +
  'L54,358 C46,358 44,354 44,348 Z';

/** Every pane of side glass stops on this line. */
const BELTLINE = 264;

function Tyre({ id, cx, cy, r, rimR, spinDeg, spokes = 5, road = false }) {
  const arms = Array.from({ length: spokes }, (_, i) => (i * 360) / spokes);
  // A road tyre gets finer, more inset tread; coarse blocks read as off-road.
  const blocks = Math.max(10, Math.round(r * (road ? 0.9 : 0.5)));
  const size = road ? 2.4 : 3.8;
  const inset = road ? 6 : 2.5;
  const tread = Array.from({ length: blocks }, (_, i) => (i * 2 * Math.PI) / blocks);
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill="#15161A" stroke="#0A0B0D" strokeWidth="3" />
      <circle cx={cx} cy={cy} r={r - Math.max(4, r * 0.13)} fill="none" stroke="#2A2C31" strokeWidth="3.5" />
      <g
        id={id}
        style={{
          transformBox: 'view-box',
          transformOrigin: `${cx}px ${cy}px`,
          transform: `rotate(${spinDeg}deg)`,
        }}
      >
        <circle cx={cx} cy={cy} r={rimR} fill="url(#fleetRim)" stroke="#6F757C" strokeWidth="2" />
        <circle cx={cx} cy={cy} r={rimR * 0.3} fill="#2C3036" />
        {arms.map((deg) => (
          <rect
            key={deg}
            x={cx - rimR * (spokes > 6 ? 0.07 : 0.11)}
            y={cy - rimR + 2}
            width={rimR * (spokes > 6 ? 0.14 : 0.22)}
            height={rimR * 0.74}
            rx={rimR * 0.07}
            fill="#8F959C"
            transform={`rotate(${deg} ${cx} ${cy})`}
          />
        ))}
        {tread.map((a, i) => (
          <rect
            key={`t${i}`}
            x={cx + Math.cos(a) * (r - inset) - size / 2}
            y={cy + Math.sin(a) * (r - inset) - size / 2}
            width={size}
            height={size}
            rx="1"
            fill="#33363C"
          />
        ))}
      </g>
    </>
  );
}

export function MobilityFleet({ frame }) {
  const { carWheelDeg, mopedWheelDeg, kickWheelDeg } = frame;

  return (
    <svg viewBox="0 0 1200 460" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="carShell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDFDFE" />
          <stop offset="58%" stopColor="#E9ECF0" />
          <stop offset="100%" stopColor="#B4BAC2" />
        </linearGradient>
        <linearGradient id="carGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3E4E5B" />
          <stop offset="100%" stopColor="#161E26" />
        </linearGradient>
        <linearGradient id="mopedShell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1160C4" />
          <stop offset="55%" stopColor="#00469C" />
          <stop offset="100%" stopColor="#01306C" />
        </linearGradient>
        <linearGradient id="fleetRim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EDEFF1" />
          <stop offset="55%" stopColor="#BFC5CB" />
          <stop offset="100%" stopColor="#858C93" />
        </linearGradient>
        <clipPath id="carClip">
          <path d={CAR_BODY} />
        </clipPath>
      </defs>

      <ellipse cx="330" cy="396" rx="300" ry="10" fill="#04121F" opacity=".5" />
      <ellipse cx="790" cy="396" rx="120" ry="8" fill="#04121F" opacity=".45" />
      <ellipse cx="1060" cy="396" rx="95" ry="7" fill="#04121F" opacity=".4" />

      {/* ---------------- car-sharing hatchback ---------------- */}
      <path d={CAR_BODY} fill="url(#carShell)" />
      <g clipPath="url(#carClip)">
        {/* body-colour flanks with a soft reflection, as on a white car */}
        <path d="M70,296 C200,282 360,278 500,290 L500,306 C360,294 200,298 72,314 Z" fill="#FFFFFF" opacity=".55" />
        <path d="M96,326 C240,316 380,314 520,322 L520,332 C380,324 240,326 98,338 Z" fill="#9AA3AD" opacity=".35" />
      </g>
      <path d={CAR_BODY} fill="none" stroke="#1B2733" strokeWidth="3" />

      {/* the spoiler is a crease in the tailgate, not a bolted-on panel */}
      <path d="M152,240 L182,226" stroke="#B9C0C8" strokeWidth="2.5" fill="none" opacity=".9" />

      {/* glass: quarter light, rear door, front door - one beltline */}
      <path
        d={`M168,${BELTLINE} C182,246 198,234 212,226 L216,${BELTLINE} Z`}
        fill="url(#carGlass)" stroke="#1B2733" strokeWidth="2.5"
      />
      <path
        d={`M232,${BELTLINE} L234,215 L306,213 L306,${BELTLINE} Z`}
        fill="url(#carGlass)" stroke="#1B2733" strokeWidth="2.5"
      />
      <path
        d={`M322,${BELTLINE} L324,214 L360,212 C374,212 384,216 392,225 L430,${BELTLINE} Z`}
        fill="url(#carGlass)" stroke="#1B2733" strokeWidth="2.5"
      />
      <rect x="306" y="212" width="16" height="52" fill="#1B2733" />

      {/* telematics: a small dark shark fin, never a light bar */}
      <path d="M244,210 C250,200 262,195 274,194 L278,211 Z" fill="#243444" stroke="#111C26" strokeWidth="2" />
      <circle cx="272" cy="202" r="2.6" fill="#00C8AA" />

      {/* shut lines, character crease, handles */}
      <g stroke="#8B939C" strokeWidth="2.5" fill="none" opacity=".8">
        <path d="M228,222 V354" />
        <path d="M314,214 V354" />
        <path d="M436,268 C448,290 452,318 450,352" />
      </g>
      <path d="M120,300 C250,290 380,286 466,294" fill="none" stroke="#B9C0C8" strokeWidth="2.5" opacity=".9" />
      <g fill="#3A424B">
        <rect x="248" y="272" width="38" height="7" rx="3.5" />
        <rect x="344" y="274" width="38" height="7" rx="3.5" />
      </g>

      {/* side skirt, lamps, mirror */}
      <path d="M100,344 L548,338 L548,352 L100,358 Z" fill="#2B333C" />
      <path d="M572,286 L610,296 C616,298 617,304 613,307 L572,302 Z" fill="#20262E" stroke="#1B2733" strokeWidth="2.5" />
      <path d="M578,292 L604,299 C608,300 608,303 605,304 L578,300 Z" fill="#FFF4D6" />
      <path d="M43,298 L78,294 L80,310 L43,314 Z" fill="#C6362F" stroke="#1B2733" strokeWidth="2.5" />
      <path d="M432,250 h12" stroke="#3A424B" strokeWidth="4.5" />
      <path d="M440,242 C452,242 458,248 458,256 C458,262 452,264 444,262 L438,246 Z" fill="#2B333C" />

      <g fill="none" stroke="#141C23" strokeWidth="4">
        <path d="M556,353 C556,308 537,294 514,294 C491,294 470,308 470,354" />
        <path d="M186,357 C186,314 165,300 137,300 C109,300 88,314 88,358" />
      </g>
      <Tyre id="car-wheel-rear" cx={137} cy={352} r={40} rimR={29} spinDeg={carWheelDeg} spokes={10} road />
      <Tyre id="car-wheel-front" cx={514} cy={352} r={40} rimR={29} spinDeg={carWheelDeg} spokes={10} road />

      {/* ---------------- shared moped ---------------- */}
      <path d="M700,350 L800,350 C818,350 830,342 838,326" fill="none" stroke="#2A2C31" strokeWidth="8" strokeLinecap="round" />
      <path d="M676,332 C674,312 686,296 708,292 L756,282 L762,318 C736,322 712,332 696,346 Z" fill="url(#mopedShell)" stroke="#01234F" strokeWidth="3" />
      <path d="M690,300 C704,294 722,290 742,290 L744,300 C724,302 706,306 694,312 Z" fill="#00C8AA" />
      <path d="M818,320 C826,296 842,280 862,276 L880,272 L886,306 C866,310 848,318 838,332 Z" fill="url(#mopedShell)" stroke="#01234F" strokeWidth="3" />
      <path d="M682,290 C700,278 730,272 756,274 C762,274 764,280 758,284 C736,288 712,296 698,302 C690,304 678,296 682,290 Z" fill="#20242B" stroke="#0F1216" strokeWidth="2.5" />
      <path d="M876,272 L870,330" stroke="#3A424B" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M876,272 L872,254" stroke="#3A424B" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M852,248 L896,246" stroke="#20242B" strokeWidth="8" strokeLinecap="round" fill="none" />
      <rect x="856" y="254" width="30" height="14" rx="6" fill="#00C8AA" stroke="#0B3F3A" strokeWidth="2.5" />
      <path d="M884,278 L900,283 C905,285 905,292 900,294 L886,292 Z" fill="#FFF4D6" stroke="#1B2733" strokeWidth="2.5" />
      <Tyre id="moped-wheel-rear" cx={700} cy={358} r={34} rimR={19} spinDeg={mopedWheelDeg} />
      <Tyre id="moped-wheel-front" cx={870} cy={358} r={34} rimR={19} spinDeg={mopedWheelDeg} />

      {/* ---------------- kick scooter ---------------- */}
      {/* deck, with the rear kick-up over the back wheel */}
      <path d="M1006,372 C996,372 990,366 990,358 L992,350 L1112,344 C1122,343 1128,348 1128,356 L1128,362 L1010,372 Z"
            fill="#C6CBD1" stroke="#1B2026" strokeWidth="3" />
      <path d="M998,352 L1120,346 L1120,352 L998,358 Z" fill="#25292F" />
      {/* rear fender / friction brake */}
      <path d="M986,352 C976,338 962,336 954,344" fill="none" stroke="#25292F" strokeWidth="7" strokeLinecap="round" />
      {/* fork, steering tube, clamp */}
      <path d="M1140,366 L1146,268" stroke="#25292F" strokeWidth="9" strokeLinecap="round" fill="none" />
      <rect x="1134" y="252" width="18" height="26" rx="6" fill="#3A424B" stroke="#1B2026" strokeWidth="2.5" />
      {/* the lock collar - what makes it shareable */}
      <rect x="1132" y="286" width="22" height="14" rx="6" fill="#00C8AA" stroke="#0B3F3A" strokeWidth="2.5" />
      <path d="M1146,268 L1148,240" stroke="#25292F" strokeWidth="9" strokeLinecap="round" fill="none" />
      {/* T-bar and grips */}
      <path d="M1104,238 L1192,234" stroke="#25292F" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M1104,238 L1126,237" stroke="#111417" strokeWidth="13" strokeLinecap="round" fill="none" />
      <path d="M1170,235 L1192,234" stroke="#111417" strokeWidth="13" strokeLinecap="round" fill="none" />
      <Tyre id="kick-wheel-rear" cx={984} cy={366} r={26} rimR={14} spinDeg={kickWheelDeg} spokes={6} />
      <Tyre id="kick-wheel-front" cx={1140} cy={366} r={26} rimR={14} spinDeg={kickWheelDeg} spokes={6} />
    </svg>
  );
}
