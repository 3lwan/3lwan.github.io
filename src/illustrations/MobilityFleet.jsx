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
  'M40,356 L38,290 C38,276 45,267 58,264 L150,232 C161,225 175,220 190,219 ' +
  'L372,214 C392,214 407,221 418,233 L486,282 C498,290 516,294 535,296 ' +
  'L596,303 C615,306 626,317 627,333 L629,352 C630,359 625,363 616,363 ' +
  'L572,364 C572,314 543,302 522,302 C501,302 470,314 470,365 ' +
  'L202,368 C202,318 173,306 152,306 C131,306 100,318 100,369 ' +
  'L52,370 C44,370 39,366 39,358 Z';

function Tyre({ id, cx, cy, r, rimR, spinDeg, spokes = 5 }) {
  const arms = Array.from({ length: spokes }, (_, i) => (i * 360) / spokes);
  // tread block count scales with the tyre, so small wheels do not look coarse
  const blocks = Math.max(10, Math.round(r * 0.5));
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
            x={cx - rimR * 0.11}
            y={cy - rimR + 2}
            width={rimR * 0.22}
            height={rimR * 0.72}
            rx={rimR * 0.11}
            fill="#8F959C"
            transform={`rotate(${deg} ${cx} ${cy})`}
          />
        ))}
        {tread.map((a, i) => (
          <rect
            key={`t${i}`}
            x={cx + Math.cos(a) * (r - 2.5) - 1.9}
            y={cy + Math.sin(a) * (r - 2.5) - 1.9}
            width="3.8"
            height="3.8"
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

      {/* ---------------- car-sharing city car ---------------- */}
      <path d={CAR_BODY} fill="url(#carShell)" />
      <g clipPath="url(#carClip)">
        {/* a low rocker only - no full-height two-tone, which reads as livery */}
        <path d="M20,346 L640,342 L640,380 L20,380 Z" fill="#0E4F9E" opacity=".9" />
        <path d="M60,228 L400,220 L400,236 L60,244 Z" fill="#FFFFFF" opacity=".45" />
      </g>
      <path d={CAR_BODY} fill="none" stroke="#1B2733" strokeWidth="3" />

      <path d="M170,242 L194,230 L286,227 L286,268 L154,270 Z" fill="url(#carGlass)" stroke="#1B2733" strokeWidth="2.5" />
      <path d="M300,227 L378,224 C386,226 392,231 398,238 L442,280 L300,278 Z" fill="url(#carGlass)" stroke="#1B2733" strokeWidth="2.5" />
      <rect x="289" y="226" width="8" height="52" fill="#1B2733" />

      {/* telematics: a small dark shark fin, not a light bar */}
      <path d="M232,219 C238,208 250,201 264,200 L268,219 Z" fill="#243444" stroke="#111C26" strokeWidth="2" />
      <circle cx="262" cy="212" r="2.6" fill="#00C8AA" />
      {/* brand mark on the door, in place of a stripe */}
      <circle cx="352" cy="318" r="13" fill="#00C8AA" opacity=".92" />
      <path d="M346,318 h12 M352,312 v12" stroke="#04303A" strokeWidth="3" strokeLinecap="round" />

      <g stroke="#8B939C" strokeWidth="2.5" fill="none" opacity=".9">
        <path d="M186,236 V356" />
        <path d="M296,278 V358" />
      </g>
      <g fill="#3A424B">
        <rect x="214" y="286" width="40" height="8" rx="4" />
        <rect x="330" y="286" width="40" height="8" rx="4" />
      </g>
      <path d="M596,306 L624,314 C630,316 632,322 630,328 L596,326 Z" fill="#FFF4D6" stroke="#1B2733" strokeWidth="2.5" />
      <rect x="40" y="300" width="14" height="24" rx="5" fill="#D2463F" stroke="#1B2733" strokeWidth="2.5" />
      <path d="M418,240 h18" stroke="#3A424B" strokeWidth="5.5" />
      <rect x="434" y="233" width="13" height="21" rx="5" fill="#3A424B" />

      <g fill="none" stroke="#141C23" strokeWidth="4">
        <path d="M572,364 C572,314 543,302 522,302 C501,302 470,314 470,365" />
        <path d="M202,368 C202,318 173,306 152,306 C131,306 100,318 100,369" />
      </g>
      <Tyre id="car-wheel-rear" cx={152} cy={350} r={42} rimR={26} spinDeg={carWheelDeg} />
      <Tyre id="car-wheel-front" cx={522} cy={350} r={42} rimR={26} spinDeg={carWheelDeg} />

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
