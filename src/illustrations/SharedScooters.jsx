/**
 * The two smaller vehicles in the INVERS fleet: a shared moped and a kick
 * scooter.
 *
 * Drawn to the same standard as the car - hairline outlines, gradient-modelled
 * surfaces and detailed wheels. Flat fills with 3-unit strokes next to a
 * shaded car made these two look like clip art by comparison.
 *
 * Both contact the ground at y=392, the shared line for every vehicle.
 */

const INK = '#101A24';

/**
 * A filled band between two radii - used for mudguards, which hug the tyre.
 * Sampled rather than built from SVG arcs, so the sweep direction cannot be
 * got wrong. Angles in degrees, measured with y pointing down.
 */
function arcBand(cx, cy, rOuter, rInner, degFrom, degTo, steps = 24) {
  const point = (r, deg) => {
    const a = (deg * Math.PI) / 180;
    return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;
  };
  const outer = Array.from({ length: steps + 1 }, (_, i) =>
    point(rOuter, degFrom + ((degTo - degFrom) * i) / steps)
  );
  const inner = Array.from({ length: steps + 1 }, (_, i) =>
    point(rInner, degTo + ((degFrom - degTo) * i) / steps)
  );
  return `M${outer.join(' L')} L${inner.join(' L')} Z`;
}

/** Small wheel with a five-spoke alloy and a visible tyre shoulder. */
function SmallWheel({ id, cx, cy, r, spinDeg, spokes = 5, rimRatio = 0.6 }) {
  const rim = r * rimRatio;
  const arms = Array.from({ length: spokes }, (_, i) => (i * 360) / spokes);
  return (
    <g>
      <path
        d={`M${cx - r - 3},${cy + 2} a${r + 3},${r + 3} 0 0 1 ${2 * (r + 3)},0 z`}
        fill="#050A10"
        opacity=".5"
      />
      <circle cx={cx} cy={cy} r={r} fill="url(#scooterTyre)" />
      <circle cx={cx} cy={cy} r={r - 1.5} fill="none" stroke="#05070A" strokeWidth="0.9" opacity=".8" />
      <circle cx={cx} cy={cy} r={rim + 2.5} fill="#0D1116" />
      <g
        id={id}
        style={{
          transformBox: 'view-box',
          transformOrigin: `${cx}px ${cy}px`,
          transform: `rotate(${spinDeg}deg)`,
        }}
      >
        <circle cx={cx} cy={cy} r={rim} fill="url(#scooterAlloy)" stroke="#79828C" strokeWidth="0.8" />
        {arms.map((deg) => (
          <path
            key={deg}
            transform={`rotate(${deg} ${cx} ${cy})`}
            d={`M${cx - 1.7},${cy - 2} L${cx - rim * 0.34},${cy - rim * 0.9} L${cx + rim * 0.34},${cy - rim * 0.9} L${cx + 1.7},${cy - 2} Z`}
            fill="url(#scooterAlloy)"
            stroke="#828B95"
            strokeWidth="0.6"
          />
        ))}
        <circle cx={cx} cy={cy} r={rim * 0.26} fill="#DDE2E7" stroke="#828B95" strokeWidth="0.7" />
        <path d={`M${cx - 1.6},${cy - r + 3.5} h3.2 v2.4 h-3.2 z`} fill="#4A5058" opacity=".75" />
      </g>
    </g>
  );
}

export function Moped({ spinDeg }) {
  return (
    <g>
      <ellipse cx="788" cy="393" rx="118" ry="7" fill="#04121F" opacity=".5" />

      {/* rear body over the drive wheel */}
      <path
        d="M666,342 C662,318 672,300 692,293 L752,281 C767,279 775,286 777,298 L781,332 C753,334 720,342 700,354 Z"
        fill="url(#mopedBody)"
        stroke={INK}
        strokeWidth="1.3"
      />
      <path d="M682,306 C698,298 718,292 742,290 L744,300 C722,303 702,308 688,315 Z" fill="#00C8AA" opacity=".95" />
      <path d="M676,300 C692,290 714,284 740,282 L741,287 C716,289 695,295 680,304 Z" fill="#FFFFFF" opacity=".28" />

      {/* seat */}
      <path
        d="M672,295 C688,278 722,269 753,271 C761,271 763,280 755,284 C727,288 700,297 686,305 C677,310 668,301 672,295 Z"
        fill="#1B2026"
        stroke="#080B0E"
        strokeWidth="1.1"
      />
      <path d="M690,286 C710,279 732,276 750,276" fill="none" stroke="#49525C" strokeWidth="1.1" opacity=".8" />

      {/* floorboard */}
      <path d="M700,344 L800,340 L802,353 L700,357 Z" fill="#2B333C" stroke={INK} strokeWidth="1.1" />
      <path d="M708,346 L796,343" stroke="#5A646E" strokeWidth="0.9" opacity=".8" />

      {/* leg shield */}
      <path
        d="M800,341 C806,308 820,286 840,275 L862,266 L873,301 C856,309 843,321 835,337 Z"
        fill="url(#mopedBody)"
        stroke={INK}
        strokeWidth="1.3"
      />
      <path d="M812,320 C818,300 828,288 842,280 L846,289 C834,296 825,306 820,322 Z" fill="#FFFFFF" opacity=".22" />

      {/* front fender, fork, column */}
      <path d={arcBand(880, 356, 45, 38, 196, 344)} fill="#2B333C" stroke={INK} strokeWidth="1.1" />
      <path d={arcBand(880, 356, 44, 41, 210, 330)} fill="#5A646E" opacity=".55" />
      <path d="M884,302 L880,348" stroke="#3D4650" strokeWidth="5.5" strokeLinecap="round" fill="none" />
      <path d="M884,300 L877,260" stroke="#3D4650" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M854,252 L902,248" stroke="#1B2026" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M854,252 L866,251" stroke="#0A0D10" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M892,249 L902,248" stroke="#0A0D10" strokeWidth="9" strokeLinecap="round" fill="none" />

      {/* telematics pod, headlamp, mirror */}
      <rect x="858" y="256" width="28" height="12" rx="5" fill="#00C8AA" stroke="#0B3F3A" strokeWidth="1.1" />
      <path d="M865,272 C877,269 888,273 891,281 L868,286 Z" fill="#20262E" stroke={INK} strokeWidth="1.1" />
      <path d="M869,275 C877,273 884,276 886,281 L870,283 Z" fill="#FFF6DF" />
      <path d="M896,244 C902,238 909,238 911,243 C912,247 908,250 903,249 Z" fill="#2B333C" />

      <SmallWheel id="moped-wheel-rear" cx={700} cy={356} r={36} spinDeg={spinDeg} />
      <SmallWheel id="moped-wheel-front" cx={880} cy={356} r={36} spinDeg={spinDeg} />
    </g>
  );
}

