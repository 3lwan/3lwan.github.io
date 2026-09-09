/**
 * The car-sharing hatchback: a Mercedes A-Class (W177) in AMG Line trim, side
 * profile, facing right, traced against a photograph of the real car.
 *
 * Every landmark was measured off a straight-on press shot rather than guessed,
 * which is why the numbers look arbitrary: the roof runs level at y=202 back
 * from x=366, the windscreen falls 53 over 80 to a cowl at (446,266), the
 * bonnet leaves that cowl as ONE curve at a near-constant angle, and the
 * tailgate is a near-straight rake rather than the fat curve a hatchback
 * silhouette tempts you to draw. Use a press shot, not a street photo: a photo
 * taken from near the car foreshortens the far end, which put the cowl 30 too
 * far forward and the bonnet 8 too high on the first attempt.
 *
 * The wheels are 47 to the body's 190 - a 0.49 ratio, bigger than it feels
 * right to draw - and they sit 100 from the tail and 113 from the nose. Wheels
 * that are too small and overhangs that are too long are what make a vector
 * hatchback read as an MPV.
 *
 * A white car reads as white because of what it reflects. Tone comes from soft
 * vertical gradients rather than hard-edged polygons: sky along the shoulder, a
 * darker horizon through the middle of the doors, ground bounce at the sill.
 * Flat fills and heavy outlines are what make vector cars look like clip art.
 *
 * Contact patch sits at y=392, the shared ground line for every vehicle.
 */

/* ---- envelope ---------------------------------------------------------- */

const REAR_CX = 143;
const FRONT_CX = 517;
const AXLE_Y = 345;
const WHEEL_R = 47;
const ARCH_R = 54;
const SILL_Y = 364;
const INK = '#20272E';

/** Wheel opening, cut up into the body. Drawn right-to-left, chaining off the sill. */
const arch = (cx) =>
  `L${cx + 50},${SILL_Y} C${cx + 50},${AXLE_Y - 32} ${cx + 30},${AXLE_Y - ARCH_R} ${cx},${AXLE_Y - ARCH_R} ` +
  `C${cx - 30},${AXLE_Y - ARCH_R} ${cx - 50},${AXLE_Y - 32} ${cx - 50},${SILL_Y} `;

const BODY =
  /* rear bumper corner, up the tail panel */
  'M47,350 C44,341 44,330 44,320 ' +
  'L43,310 ' +
  /* the tail tucks forward as it rises, then the tailgate rakes almost straight */
  'C44,300 49,286 58,270 ' +
  'C69,250 83,228 97,212 ' +
  /* the spoiler overhangs the tailgate: a short lip, then the roof */
  'L103,207 C107,203 113,201 122,201 ' +
  /* roof: level the whole way, which is what keeps it from reading as a wagon */
  'L268,202 C306,203 340,207 366,213 ' +
  /* windscreen: 77 across, 51 down - steeper than it looks tempting to draw */
  'C384,218 400,230 420,244 ' +
  'C432,253 440,260 446,266 ' +
  /* bonnet: ONE curve, falling at a near-constant angle with only a whisper of
     crown. Two segments meeting mid-bonnet put a visible kink in the
     silhouette, and a flat run out of the cowl reads as a shelf. It is held
     high at the leading edge so the nose keeps some depth. */
  'C502,272 562,282 622,295 ' +
  /* nose: carries the bonnet's angle for a beat, then turns down hard */
  'C631,298 635,307 635,320 ' +
  'L634,345 C633,361 626,371 615,372 ' +
  /* underside: front valance, both arches, the sill between them */
  arch(FRONT_CX) +
  arch(REAR_CX) +
  'L64,365 C56,364 50,359 47,350 Z';

/* The glasshouse as one region; pillars are laid over it afterwards. */
const DLO =
  /* up the A-pillar, inset from the windscreen edge */
  'M424,258 C408,247 384,231 356,214 ' +
  /* along the roof, a few units under the outer edge */
  'C324,208 268,206 180,211 ' +
  /* tapering to the point of the quarter light */
  'C158,211 138,215 122,223 ' +
  /* the base kicks up hard out of the rear door, then runs level */
  'C140,236 164,243 192,248 ' +
  'C256,253 360,256 424,258 Z';

