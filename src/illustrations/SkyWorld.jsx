/** Dawn sky above the runway: gradient, sun, cirrus and a drifting cumulus deck. */
export function SkyWorld() {
  return (
    <svg className="world-sky" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#150418" />
          <stop offset="24%" stopColor="#54103F" />
          <stop offset="48%" stopColor="#871C54" />
          <stop offset="70%" stopColor="#C4436A" />
          <stop offset="88%" stopColor="#EE8F72" />
          <stop offset="100%" stopColor="#8FD8E4" />
        </linearGradient>
        <radialGradient id="sunglow">
          <stop offset="0%" stopColor="#FFF2D4" />
          <stop offset="45%" stopColor="#FFB877" stopOpacity=".78" />
          <stop offset="100%" stopColor="#FF8A6B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cloudLit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE6D6" />
          <stop offset="55%" stopColor="#E7A5A5" />
          <stop offset="100%" stopColor="#7E4260" />
        </linearGradient>
        <path
          id="cu"
          d="M0,60 C0,34 20,18 44,20 C52,2 76,-6 94,4 C108,-12 138,-10 148,10 C176,6 196,26 194,50 C214,54 224,72 218,90 L-8,90 C-16,76 -12,62 0,60 Z"
        />
      </defs>
      <rect width="1440" height="700" fill="url(#sky)" />
      <circle cx="1058" cy="612" r="200" fill="url(#sunglow)" />
      <circle cx="1058" cy="612" r="58" fill="#FFEFCE" opacity=".95" />
      <g fill="#F7D9DA" opacity=".26">
        <rect x="120" y="120" width="420" height="5" rx="2.5" />
        <rect x="300" y="152" width="250" height="4" rx="2" />
        <rect x="890" y="104" width="370" height="5" rx="2.5" />
        <rect x="1010" y="140" width="210" height="4" rx="2" />
      </g>
      <g className="drift drift--slow" opacity=".5" fill="url(#cloudLit)">
        <use href="#cu" x="80" y="196" transform="scale(1.45)" style={{ transformOrigin: '0 0' }} />
        <use href="#cu" x="640" y="220" transform="scale(1.15)" style={{ transformOrigin: '0 0' }} />
        <use href="#cu" x="1200" y="200" transform="scale(1.3)" style={{ transformOrigin: '0 0' }} />
      </g>
    </svg>
  );
}

/** Low cloud deck that hides the airport at cruise and parts on descent. */
export function CloudDeck({ opacity, shiftVh, scale }) {
  return (
    <svg
      className="world-deck"
      viewBox="0 0 1440 180"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ opacity, transform: `translateY(${shiftVh}vh) scale(${scale})` }}
    >
      <g fill="#E7A5A5" opacity=".92">
        <use href="#cu" x="-60" y="60" transform="scale(1.6)" style={{ transformOrigin: '0 0' }} />
        <use href="#cu" x="360" y="72" transform="scale(1.6)" style={{ transformOrigin: '0 0' }} />
        <use href="#cu" x="780" y="56" transform="scale(1.6)" style={{ transformOrigin: '0 0' }} />
      </g>
    </svg>
  );
}

/** Terminal, control tower and beacon on the horizon. */
export function AirportHorizon() {
  return (
    <svg className="world-horizon" viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true">
      <rect width="1440" height="200" fill="#3A1030" opacity=".5" />
      <g fill="#25081E">
        <path d="M0 96h190v-34h52v34h104v-52h64v52h158v-24h74v24h256v-42h58v42h128v-28h68v28h172v-38h54v38h62v104H0z" />
        <rect x="1284" y="8" width="15" height="92" />
        <path d="M1268 2h47l-8 24h-31z" />
      </g>
      <circle cx="1291" cy="0" r="5" fill="#8FD8E4" />
    </svg>
  );
}
