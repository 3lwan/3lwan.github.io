/**
 * Conze Informatik: a CEREC chairside CAD/CAM acquisition unit.
 *
 * A trolley on castors carrying a large monitor. The monitor is the point of
 * the scene - it is where the WPF/XAML desktop work actually lived, and the
 * model on screen is a tooth, so the dental domain and the GUI work are one
 * object rather than two unrelated motifs.
 *
 * Narrower viewBox than the vehicles (600 wide) because the unit is tall and
 * slim, but the same 460 height, so castor contact at y=392 lines up with the
 * shared ground line exactly as the wheeled vehicles do.
 */

const CASTORS = [
  { id: 'castor-left', cx: 246 },
  { id: 'castor-right', cx: 354 },
];

function ToothModel() {
  return (
    <g>
      {/* occlusal view of a molar, the way chairside CAD software renders it */}
      <path
        d="M300,150 C280,150 262,162 258,182 C254,204 258,228 268,244 C278,260 296,268 312,264
           C328,260 342,246 348,228 C356,206 354,178 342,164 C332,152 316,148 300,150 Z"
        fill="#7FD4B8"
        stroke="#1D6A57"
        strokeWidth="3"
      />
      <path
        d="M286,170 C280,186 282,206 290,222 M318,168 C326,184 326,208 318,226 M266,204 L344,200"
        fill="none"
        stroke="#2E8C74"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M292,158 C286,152 276,152 270,158" fill="none" stroke="#B8ECDB" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

export function CerecUnit({ frame }) {
  const { castorDeg, screenOpacity } = frame;

  return (
    <svg viewBox="0 0 600 460" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="cerecShell" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C9C6BE" />
          <stop offset="22%" stopColor="#F6F4EF" />
          <stop offset="70%" stopColor="#EAE7E0" />
          <stop offset="100%" stopColor="#B9B6AE" />
        </linearGradient>
        <linearGradient id="cerecBezel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D9D6CF" />
          <stop offset="30%" stopColor="#F7F5F0" />
          <stop offset="100%" stopColor="#C2BFB8" />
        </linearGradient>
        <linearGradient id="cerecScreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#123646" />
          <stop offset="100%" stopColor="#08202B" />
        </linearGradient>
        <radialGradient id="screenGlow" cx="50%" cy="45%">
          <stop offset="0%" stopColor="#2AA7C9" stopOpacity=".38" />
          <stop offset="100%" stopColor="#2AA7C9" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="300" cy="398" rx="150" ry="10" fill="#0A1418" opacity=".5" />

      {/* ---- monitor ---- */}
      <rect x="116" y="18" width="368" height="248" rx="12" fill="url(#cerecBezel)" stroke="#8E8B84" strokeWidth="3" />
      <rect x="134" y="34" width="332" height="200" rx="5" fill="url(#cerecScreen)" />

      <g style={{ opacity: screenOpacity }}>
        <rect x="134" y="34" width="332" height="200" rx="5" fill="url(#screenGlow)" />
        {/* the WPF application chrome: title bar, tool rail, status strip */}
        <rect x="134" y="34" width="332" height="18" fill="#15779B" />
        <g fill="#CFF0F8">
          <circle cx="146" cy="43" r="3.5" />
          <rect x="158" y="39" width="74" height="8" rx="3" />
        </g>
        <rect x="134" y="52" width="46" height="182" fill="#0E2C39" />
        {[62, 84, 106, 128, 150].map((y) => (
          <rect key={y} x="145" y={y} width="24" height="14" rx="3" fill="#15779B" opacity=".85" />
        ))}
        <ToothModel />
        {/* right-hand parameter panel */}
        <rect x="392" y="60" width="62" height="150" rx="4" fill="#0E2C39" />
        {[70, 92, 114, 136, 158, 180].map((y) => (
          <rect key={y} x="400" y={y} width="46" height="7" rx="3" fill="#3FA9C6" opacity=".7" />
        ))}
        <rect x="134" y="220" width="332" height="14" fill="#0E2C39" />
        <rect x="144" y="224" width="96" height="6" rx="3" fill="#3FA9C6" opacity=".8" />
      </g>

      {/* ---- neck ---- */}
      <path d="M282,266 h36 v28 h-36 z" fill="#D4D1CA" stroke="#8E8B84" strokeWidth="3" />
      <rect x="262" y="292" width="76" height="14" rx="6" fill="#BFBCB5" stroke="#8E8B84" strokeWidth="2.5" />

      {/* ---- tray: keyboard and trackball ---- */}
      <path d="M186,306 L414,306 C424,306 430,312 430,320 L430,330 L170,330 L170,320 C170,312 176,306 186,306 Z"
            fill="url(#cerecShell)" stroke="#8E8B84" strokeWidth="3" />
      <rect x="212" y="313" width="120" height="11" rx="3" fill="#9E9B95" />
      <circle cx="372" cy="318" r="9" fill="#9E9B95" stroke="#7C7972" strokeWidth="2" />

      {/* ---- cabinet ---- */}
      <path d="M196,330 L404,330 C412,330 418,336 418,344 L418,372 C418,380 412,386 404,386 L196,386
               C188,386 182,380 182,372 L182,344 C182,336 188,330 196,330 Z"
            fill="url(#cerecShell)" stroke="#8E8B84" strokeWidth="3" />
      <rect x="196" y="344" width="72" height="30" rx="4" fill="#DEDBD4" stroke="#A8A59E" strokeWidth="2" />
      <rect x="336" y="350" width="66" height="8" rx="4" fill="#15779B" opacity=".8" />
      {/* instrument cradle on the flank */}
      <path d="M418,342 C432,342 440,350 440,360 L440,372 L418,372 Z" fill="#DEDBD4" stroke="#8E8B84" strokeWidth="2.5" />
      {/* the acquisition camera on its cable */}
      <path d="M440,362 C462,368 470,382 462,392" fill="none" stroke="#6E6B66" strokeWidth="4" strokeLinecap="round" />

      {/* ---- castors ---- */}
      {CASTORS.map((c) => (
        <g key={c.id}>
          <rect x={c.cx - 7} y="384" width="14" height="0" fill="none" />
          <circle cx={c.cx} cy="380" r="12" fill="#2A2C31" stroke="#15161A" strokeWidth="2.5" />
          <g
            id={c.id}
            style={{
              transformBox: 'view-box',
              transformOrigin: `${c.cx}px 380px`,
              transform: `rotate(${castorDeg}deg)`,
            }}
          >
            <circle cx={c.cx} cy="380" r="5" fill="#8F959C" />
            <rect x={c.cx - 1.6} y="371" width="3.2" height="18" rx="1.6" fill="#5C6167" />
          </g>
        </g>
      ))}
      <path d="M232,386 h136" stroke="#8E8B84" strokeWidth="3" />
    </svg>
  );
}
