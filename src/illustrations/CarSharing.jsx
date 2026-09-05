/**
 * The car-sharing hatchback, drawn to the proportions of a modern premium
 * five-door: length 3.3x height, wheelbase 0.65 of length, wheel diameter 0.43
 * of body height. Unbadged.
 *
 * A white car reads as white because of what it reflects, not because it is
 * filled with white. The body carries four soft tonal bands - sky along the
 * shoulder, a darker horizon through the doors, ground bounce at the sill, and
 * a diagonal specular sweep - plus hairline panel gaps. Flat fills and heavy
 * outlines are what make vector cars look like clip art.
 *
 * Contact patch sits at y=392, the shared ground line for every vehicle.
 */

const BODY =
  'M44,348 L42,306 C42,296 48,290 58,286 ' +
  'L150,236 C170,224 196,216 224,214 ' +
  'L360,212 C376,212 388,215 397,224 ' +
  'L487,268 C498,274 508,278 520,279 ' +
  'L576,284 C598,287 612,296 616,310 ' +
  'L619,336 C620,346 615,352 606,352 ' +
  'L556,353 C556,308 537,294 514,294 C491,294 470,308 470,354 ' +
  'L186,357 C186,314 165,300 137,300 C109,300 88,314 88,358 ' +
  'L54,358 C46,358 44,354 44,348 Z';

const BELTLINE = 264;
const INK = '#20272E';

/** Five twin-spoke alloy with a disc and caliper behind it. */
function Alloy({ id, cx, cy, r, spinDeg }) {
  const rim = r * 0.72;
  const pairs = Array.from({ length: 5 }, (_, i) => (i * 360) / 5);
  return (
    <g>
      {/* Arch shadow over the top of the tyre only. A full circle spills below
          the contact patch and makes the car look like it is floating. */}
      <path
        d={`M${cx - r - 4},${cy + 2} a${r + 4},${r + 4} 0 0 1 ${2 * (r + 4)},0 z`}
        fill="#0A0E12"
        opacity=".55"
      />
      {/* tyre */}
      <circle cx={cx} cy={cy} r={r} fill="url(#tyreG)" />
      <circle cx={cx} cy={cy} r={r - 2} fill="none" stroke="#0B0D10" strokeWidth="1" opacity=".8" />
      <circle cx={cx} cy={cy} r={rim + 3.5} fill="#101317" />
      {/* brake disc and caliper stay put while the wheel turns */}
      <circle cx={cx} cy={cy} r={rim * 0.62} fill="#4A5058" />
      <circle cx={cx} cy={cy} r={rim * 0.62} fill="none" stroke="#2E343B" strokeWidth="1" />
      <path
        d={`M${cx - rim * 0.66},${cy - 7} a${rim * 0.66},${rim * 0.66} 0 0 0 0,14 l6,0 0,-14 z`}
        fill="#7A2B28"
      />
      <g
        id={id}
        style={{
          transformBox: 'view-box',
          transformOrigin: `${cx}px ${cy}px`,
          transform: `rotate(${spinDeg}deg)`,
        }}
      >
        <circle cx={cx} cy={cy} r={rim} fill="url(#alloyG)" />
        <circle cx={cx} cy={cy} r={rim} fill="none" stroke="#7B838C" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={rim - 2.5} fill="none" stroke="#FBFCFD" strokeWidth="1" opacity=".55" />
        {pairs.map((deg) => (
          <g key={deg} transform={`rotate(${deg} ${cx} ${cy})`} fill="url(#alloyG)" stroke="#868E97" strokeWidth="0.7">
            <path d={`M${cx - 1.6},${cy - 4} L${cx - rim * 0.5},${cy - rim * 0.86} L${cx - rim * 0.17},${cy - rim * 0.94} L${cx + 1},${cy - 5} Z`} />
            <path d={`M${cx + 1.6},${cy - 4} L${cx + rim * 0.5},${cy - rim * 0.86} L${cx + rim * 0.17},${cy - rim * 0.94} L${cx - 1},${cy - 5} Z`} />
          </g>
        ))}
        <circle cx={cx} cy={cy} r={rim * 0.24} fill="#DCE0E4" stroke="#8A9199" strokeWidth="0.8" />
        <circle cx={cx} cy={cy} r={rim * 0.11} fill="#9AA2AA" />
        {/* sidewall marking, so rotation is legible on a plain tyre */}
        <path d={`M${cx - 2},${cy - r + 5} h4 v3 h-4 z`} fill="#4C5157" opacity=".7" />
      </g>
    </g>
  );
}

