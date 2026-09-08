/**
 * Flaschenpost delivery van - a Peugeot e-Expert style panel van in side
 * profile, nose to the RIGHT.
 *
 * Proportions come from the real vehicle rather than from a box: overall
 * length : height is 2.74 : 1, the wheelbase is 0.62 of the length, the nose is
 * short and rounded, and the windscreen is raked far enough that it reads as a
 * narrow slanted band between the roof and the cowl.
 *
 * Tyre bottoms sit at y=392 in this 1200x460 viewBox - the counterpart to the
 * aircraft's y=350, so both land on the shared --ground line.
 *
 * Livery follows the real vehicle: white roof and upper band, magenta wrap over
 * the lower half, chartreuse banner on the rear cargo panel, bottle-cap roundel
 * ahead of it. Brand colours only - no logo reproduction.
 */

const REAR_X = 157;
const NOSE_X = 1051;
const ROOF_Y = 66;
const SILL_Y = 353;
const BELT_Y = 176;

const TYRE_R = 58;
const WHEEL_CY = 334;
const ARCH_R = 70;

const WHEELS = [
  { id: 'wheel-front', cx: 891 },
  { id: 'wheel-rear', cx: 336 },
];

/** Arch cut into the body sides, drawn right-to-left so it chains onto the sill. */
const arch = (cx, y) =>
  `L${cx + ARCH_R},${y} C${cx + ARCH_R},${WHEEL_CY - 44} ${cx + 45},${WHEEL_CY - ARCH_R} ${cx},${WHEEL_CY - ARCH_R} ` +
  `C${cx - 45},${WHEEL_CY - ARCH_R} ${cx - ARCH_R},${WHEEL_CY - 44} ${cx - ARCH_R},${y + 2} `;

const BODY =
  `M176,${ROOF_Y} L866,${ROOF_Y} ` +
  'C890,66 901,75 913,91 ' +               // roof rounds into the A-pillar
  'L967,166 C974,175 981,181 991,185 ' +   // windscreen down to the cowl
  'L1017,197 C1039,206 1050,223 1051,248 ' + // short bonnet, then the nose radius
  'L1052,292 C1053,323 1044,344 1027,350 ' + // front face down into the bumper
  arch(891, SILL_Y) +
  arch(336, SILL_Y + 3) +
  `L176,${SILL_Y + 5} C165,358 ${REAR_X + 1},352 ${REAR_X + 1},342 ` +
  `L${REAR_X},88 C${REAR_X},74 164,${ROOF_Y} 176,${ROOF_Y} Z`;

function Wheel({ id, cx, spinDeg }) {
  const bolts = Array.from({ length: 6 }, (_, i) => (i * Math.PI) / 3);
  const tread = Array.from({ length: 40 }, (_, i) => (i * Math.PI) / 20);
  return (
    <>
      <circle cx={cx} cy={WHEEL_CY} r={TYRE_R} fill="#1A1918" stroke="#0B0A0A" strokeWidth="2" />
      {tread.map((a, i) => (
        <rect
          key={`t${i}`}
          x={cx - 1.7}
          y={WHEEL_CY - TYRE_R}
          width="3.4"
          height="9"
          rx="1.6"
          fill="#2F2C29"
          transform={`rotate(${(i * 360) / 40} ${cx} ${WHEEL_CY})`}
        />
      ))}
      <circle cx={cx} cy={WHEEL_CY} r={TYRE_R - 11} fill="none" stroke="#2C2A27" strokeWidth="3" />
      <g
        id={id}
        style={{
          transformBox: 'view-box',
          transformOrigin: `${cx}px ${WHEEL_CY}px`,
          transform: `rotate(${spinDeg}deg)`,
        }}
      >
        <circle cx={cx} cy={WHEEL_CY} r="34" fill="url(#rimG)" stroke="#6E7276" strokeWidth="2" />
        {bolts.map((a, i) => (
          <path
            key={`s${i}`}
            d={`M${cx + Math.cos(a) * 9},${WHEEL_CY + Math.sin(a) * 9} L${cx + Math.cos(a + 0.42) * 31},${WHEEL_CY + Math.sin(a + 0.42) * 31} L${cx + Math.cos(a + 0.62) * 31},${WHEEL_CY + Math.sin(a + 0.62) * 31} Z`}
            fill="#8E9398"
            opacity=".55"
          />
        ))}
        <circle cx={cx} cy={WHEEL_CY} r="14" fill="#2A2C2E" stroke="#8E9398" strokeWidth="2" />
        {bolts.map((a, i) => (
          <circle key={`b${i}`} cx={cx + Math.cos(a) * 8.5} cy={WHEEL_CY + Math.sin(a) * 8.5} r="2.6" fill="#C9CDD1" />
        ))}
      </g>
    </>
  );
}