/* ---- alloy ------------------------------------------------------------- */

const RAD = Math.PI / 180;
const round1 = (n) => Math.round(n * 10) / 10;

function polar(cx, cy, r, deg) {
  return [round1(cx + r * Math.sin(deg * RAD)), round1(cy - r * Math.cos(deg * RAD))];
}

/**
 * One spoke arm: rooted narrow at the hub, splayed and squared off at the rim.
 * Angles are degrees clockwise from twelve o'clock, half-widths in degrees.
 */
function arm(cx, cy, rIn, rOut, aIn, aOut, wIn, wOut) {
  const [ax, ay] = polar(cx, cy, rIn, aIn - wIn);
  const [bx, by] = polar(cx, cy, rIn, aIn + wIn);
  const [px, py] = polar(cx, cy, rOut, aOut + wOut);
  const [qx, qy] = polar(cx, cy, rOut, aOut - wOut);
  return `M${ax},${ay} L${bx},${by} L${px},${py} A${round1(rOut)},${round1(rOut)} 0 0 0 ${qx},${qy} Z`;
}

const SPOKES = [0, 72, 144, 216, 288];
/** Each spoke is a close pair splaying into a narrow V toward the rim. */
const PAIR = [-1, 1];

/**
 * AMG five-twin-spoke, bicolour: a polished rim lip and bright spoke faces over
 * a dark open ground, because on the real wheel the pockets between the spokes
 * show the well behind. Rim is 0.69 of the tyre diameter, so the sidewall is
 * the thin band it is on the car. Disc and caliper stay put while it turns.
 */
function Alloy({ id, cx, cy, r, spinDeg }) {
  const rim = r * 0.75;
  const face = rim - 2.4;
  return (
    <g>
      {/* tyre */}
      <circle cx={cx} cy={cy} r={r} fill="url(#tyreG)" />
      <circle cx={cx} cy={cy} r={r - 1.2} fill="none" stroke="#080B0E" strokeWidth="1.4" opacity=".9" />
      <circle cx={cx} cy={cy} r={r - 4.5} fill="none" stroke="#2E343B" strokeWidth="0.7" opacity=".5" />
      <circle cx={cx} cy={cy} r={rim + 2.4} fill="#0C1015" />
      {/* the dark of the well, which is what the spoke gaps look through to */}
      <circle cx={cx} cy={cy} r={face} fill="#0E1318" />

      {/* brake disc and caliper, glimpsed through the spoke gaps - kept dark,
          because a bright disc reads as a hubcap and swallows the spokes */}
      <circle cx={cx} cy={cy} r={face * 0.6} fill="#414951" />
      <circle cx={cx} cy={cy} r={face * 0.6} fill="none" stroke="#262C33" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={face * 0.36} fill="#2E353C" />
      <path
        d={`M${cx - face * 0.64},${cy - 6} a${face * 0.64},${face * 0.64} 0 0 0 0,12 l5,0 0,-12 z`}
        fill="#77302B"
        opacity=".8"
      />

      <g
        id={id}
        style={{
          transformBox: 'view-box',
          transformOrigin: `${cx}px ${cy}px`,
          transform: `rotate(${spinDeg}deg)`,
        }}
      >
        {/* the rim lip is a ring, not a disc - a filled circle here would hide
            the brake disc the spoke gaps are supposed to show */}
        <circle
          cx={cx}
          cy={cy}
          r={(rim + face) / 2}
          fill="none"
          stroke="url(#alloyG)"
          strokeWidth={rim - face}
        />
        <circle cx={cx} cy={cy} r={rim - 0.5} fill="none" stroke="#F4F7F9" strokeWidth="0.8" opacity=".6" />
        {SPOKES.map((a) =>
          PAIR.map((side) => (
            <path
              key={`sp${a}_${side}`}
              d={arm(cx, cy, face * 0.28, face * 0.96, a + side * 2, a + side * 10, 4.5, 3.3)}
              fill="url(#alloyFace)"
            />
          )),
        )}
        {/* the leading edge of each arm catches the light */}
        {SPOKES.map((a) =>
          PAIR.map((side) => {
            const [x1, y1] = polar(cx, cy, face * 0.32, a + side * 2 - 3.2);
            const [x2, y2] = polar(cx, cy, face * 0.93, a + side * 10 - 2.1);
            return (
              <path
                key={`hi${a}_${side}`}
                d={`M${x1},${y1} L${x2},${y2}`}
                stroke="#FDFEFE"
                strokeWidth="0.6"
                opacity=".4"
              />
            );
          }),
        )}
        <circle cx={cx} cy={cy} r={face * 0.3} fill="#252C33" stroke="#9BA3AB" strokeWidth="0.8" />
        <circle cx={cx} cy={cy} r={face * 0.13} fill="#8E969E" />
        {/* sidewall marking, so rotation stays legible on a plain tyre */}
        <path d={`M${cx - 1.8},${cy - r + 3.4} h3.6 v3.2 h-3.6 z`} fill="#5A6169" opacity=".7" />
      </g>
    </g>
  );
}

