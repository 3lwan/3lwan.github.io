/**
 * The three closing scenes: education, languages and contact.
 *
 * All three sit on the same ground line as the vehicles (y=392 in a 1200x460
 * viewBox), so the story keeps one continuous floor from the runway through to
 * the last frame.
 */

const INK = '#0E1A22';

/* ============================ 05 · Education ============================ */

/** One gear, drawn from its tooth count so the teeth always mesh visually. */
function Gear({ cx, cy, r, teeth, deg, fill, stroke }) {
  const toothH = r * 0.19;
  const path = Array.from({ length: teeth }, (_, i) => {
    const a0 = (i * 2 * Math.PI) / teeth;
    const step = (2 * Math.PI) / teeth;
    const pt = (radius, angle) =>
      `${(cx + Math.cos(angle) * radius).toFixed(1)},${(cy + Math.sin(angle) * radius).toFixed(1)}`;
    return [
      `${i === 0 ? 'M' : 'L'}${pt(r, a0)}`,
      `L${pt(r + toothH, a0 + step * 0.18)}`,
      `L${pt(r + toothH, a0 + step * 0.38)}`,
      `L${pt(r, a0 + step * 0.56)}`,
    ].join(' ');
  }).join(' ');

  return (
    <g style={{ transformBox: 'view-box', transformOrigin: `${cx}px ${cy}px`, transform: `rotate(${deg}deg)` }}>
      <path d={`${path} Z`} fill={fill} stroke={stroke} strokeWidth="1.4" />
      <circle cx={cx} cy={cy} r={r * 0.58} fill="none" stroke={stroke} strokeWidth="1.2" opacity=".7" />
      <circle cx={cx} cy={cy} r={r * 0.2} fill="#0B2530" stroke={stroke} strokeWidth="1.2" />
      {Array.from({ length: 5 }, (_, i) => (i * 360) / 5).map((a) => (
        <circle
          key={a}
          cx={cx + Math.cos((a * Math.PI) / 180) * r * 0.39}
          cy={cy + Math.sin((a * Math.PI) / 180) * r * 0.39}
          r={r * 0.09}
          fill="#0B2530"
          opacity=".8"
        />
      ))}
    </g>
  );
}

/**
 * A mechatronics gear train on a bench: two degrees, two meshing wheels.
 * The gears counter-rotate with scroll, so the mechanism is doing something
 * rather than sitting there.
 */
export function GearBench({ frame }) {
  const { gearDeg } = frame;
  return (
    <svg viewBox="0 0 1200 460" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="gearBrass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8FE0D2" />
          <stop offset="55%" stopColor="#3FA8A0" />
          <stop offset="100%" stopColor="#1B6A70" />
        </linearGradient>
        <linearGradient id="gearSteel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E7EEF2" />
          <stop offset="55%" stopColor="#A9BDC7" />
          <stop offset="100%" stopColor="#5F7986" />
        </linearGradient>
        <linearGradient id="benchTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#264A5C" />
          <stop offset="100%" stopColor="#12303E" />
        </linearGradient>
      </defs>

      <ellipse cx="600" cy="394" rx="270" ry="9" fill="#04121F" opacity=".5" />

      {/* the two wheels mesh: 26 teeth driving 17 */}
      <Gear cx={512} cy={252} r={92} teeth={26} deg={gearDeg} fill="url(#gearBrass)" stroke="#0B3B44" />
      <Gear cx={690} cy={286} r={62} teeth={17} deg={-gearDeg * 1.5} fill="url(#gearSteel)" stroke="#31505E" />

      {/* shafts down to the bench */}
      <rect x="505" y="252" width="14" height="104" rx="6" fill="#20404F" stroke={INK} strokeWidth="1.2" />
      <rect x="683" y="286" width="14" height="70" rx="6" fill="#20404F" stroke={INK} strokeWidth="1.2" />

      {/* bench */}
      <path d="M370,356 L830,356 C838,356 842,361 842,368 L842,376 L358,376 L358,368 C358,361 362,356 370,356 Z"
            fill="url(#benchTop)" stroke={INK} strokeWidth="1.4" />
      <path d="M372,360 L828,360" stroke="#4E7C90" strokeWidth="1.2" opacity=".8" />
      <rect x="396" y="376" width="16" height="16" rx="4" fill="#16323F" />
      <rect x="788" y="376" width="16" height="16" rx="4" fill="#16323F" />

      {/* a caliper resting on the bench - the engineering hand tool */}
      <g stroke="#8FB6C6" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M430,350 L520,344" />
        <path d="M430,350 L436,336" />
        <path d="M494,346 L500,332" />
      </g>
    </svg>
  );
}

/* ============================ 06 · Languages ============================ */

const GREETINGS = [
  { text: 'مرحبا', x: 300, y: 190, w: 210, h: 96, tail: 'left', size: 46 },
  { text: 'Hello', x: 560, y: 132, w: 210, h: 92, tail: 'left', size: 42 },
  { text: 'Hallo', x: 820, y: 196, w: 200, h: 92, tail: 'right', size: 42 },
];