export function CarSharing({ spinDeg }) {
  return (
    <g>
      <ellipse cx="330" cy="392" rx="290" ry="9" fill="#04121F" opacity=".55" />

      {/* ---- shell ---- */}
      <path d={BODY} fill="url(#carBase)" />

      <g clipPath="url(#carClip)">
        {/* sky reflection along the shoulder */}
        <path d="M56,292 C170,270 330,262 500,278 L500,296 C332,280 172,288 58,310 Z" fill="#FFFFFF" opacity=".95" />
        {/* horizon band through the doors - the darkest part of a white flank */}
        <path d="M60,312 C180,292 340,286 502,300 L502,326 C340,312 180,318 62,340 Z" fill="#8E99A5" opacity=".38" />
        {/* ground bounce just above the sill */}
        <path d="M78,338 C200,322 350,318 520,330 L520,346 C350,336 200,340 80,356 Z" fill="#FFFFFF" opacity=".5" />
        {/* specular sweep across the doors */}
        <path d="M250,214 L318,214 L214,358 L156,358 Z" fill="#FFFFFF" opacity=".3" />
        <path d="M404,222 L426,236 L332,358 L300,358 Z" fill="#FFFFFF" opacity=".16" />
        {/* wing shading behind the front arch */}
        <path d="M470,290 C500,282 540,282 566,292 L566,354 L470,354 Z" fill="#C4CBD3" opacity=".3" />
      </g>

      {/* ---- glazing ---- */}
      <g>
        <path d={`M168,${BELTLINE} C182,246 198,234 212,226 L216,${BELTLINE} Z`} fill="url(#glassG2)" />
        <path d={`M232,${BELTLINE} L234,215 L306,213 L306,${BELTLINE} Z`} fill="url(#glassG2)" />
        <path d={`M322,${BELTLINE} L324,214 L360,212 C374,212 384,216 392,225 L430,${BELTLINE} Z`} fill="url(#glassG2)" />
        {/* interior, faintly visible */}
        <g fill="#6E7A85" opacity=".5">
          <path d="M250,240 C250,230 258,226 266,226 C274,226 280,230 280,240 L280,258 L250,258 Z" />
          <path d="M340,238 C340,228 348,224 356,224 C364,224 370,228 370,238 L370,256 L340,256 Z" />
        </g>
        {/* reflections on the glass */}
        <path d="M238,258 L252,220 L268,219 L246,259 Z" fill="#FFFFFF" opacity=".22" />
        <path d="M330,258 L350,216 L362,215 L340,259 Z" fill="#FFFFFF" opacity=".18" />
        <path d="M176,258 L200,232 L208,231 L186,259 Z" fill="#FFFFFF" opacity=".16" />
        {/* gloss-black B-pillar */}
        <path d="M306,213 L322,212 L322,264 L306,264 Z" fill="#11161B" />
        <path d="M310,216 L314,216 L314,260 L310,260 Z" fill="#3C464F" opacity=".7" />
        {/* chrome window surround */}
        <path
          d="M168,264 C182,246 198,234 212,226 L216,264 M232,264 L234,215 L306,213 M322,264 L324,214 L360,212 C374,212 384,216 392,225 L430,264"
          fill="none"
          stroke="#E6EAEE"
          strokeWidth="1.6"
          opacity=".9"
        />
        <path d={`M164,${BELTLINE} L432,${BELTLINE}`} stroke="#E6EAEE" strokeWidth="1.8" opacity=".85" />
      </g>

      {/* ---- outline: hairline, not a cartoon stroke ---- */}
      <path d={BODY} fill="none" stroke={INK} strokeWidth="1.5" />

      {/* spoiler crease at the top of the tailgate */}
      <path d="M152,240 L184,225" stroke="#AFB7C0" strokeWidth="1.1" fill="none" />

      {/* ---- panel gaps: hairlines ---- */}
      <g stroke="#9AA3AC" strokeWidth="0.9" fill="none" opacity=".85">
        <path d="M228,222 V352" />
        <path d="M314,214 V353" />
        <path d="M436,268 C448,292 452,320 450,352" />
        <path d="M58,286 C64,300 66,320 64,346" />
      </g>
      {/* character crease: light above, shadow below */}
      <path d="M118,302 C250,290 382,286 468,296" fill="none" stroke="#FFFFFF" strokeWidth="1.4" opacity=".9" />
      <path d="M118,304.6 C250,292.6 382,288.6 468,298.6" fill="none" stroke="#98A2AC" strokeWidth="1.1" opacity=".8" />

      {/* recessed chrome handles */}
      <g>
        <rect x="248" y="272" width="38" height="7" rx="3.5" fill="#C8CFD6" stroke="#8E969E" strokeWidth="0.8" />
        <rect x="250" y="273.4" width="34" height="2.6" rx="1.3" fill="#FFFFFF" opacity=".8" />
        <rect x="344" y="274" width="38" height="7" rx="3.5" fill="#C8CFD6" stroke="#8E969E" strokeWidth="0.8" />
        <rect x="346" y="275.4" width="34" height="2.6" rx="1.3" fill="#FFFFFF" opacity=".8" />
      </g>

      {/* mirror on a slim arm */}
      <path d="M430,252 h10" stroke={INK} strokeWidth="3" />
      <path d="M438,243 C452,243 460,249 460,257 C460,263 453,265 445,263 L436,248 Z" fill="url(#carBase)" stroke={INK} strokeWidth="1.2" />
      <path d="M441,247 C450,247 455,251 455,256 L444,255 Z" fill="#1B2229" opacity=".85" />

      {/* ---- lamps ---- */}
      <g>
        <path d="M566,286 L610,296 C616,297 618,303 613,306 L568,301 Z" fill="#1B2229" stroke={INK} strokeWidth="1.1" />
        <path d="M572,291 L604,299 C607,300 607,302 604,302.6 L572,298 Z" fill="#FFF6DF" />
        <path d="M574,294.5 L600,300.5" stroke="#8FD8F0" strokeWidth="1.6" opacity=".9" />
      </g>
      <g>
        <path d="M43,296 C58,294 72,292 80,290 L82,308 C72,310 58,312 44,313 Z" fill="#8E1F1C" stroke={INK} strokeWidth="1.1" />
        <path d="M48,299 C60,297 70,296 77,294.5 L78,303 C70,304.5 60,306 48,307 Z" fill="#E04A3C" />
        <path d="M50,301 C60,299.5 68,298.6 74,297.6" stroke="#FFC9B8" strokeWidth="1.2" opacity=".9" />
      </g>

      {/* ---- lower body: skirt, arch lips, valances ---- */}
      <path d="M100,344 L548,338 L548,350 L100,357 Z" fill="#2B333C" />
      <path d="M100,344 L548,338" stroke="#5C666F" strokeWidth="1" opacity=".8" />
      <path d="M556,353 C556,308 537,294 514,294 C491,294 470,308 470,354" fill="none" stroke={INK} strokeWidth="1.6" />
      <path d="M186,357 C186,314 165,300 137,300 C109,300 88,314 88,358" fill="none" stroke={INK} strokeWidth="1.6" />
      <path d="M572,318 C596,318 610,324 613,332 L570,334 Z" fill="#2B333C" opacity=".9" />
      <path d="M46,330 L84,328 L84,340 L46,342 Z" fill="#2B333C" opacity=".85" />

      {/* telematics: a small dark shark fin */}
      <path d="M244,210 C250,200 262,195 274,194 L278,211 Z" fill="#243444" stroke="#111C26" strokeWidth="1.1" />
      <circle cx="272" cy="202" r="2.4" fill="#00C8AA" />

      <Alloy id="car-wheel-rear" cx={137} cy={352} r={40} spinDeg={spinDeg} />
      <Alloy id="car-wheel-front" cx={514} cy={352} r={40} spinDeg={spinDeg} />
    </g>
  );
}

export const CAR_DEFS = (
  <>
    <linearGradient id="carBase" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="34%" stopColor="#F4F6F8" />
      <stop offset="66%" stopColor="#DCE1E6" />
      <stop offset="100%" stopColor="#AFB7C0" />
    </linearGradient>
    <linearGradient id="glassG2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#39434C" />
      <stop offset="55%" stopColor="#1E262D" />
      <stop offset="100%" stopColor="#11171C" />
    </linearGradient>
    <linearGradient id="alloyG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#F1F4F6" />
      <stop offset="45%" stopColor="#C3CAD1" />
      <stop offset="100%" stopColor="#8B939C" />
    </linearGradient>
    <radialGradient id="tyreG" cx="42%" cy="38%">
      <stop offset="0%" stopColor="#24282D" />
      <stop offset="70%" stopColor="#15181C" />
      <stop offset="100%" stopColor="#0A0C0E" />
    </radialGradient>
    <clipPath id="carClip">
      <path d={BODY} />
    </clipPath>
  </>
);
