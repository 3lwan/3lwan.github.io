/**
 * Flaschenpost Ford Transit Custom panel van, side profile, nose to the RIGHT.
 *
 * Tyre bottoms sit at y=392 in this 1200x460 viewBox - the counterpart to the
 * aircraft's y=350, so both land on the shared --ground line.
 *
 * Livery follows the real vehicle: white roof and upper band, magenta wrap over
 * the lower two thirds, chartreuse banner on the rear panel, bottle-cap roundel
 * on the sliding door. Brand colours only - no logo reproduction.
 */

const BODY =
  'M148,146 L690,136 C708,136 720,141 729,151 L858,181 C882,187 903,197 923,211 ' +
  'L1012,234 C1038,242 1052,256 1053,276 L1055,308 C1056,328 1047,344 1029,347 ' +
  'L992,348 C992,292 946,280 930,280 C914,280 868,292 868,348 L372,352 ' +
  'C372,296 326,284 310,284 C294,284 248,296 248,352 L150,354 ' +
  'C140,354 136,348 136,338 L134,162 C134,152 139,147 148,146 Z';

const WHEELS = [
  { id: 'wheel-front', cx: 930 },
  { id: 'wheel-rear', cx: 310 },
];
const TYRE_R = 52;
const WHEEL_CY = 340;

function Wheel({ id, cx, spinDeg }) {
  const bolts = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4);
  const tread = Array.from({ length: 26 }, (_, i) => (i * Math.PI) / 13);
  return (
    <>
      <circle cx={cx} cy={WHEEL_CY} r={TYRE_R} fill="#171615" stroke="#0B0A0A" strokeWidth="3" />
      <circle cx={cx} cy={WHEEL_CY} r={TYRE_R - 7} fill="none" stroke="#2E2C29" strokeWidth="4" />
      <g
        id={id}
        style={{
          transformBox: 'view-box',
          transformOrigin: `${cx}px ${WHEEL_CY}px`,
          transform: `rotate(${spinDeg}deg)`,
        }}
      >
        <circle cx={cx} cy={WHEEL_CY} r="33" fill="url(#rimG)" stroke="#6E7276" strokeWidth="2" />
        <circle cx={cx} cy={WHEEL_CY} r="25" fill="#232527" />
        <circle cx={cx} cy={WHEEL_CY} r="9" fill="#9AA0A5" />
        {bolts.map((a, i) => (
          <circle key={`b${i}`} cx={cx + Math.cos(a) * 17} cy={WHEEL_CY + Math.sin(a) * 17} r="3.4" fill="#0F1112" />
        ))}
        {tread.map((a, i) => (
          <rect
            key={`t${i}`}
            x={cx + Math.cos(a) * (TYRE_R - 4) - 2.6}
            y={WHEEL_CY + Math.sin(a) * (TYRE_R - 4) - 2.6}
            width="5.2"
            height="5.2"
            rx="1.4"
            fill="#33302C"
          />
        ))}
      </g>
    </>
  );
}