/**
 * Three speech bubbles, one per language, rising into frame.
 *
 * The greetings are SVG text rather than DOM text: they are the illustration
 * here, not the content. The levels themselves are in the scene copy and the
 * instrument panel.
 */
export function SpeechBubbles({ frame }) {
  const { bubbleRise } = frame;
  return (
    <svg viewBox="0 0 1200 460" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="bubbleG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#DCE7EC" />
        </linearGradient>
      </defs>

      {GREETINGS.map((bubble, i) => {
        const delay = i * 0.16;
        const t = Math.max(0, Math.min(1, (bubbleRise - delay) / (1 - delay || 1)));
        const tailX = bubble.tail === 'left' ? bubble.x + 40 : bubble.x + bubble.w - 40;
        return (
          <g
            key={bubble.text}
            style={{ opacity: t, transform: `translateY(${(1 - t) * 44}px)` }}
          >
            <rect
              x={bubble.x}
              y={bubble.y}
              width={bubble.w}
              height={bubble.h}
              rx="26"
              fill="url(#bubbleG)"
              stroke={INK}
              strokeWidth="1.6"
            />
            <path
              d={`M${tailX},${bubble.y + bubble.h} l0,26 l${bubble.tail === 'left' ? 26 : -26},-26 z`}
              fill="#DCE7EC"
              stroke={INK}
              strokeWidth="1.6"
            />
            <text
              x={bubble.x + bubble.w / 2}
              y={bubble.y + bubble.h / 2 + bubble.size * 0.34}
              textAnchor="middle"
              fontFamily="Instrument Sans, Helvetica Neue, Arial, sans-serif"
              fontSize={bubble.size}
              fontWeight="600"
              fill="#123B4A"
            >
              {bubble.text}
            </text>
          </g>
        );
      })}

      {/* a bench under the conversation, on the ground line */}
      <g>
        <path d="M430,352 L790,352 C797,352 800,356 800,362 L800,368 L420,368 L420,362 C420,356 423,352 430,352 Z"
              fill="#2A4A58" stroke={INK} strokeWidth="1.4" />
        <path d="M432,356 L788,356" stroke="#557C8C" strokeWidth="1.2" opacity=".8" />
        <rect x="452" y="368" width="14" height="24" rx="4" fill="#1B3743" />
        <rect x="754" y="368" width="14" height="24" rx="4" fill="#1B3743" />
        <path d="M430,340 L790,340 C796,340 798,344 798,349 L422,349 C422,344 424,340 430,340 Z"
              fill="#325665" stroke={INK} strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/* ============================= 07 · Contact ============================= */

const ARMS = [
  { label: 'EMAIL', y: 138, dir: 1 },
  { label: 'GITHUB', y: 186, dir: -1 },
  { label: 'LINKEDIN', y: 234, dir: 1 },
  { label: 'XING', y: 282, dir: -1 },
];

/** A signpost: the end of the line, pointing at every way to get in touch. */
export function Signpost() {
  return (
    <svg viewBox="0 0 1200 460" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="signBoard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6F2EC" />
          <stop offset="100%" stopColor="#D6CEC2" />
        </linearGradient>
        <linearGradient id="postG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4A3A2E" />
          <stop offset="40%" stopColor="#7A6350" />
          <stop offset="100%" stopColor="#3A2C22" />
        </linearGradient>
      </defs>

      <ellipse cx="600" cy="394" rx="130" ry="8" fill="#04121F" opacity=".5" />

      <rect x="588" y="104" width="24" height="288" rx="6" fill="url(#postG)" stroke={INK} strokeWidth="1.4" />
      <path d="M584,104 L616,104 L610,92 L590,92 Z" fill="#5C4838" stroke={INK} strokeWidth="1.2" />

      {ARMS.map((arm) => {
        const width = 196;
        // `base` is where the board meets the post; `tip` is the pointed end.
        // Using one value for both collapsed the left-hand boards into bowties.
        const base = arm.dir === 1 ? 612 : 588;
        const tip = base + arm.dir * width;
        const notch = tip - arm.dir * 26;
        return (
          <g key={arm.label}>
            <path
              d={`M${base},${arm.y}
                  L${notch},${arm.y}
                  L${tip},${arm.y + 19}
                  L${notch},${arm.y + 38}
                  L${base},${arm.y + 38} Z`}
              fill="url(#signBoard)"
              stroke={INK}
              strokeWidth="1.5"
            />
            <text
              x={base + arm.dir * 24}
              y={arm.y + 25}
              textAnchor={arm.dir === 1 ? 'start' : 'end'}
              fontFamily="DM Mono, ui-monospace, Menlo, monospace"
              fontSize="19"
              letterSpacing="2"
              fill="#2B2018"
            >
              {arm.label}
            </text>
          </g>
        );
      })}

      {/* a little grass at the base, so the post is planted rather than placed */}
      <g stroke="#3E6B4E" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M566,392 C566,378 560,372 554,368" />
        <path d="M578,392 C578,382 574,374 570,370" />
        <path d="M622,392 C622,380 628,374 634,370" />
        <path d="M636,392 C636,382 642,376 648,373" />
      </g>
    </svg>
  );
}
