import { CarSharing, CAR_DEFS } from './CarSharing';

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
        {CAR_DEFS}
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
      </defs>

      <ellipse cx="790" cy="396" rx="120" ry="8" fill="#04121F" opacity=".45" />
      <ellipse cx="1060" cy="396" rx="95" ry="7" fill="#04121F" opacity=".4" />

      <CarSharing spinDeg={carWheelDeg} />

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