/** Bottle-cap roundel: a scalloped disc with a bottle silhouette. */
function Roundel({ cx, cy, r }) {
  const scallops = Array.from({ length: 24 }, (_, i) => (i * Math.PI) / 12);
  const s = r / 46;
  return (
    <g id="roundel">
      {scallops.map((a, i) => (
        <circle key={i} cx={cx + Math.cos(a) * r} cy={cy + Math.sin(a) * r} r={r * 0.14} fill="#FFFFFF" />
      ))}
      <circle cx={cx} cy={cy} r={r} fill="#FFFFFF" />
      <circle cx={cx} cy={cy} r={r - r * 0.13} fill="none" stroke="#A50A50" strokeWidth={r * 0.09} />
      <g fill="#A50A50" transform={`rotate(-32 ${cx} ${cy})`}>
        <path
          d={`M${cx - 6 * s},${cy - 28 * s} h${12 * s} v${9 * s} c0,${7 * s} ${8 * s},${8 * s} ${8 * s},${18 * s} v${20 * s} c0,${6 * s} ${-4 * s},${9 * s} ${-10 * s},${9 * s} h${-8 * s} c${-6 * s},0 ${-10 * s},${-3 * s} ${-10 * s},${-9 * s} v${-20 * s} c0,${-10 * s} ${8 * s},${-11 * s} ${8 * s},${-18 * s} z`}
        />
      </g>
    </g>
  );
}