/* ---- car --------------------------------------------------------------- */

export function CarSharing({ spinDeg }) {
  return (
    <g>
      <ellipse cx="336" cy="392" rx="300" ry="9" fill="#04121F" opacity=".55" />

      {/* ---- shell ---- */}
      <path d={BODY} fill="url(#carBase)" />

      <g clipPath="url(#carClip)">
        {/* sky on the shoulder, the horizon through the middle of the doors,
            ground bounce at the sill - all soft ramps, no hard edges */}
        <rect x="40" y="240" width="600" height="46" fill="url(#carShoulder)" />
        <rect x="40" y="276" width="600" height="70" fill="url(#carHorizon)" />
        <rect x="40" y="326" width="600" height="48" fill="url(#carBounce)" />
        {/* the road and kerb reflected as a dark band just above the sill */}
        <rect x="40" y="344" width="600" height="26" fill="url(#carRoad)" />
        {/* sheen down the doors */}
        <path d="M286,196 L364,196 L236,378 L152,378 Z" fill="url(#carSweep)" />
        <path d="M434,238 L466,256 L364,378 L312,378 Z" fill="url(#carSweep)" opacity=".45" />
        {/* the wing and nose turn out of the light, the tailgate away from it */}
        <rect x="450" y="252" width="200" height="126" fill="url(#noseShade)" />
        <path d="M40,254 L104,200 L104,378 L40,378 Z" fill="url(#tailShade)" />
      </g>

      {/* ---- glasshouse -------------------------------------------------- */}
      <g>
        <path d={DLO} fill="url(#glassG2)" />

        {/* interior, barely there */}
        <g fill="#7E8A94" opacity=".26">
          <path d="M344,236 C344,229 349,226 355,226 C361,226 366,229 366,236 L366,250 L344,250 Z" />
          <path d="M252,232 C252,225 257,222 263,222 C269,222 274,225 274,232 L274,247 L252,247 Z" />
        </g>

        {/* reflections raking across the glass */}
        <path d="M306,254 L334,212 L350,211 L320,255 Z" fill="#FFFFFF" opacity=".16" />
        <path d="M222,250 L250,208 L262,208 L234,251 Z" fill="#FFFFFF" opacity=".13" />
        <path d="M380,232 L358,214 L370,214 L398,242 Z" fill="#FFFFFF" opacity=".11" />
        <path d="M136,223 L164,213 L168,228 Z" fill="#FFFFFF" opacity=".06" />

        {/* gloss-black pillars, running right up to the roof edge */}
        <path d="M288,205 L307,205 L305,254 L287,253 Z" fill="#0F1418" />
        <path d="M292,210 L298,210 L297,249 L292,249 Z" fill="#3F4A53" opacity=".5" />
        <path d="M172,210 L181,210 L180,244 L172,243 Z" fill="#0F1418" />
        {/* short post closing off the fixed vent ahead of the door glass */}
        <path d="M396,240 L402,243 L402,257 L396,257 Z" fill="#0F1418" />

        {/* chrome surround, tracing the kick-up into the quarter light */}
        <path d={DLO} fill="none" stroke="#E8ECEF" strokeWidth="1.7" strokeLinejoin="round" opacity=".92" />
        {/* the heavier bright strip along the base of the glass */}
        <path d="M192,248 C256,253 360,256 424,258" fill="none" stroke="#F2F5F7" strokeWidth="2.4" opacity=".9" />
      </g>

      {/* ---- outline: hairline, not a cartoon stroke ---- */}
      <path d={BODY} fill="none" stroke={INK} strokeWidth="1.4" />

      {/* shadow under the spoiler lip */}
      <path d="M99,211 C104,207 110,204 119,203" fill="none" stroke="#94A0AA" strokeWidth="1" opacity=".7" />
      {/* shark-fin telematics antenna - the INVERS unit that makes it shareable */}
      <path d="M134,203 L172,202 L143,190 C137,193 134,197 134,203 Z" fill="#232F3C" stroke="#111C26" strokeWidth="0.8" />
      <circle cx="163" cy="197" r="1.7" fill="#00C8AA" />

      {/* ---- panel gaps: hairlines --------------------------------------- */}
      <g stroke="#9AA3AC" strokeWidth="0.9" fill="none" opacity=".8">
        {/* front door, dropping from the A-pillar and curving behind the arch */}
        <path d="M438,264 C444,300 447,332 448,362" />
        {/* B-pillar shut line */}
        <path d="M296,255 L294,364" />
        {/* rear door, ahead of the quarter panel */}
        <path d="M179,245 C178,288 177,326 178,365" />
        {/* tailgate cut, behind the quarter light and down past the lamp */}
        <path d="M122,201 C110,219 96,238 80,252 C68,263 62,276 62,290" />
        {/* bonnet shut line, tracking the silhouette about ten units below it */}
        <path d="M458,274 C506,281 558,292 604,303" />
      </g>
      {/* fuel flap on the rear quarter */}
      <rect x="120" y="248" width="24" height="20" rx="7" fill="none" stroke="#9AA3AC" strokeWidth="0.7" opacity=".3" />

      {/* Shoulder crease: light above, shadow below. Clipped, because a crease
          that escapes the silhouette reads as a wire lying on the car. */}
      <g clipPath="url(#carClip)">
        <path d="M58,286 C150,278 280,272 400,273 C450,274 500,277 534,281" fill="none" stroke="#FFFFFF" strokeWidth="1.1" opacity=".4" />
        <path d="M58,288.4 C150,280.4 280,274.4 400,275.4 C450,276.4 500,279.4 534,283.4" fill="none" stroke="#93A0AC" strokeWidth="0.9" opacity=".26" />
        {/* lower light-catch, lifting out of the rear arch toward the front */}
        <path d="M102,338 C240,330 390,327 524,332" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity=".22" />
      </g>

      {/* flush door handles, tucked under the glass */}
      <g>
        <rect x="316" y="262" width="34" height="6" rx="3" fill="#D5DBE0" stroke="#909aa4" strokeWidth="0.7" />
        <rect x="318" y="263.2" width="30" height="2" rx="1" fill="#FFFFFF" opacity=".9" />
        <rect x="186" y="258" width="32" height="6" rx="3" fill="#D5DBE0" stroke="#909aa4" strokeWidth="0.7" />
        <rect x="188" y="259.2" width="28" height="2" rx="1" fill="#FFFFFF" opacity=".9" />
      </g>

      {/* wiper tucked at the base of the windscreen */}
      <path d="M408,258 L440,268" stroke="#1B2229" strokeWidth="1.5" opacity=".7" />

      {/* door mirror, mounted on the door skin at the beltline */}
      <path d="M424,259 L437,262" stroke={INK} strokeWidth="2.6" />
      <path d="M426,258 C425,250 417,246 406,246 C395,246 388,250 389,256 C390,262 397,265 407,264 C419,263 426,262 426,258 Z" fill="url(#carBase)" stroke={INK} strokeWidth="1" />
      <path d="M391,251 C388,255 388,261 391,264 C395,265 398,263 398,258 C398,253 395,250 391,251 Z" fill="#1B2229" opacity=".85" />
      <path d="M404,248 C414,248 421,250 424,254" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity=".8" />

      {/* ---- lamps ------------------------------------------------------- */}
      {/* headlamp: a slim swept wedge tapering to a point along the wing */}
      <g>
        <path d="M567,300 C592,302 614,307 632,315 L630,331 C612,322 590,313 568,304 Z" fill="url(#lampG)" stroke={INK} strokeWidth="0.7" />
        {/* the lens is mostly dark: a chrome bezel along the top, one glint */}
        <path d="M574,302 C595,305 615,311 630,318" stroke="#C6D3DD" strokeWidth="1.3" opacity=".75" fill="none" />
        <path d="M608,313 C617,316 624,321 629,325" stroke="#EEF6FC" strokeWidth="1.4" opacity=".9" fill="none" />
        <ellipse cx="617" cy="321" rx="9" ry="3.6" fill="#CFE0EC" opacity=".3" transform="rotate(25 617 321)" />
        <circle cx="619" cy="322" r="2.3" fill="#FFFDF4" opacity=".85" />
      </g>
      {/* taillamp: a slim bar wrapping the corner onto the quarter */}
      <g>
        <path d="M64,258 C81,260 95,264 105,269 C110,271 109,278 103,279 C85,283 69,285 52,285 C55,275 59,266 64,258 Z" fill="#7E1C16" stroke={INK} strokeWidth="0.8" />
        <path d="M67,262 C82,264 94,268 101,272 L101,275 C85,278 69,280 56,280 C59,273 63,266 67,262 Z" fill="#DE4335" />
        <path d="M69,266 C83,268 93,271 99,274" stroke="#FFD2C3" strokeWidth="1.3" opacity=".95" />
        <path d="M62,276 C78,276 90,277 98,278" stroke="#FF8C78" strokeWidth="1" opacity=".5" />
        {/* reflector low in the rear bumper */}
        <path d="M56,338 L68,339 L68,344 L56,343 Z" fill="#8E2A22" opacity=".7" />
      </g>

      {/* ---- lower body: skirt, aprons ----------------------------------- */}
      {/* AMG Line side skirt: a bright step along the sill, the shadow under it */}
      <path d="M194,356 L466,352" stroke="#EDF1F4" strokeWidth="1.3" opacity=".7" fill="none" />
      <path d="M193,358 L466,354 L467,365 L193,366 Z" fill="#39424B" />
      <path d="M195,363 L465,359 L465,365 L195,366 Z" fill="#141A1F" />

      {/* front apron. The AMG Line face is mostly body colour: an air curtain
          slot at the corner, a grille aperture with two fins in it, and a
          splitter blade along the lip - not one big black mouth. */}
      <path d="M585,340 C589,341 591,344 591,349 L591,361 C591,365 588,367 585,366 Z" fill="#2A323A" />
      <path d="M585,340 C589,341 591,344 591,349" fill="none" stroke="#DDE3E8" strokeWidth="0.8" opacity=".55" />
      <path d="M599,334 C612,337 623,342 631,348 L631,356 C629,362 622,366 614,365 C605,363 599,355 597,346 Z" fill="#161C23" />
      <path d="M603,341 C614,344 623,349 629,353" stroke="#828B93" strokeWidth="1" opacity=".6" fill="none" />
      <path d="M582,362 C598,364 610,367 618,371 L615,373 C606,369 594,366 581,365 Z" fill="#0E1317" opacity=".85" />
      {/* bumper-to-wing shut line, dropping off the tip of the lamp */}
      <path d="M569,303 C573,320 577,342 579,362" fill="none" stroke="#9AA3AC" strokeWidth="0.8" opacity=".45" />

      {/* rear apron: a dark valance wrapping the bottom of the tail */}
      <path d="M49,346 C62,346 78,348 96,352 L96,362 C78,359 62,358 51,358 Z" fill="#2E353D" opacity=".9" />
      <path d="M54,360 C68,360 80,361 90,363 L90,366 C78,365 64,364 54,364 Z" fill="#141A1F" />
      {/* rear bumper shut line */}
      <path d="M98,284 C98,304 96,324 92,342" fill="none" stroke="#9AA3AC" strokeWidth="0.8" opacity=".45" />

      {/* wheel wells, dark behind the tyres */}
      <path d={`M467,${SILL_Y} C467,313 489,291 ${FRONT_CX},291 C545,291 567,313 567,${SILL_Y} Z`} fill="#080E14" />
      <path d={`M93,${SILL_Y} C93,313 115,291 ${REAR_CX},291 C171,291 193,313 193,${SILL_Y} Z`} fill="#080E14" />

      <Alloy id="car-wheel-rear" cx={REAR_CX} cy={AXLE_Y} r={WHEEL_R} spinDeg={spinDeg} />
      <Alloy id="car-wheel-front" cx={FRONT_CX} cy={AXLE_Y} r={WHEEL_R} spinDeg={spinDeg} />

      {/* arch lips last, so the body edge sits in front of the tyre */}
      <path d={`M567,${SILL_Y} C567,313 545,291 ${FRONT_CX},291 C489,291 467,313 467,${SILL_Y}`} fill="none" stroke={INK} strokeWidth="1.6" />
      <path d={`M193,${SILL_Y} C193,313 171,291 ${REAR_CX},291 C115,291 93,313 93,${SILL_Y}`} fill="none" stroke={INK} strokeWidth="1.6" />
    </g>
  );
}