function Roundel({ cx = 470, cy = 298, r = 78 }) {
  const scallops = Array.from({ length: 26 }, (_, i) => (i * Math.PI) / 13);
  return (
    <g id="roundel">
      {scallops.map((a, i) => (
        <circle key={i} cx={cx + Math.cos(a) * r} cy={cy + Math.sin(a) * r} r="11" fill="#8FC63D" />
      ))}
      <circle cx={cx} cy={cy} r={r} fill="#8FC63D" />
      <circle cx={cx} cy={cy} r={r - 13} fill="none" stroke="#FFFFFF" strokeWidth="7" />
      <g fill="#FFFFFF" transform={`rotate(-34 ${cx} ${cy})`}>
        <path
          d={`M${cx - 13},${cy - 46} h26 v18 c0,10 11,17 11,30 v40 c0,9 -6,15 -15,15 h-18 c-9,0 -15,-6 -15,-15 v-40 c0,-13 11,-20 11,-30 z`}
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
          <stop offset="70%" stopColor="#F0EDEA" />
          <stop offset="100%" stopColor="#D6D0CB" />
        </linearGradient>
        <linearGradient id="vanMag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BE1470" />
          <stop offset="55%" stopColor="#A50A50" />
          <stop offset="100%" stopColor="#79063A" />
        </linearGradient>
        <linearGradient id="vanGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E3B42" />
          <stop offset="100%" stopColor="#0F171B" />
        </linearGradient>
        <linearGradient id="rimG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E4E6E8" />
          <stop offset="55%" stopColor="#B4B8BC" />
          <stop offset="100%" stopColor="#7C8084" />
        </linearGradient>
        <clipPath id="vanClip">
          <path d={BODY} />
        </clipPath>
      </defs>

      <ellipse cx="590" cy="398" rx="440" ry="13" fill="#0B1206" opacity=".5" />
      <path d={BODY} fill="url(#vanWhite)" />

      <g clipPath="url(#vanClip)">
        <path d="M120,252 L700,250 C790,250 880,262 1070,252 L1070,370 L120,370 Z" fill="url(#vanMag)" />
        <rect x="186" y="164" width="440" height="78" rx="9" fill="#8FC63D" />
        <text x="206" y="196" fontFamily="Archivo, Arial, sans-serif" fontSize="30" fontWeight="800" fill="#FFFFFF" letterSpacing="1">
          JETZT AUCH
        </text>
        <text x="206" y="230" fontFamily="Archivo, Arial, sans-serif" fontSize="30" fontWeight="800" fill="#FFFFFF" letterSpacing="1">
          LEBENSMITTEL!
        </text>
        <rect x="150" y="243" width="420" height="6" rx="3" fill="#E8E4DF" opacity=".85" />
        <path d="M420,318 L880,306 C892,305 898,310 898,318 L898,328 L420,336 Z" fill="#3A3733" opacity=".9" />
        <Roundel />
        <text x="646" y="300" fontFamily="Archivo, Arial, sans-serif" fontSize="38" fontWeight="800" fill="#FFFFFF" letterSpacing="0.5">
          GETRÄNKE-
        </text>
        <text x="646" y="338" fontFamily="Archivo, Arial, sans-serif" fontSize="38" fontWeight="800" fill="#FFFFFF" letterSpacing="0.5">
          LIEFERUNG
        </text>
        <path d="M140,146 L900,140 L900,158 L140,164 Z" fill="#FFFFFF" opacity=".55" />
      </g>
      <path d={BODY} fill="none" stroke="#3A2028" strokeWidth="3" />

      <path d="M872,182 L916,207 C930,216 940,228 944,240 L868,242 Z" fill="url(#vanGlass)" stroke="#3A2028" strokeWidth="2.5" />
      <rect x="748" y="160" width="106" height="80" rx="9" fill="url(#vanGlass)" stroke="#3A2028" strokeWidth="2.5" />
      <rect x="756" y="168" width="40" height="30" rx="6" fill="#7FA6B4" opacity=".35" />

      <g stroke="#7A5364" strokeWidth="2.5" opacity=".85" fill="none">
        <path d="M566,142 V350" />
        <path d="M742,140 V348" />
        <path d="M148,146 V352" />
      </g>
      <g fill="#2E2B28">
        <rect x="604" y="252" width="66" height="11" rx="5.5" />
        <rect x="778" y="250" width="66" height="11" rx="5.5" />
      </g>

      <path d="M944,206 h18" stroke="#2E2B28" strokeWidth="7" fill="none" />
      <rect x="958" y="182" width="20" height="46" rx="8" fill="#2E2B28" />
      <path d="M1004,250 L1050,262 C1056,264 1058,270 1056,276 L1004,272 Z" fill="#F4F1EC" stroke="#3A2028" strokeWidth="2.5" />
      <rect x="1010" y="296" width="44" height="16" rx="6" fill="#2E2B28" />
      <rect x="134" y="300" width="18" height="34" rx="5" fill="#C8455F" opacity=".9" />

      <g fill="none" stroke="#241419" strokeWidth="4">
        <path d="M992,348 C992,292 946,280 930,280 C914,280 868,292 868,348" />
        <path d="M372,352 C372,296 326,284 310,284 C294,284 248,296 248,352" />
      </g>

      <g id="wheels">
        {WHEELS.map((w) => (
          <Wheel key={w.id} id={w.id} cx={w.cx} spinDeg={vanWheelDeg} />
        ))}
      </g>
    </svg>
  );
}