export function Van({ frame }) {
  const { vanWheelDeg } = frame;
  return (
    <svg viewBox="0 0 1200 460" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="vanWhite" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="72%" stopColor="#F1EEEB" />
          <stop offset="100%" stopColor="#D8D2CD" />
        </linearGradient>
        <linearGradient id="vanMag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C4177A" />
          <stop offset="55%" stopColor="#A80B54" />
          <stop offset="100%" stopColor="#7C0740" />
        </linearGradient>
        <linearGradient id="vanGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#33424A" />
          <stop offset="100%" stopColor="#101A1F" />
        </linearGradient>
        <linearGradient id="rimG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E6E8EA" />
          <stop offset="55%" stopColor="#B6BABE" />
          <stop offset="100%" stopColor="#7E8286" />
        </linearGradient>
        <clipPath id="vanClip">
          <path d={BODY} />
        </clipPath>
      </defs>

      <ellipse cx="600" cy="398" rx="430" ry="13" fill="#0B1206" opacity=".5" />
      <path d={BODY} fill="url(#vanWhite)" />

      <g clipPath="url(#vanClip)">
        {/* magenta wrap: flat along the body, lifting over the front wing and
            stopping short of the pale bumper */}
        <path
          d={`M140,${BELT_Y + 12} L884,${BELT_Y + 10} C952,${BELT_Y + 16} 1012,214 1042,258 L1060,300 L1060,376 L140,376 Z`}
          fill="url(#vanMag)"
        />
        {/* pale bumper across the front lower face */}
        <path d="M974,300 C1016,296 1052,308 1060,324 L1060,376 L968,376 Z" fill="url(#vanWhite)" />
        <path d="M974,300 C1016,296 1052,308 1060,324" fill="none" stroke="#7C0740" strokeWidth="2.5" opacity=".5" />

        {/* rear cargo panel: the food-and-drinks banner */}
        <rect x="214" y="84" width="392" height="88" rx="8" fill="#8FC63D" />
        <text x="234" y="120" fontFamily="Archivo, Arial, sans-serif" fontSize="27" fontWeight="800" fill="#FFFFFF" letterSpacing="0.6">
          LEBENSMITTEL
        </text>
        <text x="234" y="154" fontFamily="Archivo, Arial, sans-serif" fontSize="27" fontWeight="800" fill="#FFFFFF" letterSpacing="0.6">
          UND GETRÄNKE
        </text>

        {/* glazed band, broken by the B-pillar */}
        <rect x="612" y="86" width="146" height="86" rx="10" fill="url(#vanGlass)" />
        <path d="M786,92 h56 l42,74 c1,3 -1,6 -5,6 h-93 z" fill="url(#vanGlass)" />
        <path d="M620,94 h52 l-32,66 h-20 z" fill="#8FA9B6" opacity=".18" />
        <path d="M794,98 h40 l-26,62 h-14 z" fill="#8FA9B6" opacity=".18" />

        {/* windscreen: a slanted band from the roof down to the cowl */}
        <path d="M866,74 C892,74 903,84 915,100 L969,170 C976,179 983,184 993,188 L898,190 L850,78 Z" fill="url(#vanGlass)" />
        <path d="M878,88 L950,178 L926,180 L858,90 Z" fill="#8FA9B6" opacity=".22" />
        <path d="M850,78 L898,190" stroke="#3A2028" strokeWidth="3.5" fill="none" opacity=".9" />

        {/* electric badge on the rear panel */}
        <g fill="none" stroke="#FFFFFF" strokeWidth="3" opacity=".95">
          <circle cx="248" cy="246" r="36" />
        </g>
        <text x="248" y="242" textAnchor="middle" fontFamily="Archivo, Arial, sans-serif" fontSize="19" fontWeight="800" fill="#FFFFFF">
          100 %
        </text>
        <text x="248" y="262" textAnchor="middle" fontFamily="Archivo, Arial, sans-serif" fontSize="13" fontWeight="700" fill="#FFFFFF" letterSpacing="0.4">
          ELEKTRISCH
        </text>
        <path d="M284,246 C312,234 340,236 362,248" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        <path d="M362,236 h16 v24 h-16 z M378,242 h12 M378,254 h12" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="4" strokeLinejoin="round" />

        <Roundel cx={452} cy={262} r={44} />
        <text x="508" y="277" fontFamily="Archivo, Arial, sans-serif" fontSize="38" fontWeight="800" fill="#FFFFFF" letterSpacing="0.4">
          GETRÄNKE
        </text>

        {/* roof highlight and the shaded lower rocker */}
        <path d={`M170,${ROOF_Y} L862,${ROOF_Y} L846,80 L168,84 Z`} fill="#FFFFFF" opacity=".6" />
        <path d={`M150,${SILL_Y - 14} L1060,${SILL_Y - 20} L1060,${SILL_Y + 14} L150,${SILL_Y + 14} Z`} fill="#2A0A19" opacity=".22" />
      </g>

      <path d={BODY} fill="none" stroke="#3A2028" strokeWidth="3" />

      {/* panel gaps: rear door, sliding door, cab door */}
      <g stroke="#7A5364" strokeWidth="2.5" opacity=".8" fill="none">
        <path d={`M606,${ROOF_Y + 6} V${SILL_Y}`} />
        <path d={`M766,${ROOF_Y + 6} V${SILL_Y - 1}`} />
        <path d={`M176,${ROOF_Y + 8} V${SILL_Y + 4}`} />
      </g>
      <g fill="#2E2B28">
        <rect x="676" y="196" width="60" height="10" rx="5" />
        <rect x="792" y="196" width="60" height="10" rx="5" />
      </g>

      {/* side step, mirror, lights */}
      <path d={`M424,${SILL_Y + 2} h390 a6,6 0 0 1 0,12 h-390 a6,6 0 0 1 0,-12 z`} fill="#B9BDC1" stroke="#6E7276" strokeWidth="2" />
      <path d="M944,140 h20" stroke="#2E2B28" strokeWidth="6" fill="none" />
      <rect x="960" y="114" width="22" height="42" rx="9" fill="#2E2B28" />
      <path d="M1010,222 L1044,240 C1051,244 1053,251 1049,257 L1008,247 Z" fill="url(#vanGlass)" stroke="#3A2028" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M1016,229 L1040,242" stroke="#F3E6A8" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".9" />
      <path d="M1012,240 L1036,251" stroke="#8FA9B6" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".55" />
      <rect x="162" y="248" width="18" height="44" rx="6" fill="#D0415F" stroke="#5A1B2B" strokeWidth="2" />

      <g fill="none" stroke="#241419" strokeWidth="4">
        <path d={`M961,${SILL_Y} C961,290 936,264 891,264 C846,264 821,290 821,${SILL_Y + 2}`} />
        <path d={`M406,${SILL_Y + 3} C406,293 381,267 336,267 C291,267 266,293 266,${SILL_Y + 5}`} />
      </g>

      <g id="wheels">
        {WHEELS.map((w) => (
          <Wheel key={w.id} id={w.id} cx={w.cx} spinDeg={vanWheelDeg} />
        ))}
      </g>
    </svg>
  );
}