export const CAR_DEFS = (
  <>
    <linearGradient id="carBase" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FFFFFF" />
      <stop offset="38%" stopColor="#F6F8F9" />
      <stop offset="72%" stopColor="#DEE3E8" />
      <stop offset="100%" stopColor="#B4BCC4" />
    </linearGradient>
    <linearGradient id="carShoulder" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
      <stop offset="45%" stopColor="#FFFFFF" stopOpacity=".95" />
      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
    </linearGradient>
    <linearGradient id="carHorizon" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#5E7383" stopOpacity="0" />
      <stop offset="48%" stopColor="#5E7383" stopOpacity=".44" />
      <stop offset="100%" stopColor="#5E7383" stopOpacity="0" />
    </linearGradient>
    <linearGradient id="carBounce" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
      <stop offset="55%" stopColor="#FFFFFF" stopOpacity=".5" />
      <stop offset="100%" stopColor="#7FE3D2" stopOpacity=".18" />
    </linearGradient>
    <linearGradient id="carRoad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#33424E" stopOpacity="0" />
      <stop offset="60%" stopColor="#33424E" stopOpacity=".3" />
      <stop offset="100%" stopColor="#33424E" stopOpacity=".08" />
    </linearGradient>
    <linearGradient id="carSweep" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".05" />
      <stop offset="35%" stopColor="#FFFFFF" stopOpacity=".3" />
      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
    </linearGradient>
    <linearGradient id="lampG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#3A444E" />
      <stop offset="45%" stopColor="#1B222A" />
      <stop offset="100%" stopColor="#0E141A" />
    </linearGradient>
    <linearGradient id="glassG2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#39434C" />
      <stop offset="55%" stopColor="#1E262D" />
      <stop offset="100%" stopColor="#11171C" />
    </linearGradient>
    <linearGradient id="alloyG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#E4E9ED" />
      <stop offset="45%" stopColor="#AEB6BE" />
      <stop offset="100%" stopColor="#737B84" />
    </linearGradient>
    <linearGradient id="noseShade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#C7CFD7" stopOpacity="0" />
      <stop offset="60%" stopColor="#C7CFD7" stopOpacity=".22" />
      <stop offset="100%" stopColor="#8E99A5" stopOpacity=".45" />
    </linearGradient>
    <linearGradient id="tailShade" x1="1" y1="0" x2="0" y2="0">
      <stop offset="0%" stopColor="#8E9CA8" stopOpacity="0" />
      <stop offset="100%" stopColor="#8E9CA8" stopOpacity=".3" />
    </linearGradient>
    <linearGradient id="alloyFace" x1="0.1" y1="0" x2="0.9" y2="1">
      <stop offset="0%" stopColor="#C8CFD5" />
      <stop offset="50%" stopColor="#959DA6" />
      <stop offset="100%" stopColor="#5F666E" />
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