export function KickScooter({ spinDeg }) {
  return (
    <g>
      <ellipse cx="1064" cy="393" rx="92" ry="6" fill="#04121F" opacity=".45" />

      {/* deck, rising to the neck at the front */}
      <path
        d="M1002,374 C992,374 986,368 987,360 L990,352 L1112,342 C1124,341 1130,347 1129,356 L1128,362 L1006,374 Z"
        fill="url(#deckG)"
        stroke={INK}
        strokeWidth="1.3"
      />
      <path d="M994,354 L1122,344 L1122,350 L994,360 Z" fill="#1D2127" />
      {/* grip tape */}
      <g fill="#333A41" opacity=".9">
        {Array.from({ length: 16 }, (_, i) => (
          <rect key={i} x={999 + i * 7.6} y={354 - i * 0.62} width="3.4" height="4.4" rx="1" />
        ))}
      </g>

      {/* rear fender brake */}
      <path d="M984,352 C974,338 960,336 952,344" fill="none" stroke="#20262E" strokeWidth="5.5" strokeLinecap="round" />

      {/* fork, steering tube, clamp, bar */}
      <path d="M1134,368 L1141,272" stroke="#20262E" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M1141,272 L1144,244" stroke="#2B333C" strokeWidth="7.5" strokeLinecap="round" fill="none" />
      <rect x="1130" y="256" width="17" height="22" rx="5" fill="#39424B" stroke={INK} strokeWidth="1.1" />
      <path d="M1133,259 h4 v16 h-4 z" fill="#6C7681" opacity=".7" />
      {/* lock collar: what makes it shareable */}
      <rect x="1128" y="288" width="21" height="13" rx="5" fill="#00C8AA" stroke="#0B3F3A" strokeWidth="1.1" />
      <path d="M1100,242 L1188,238" stroke="#20262E" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M1100,242 L1122,241" stroke="#0A0D10" strokeWidth="11" strokeLinecap="round" fill="none" />
      <path d="M1166,239 L1188,238" stroke="#0A0D10" strokeWidth="11" strokeLinecap="round" fill="none" />
      <path d="M1103,240 L1119,239" stroke="#4A535C" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".8" />

      <SmallWheel id="kick-wheel-rear" cx={984} cy={368} r={24} spinDeg={spinDeg} spokes={6} rimRatio={0.52} />
      <SmallWheel id="kick-wheel-front" cx={1134} cy={368} r={24} spinDeg={spinDeg} spokes={6} rimRatio={0.52} />
    </g>
  );
}

export const SCOOTER_DEFS = (
  <>
    <linearGradient id="mopedBody" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#2A7BE0" />
      <stop offset="45%" stopColor="#0F58B4" />
      <stop offset="100%" stopColor="#02306E" />
    </linearGradient>
    <linearGradient id="deckG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#D9DEE4" />
      <stop offset="60%" stopColor="#AEB6BF" />
      <stop offset="100%" stopColor="#7C848D" />
    </linearGradient>
    <linearGradient id="scooterAlloy" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#EDF0F3" />
      <stop offset="50%" stopColor="#BEC5CC" />
      <stop offset="100%" stopColor="#868E97" />
    </linearGradient>
    <radialGradient id="scooterTyre" cx="42%" cy="38%">
      <stop offset="0%" stopColor="#22262B" />
      <stop offset="70%" stopColor="#13161A" />
      <stop offset="100%" stopColor="#08090B" />
    </radialGradient>
  </>
);
