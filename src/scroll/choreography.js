import { clamp, segment, lerp, easeInOut, easeOut } from './easing';

/**
 * The whole seven-scene story, as a pure function of scroll progress.
 *
 * No DOM access, so the motion can be unit-tested without a browser.
 *
 * Every vehicle sits on one shared ground line (--ground in index.css) and
 * travels the same direction: entering from the left, leaving to the right.
 * That is what lets one scene hand over to the next without morphing geometry.
 *
 * Timeline
 *   .000-.040  cruise
 *   .040-.205  the landing: gear, descent, flare, touchdown, roll-out
 *   .230-.290  hand-off to the Flaschenpost van
 *   .380-.440  hand-off to the INVERS fleet
 *   .530-.590  hand-off to the Conze CEREC unit
 *   .680-.730  hand-off to Education
 *   .800-.845  hand-off to Languages
 *   .900-.945  hand-off to Contact
 *
 * The landing keeps the largest share because it is the one bespoke sequence;
 * the rest are enter-hold-leave along the shared ground line.
 */

/** Copy windows deliberately overlap, so no stretch of scroll is text-free. */
const COPY = {
  eurowings: { in: [-1, -1], out: [0.2, 0.27] },
  flaschenpost: { in: [0.23, 0.3], out: [0.34, 0.41] },
  invers: { in: [0.37, 0.44], out: [0.48, 0.55] },
  conze: { in: [0.51, 0.58], out: [0.63, 0.7] },
  education: { in: [0.66, 0.73], out: [0.78, 0.84] },
  languages: { in: [0.8, 0.86], out: [0.89, 0.93] },
  contact: { in: [0.9, 0.95], out: [2, 3] },
};

const WORLD = {
  eurowings: { in: [-1, -1], out: [0.23, 0.3] },
  flaschenpost: { in: [0.23, 0.31], out: [0.37, 0.44] },
  invers: { in: [0.37, 0.45], out: [0.51, 0.58] },
  conze: { in: [0.51, 0.59], out: [0.66, 0.73] },
  education: { in: [0.66, 0.74], out: [0.8, 0.86] },
  languages: { in: [0.8, 0.87], out: [0.9, 0.95] },
  contact: { in: [0.9, 0.96], out: [2, 3] },
};

/** Enter from the left, hold, leave to the right. */
const TRAVEL = {
  van: { enter: [0.23, 0.31], leave: [0.36, 0.44] },
  fleet: { enter: [0.37, 0.45], leave: [0.5, 0.58] },
  cerec: { enter: [0.51, 0.59], leave: [0.65, 0.73] },
  gears: { enter: [0.66, 0.74], leave: [0.79, 0.86] },
  signpost: { enter: [0.9, 0.96], leave: [2, 3] },
};

const band = (p, [start, end]) => segment(p, start, end);

const visibility = (p, spec) => band(p, spec.in) * (1 - band(p, spec.out));

/**
 * Horizontal offset in px for a vehicle that enters from the left and leaves
 * to the right, plus the distance it has covered (which drives wheel rotation
 * and must only ever increase).
 */
function transit(p, spec, runPx) {
  const arriving = easeOut(band(p, spec.enter));
  const leaving = easeInOut(band(p, spec.leave));
  return {
    offsetPx: (arriving - 1) * runPx + leaving * runPx * 1.9,
    travelledPx: arriving * runPx + leaving * runPx * 1.9,
  };
}

export function frameAt(progress, viewportWidth = 1440) {
  const p = clamp(progress, 0, 1);
  const run = viewportWidth * 0.85;

  /* ---------------- scene 1: the landing ---------------- */
  const config = band(p, [0.03, 0.075]); // gear extension
  const sink = easeInOut(band(p, [0.045, 0.14]));
  const flare = band(p, [0.125, 0.155]);
  const touch = band(p, [0.135, 0.15]);
  const roll = easeOut(band(p, [0.145, 0.205]));
  const groundPx = easeOut(band(p, [0.045, 0.205])) * 5200;

  const planeVisible = visibility(p, WORLD.eurowings);

  /* ---------------- ground vehicles ---------------- */
  const van = transit(p, TRAVEL.van, run);
  const fleet = transit(p, TRAVEL.fleet, run);
  const cerec = transit(p, TRAVEL.cerec, run);
  const gears = transit(p, TRAVEL.gears, run);
  const signpost = transit(p, TRAVEL.signpost, run);
  // The speech bubbles rise rather than roll in - nothing about language
  // travels along a road.
  const bubbleRise = easeOut(band(p, [0.8, 0.88]));

  const spin = (travelledPx, radius) => -((travelledPx / radius) * (180 / Math.PI));

  /* ---------------- instruments, per scene ---------------- */
  const altitudeFt = Math.round(lerp(38000, 0, sink) / 100) * 100;

  // One set of thresholds drives both the rail and the readouts. Kept apart,
  // they drift: the panel showed the contact details while the rail still
  // said Languages.
  const activeSceneIndex =
    p < 0.25 ? 0 : p < 0.39 ? 1 : p < 0.53 ? 2 : p < 0.68 ? 3 : p < 0.82 ? 4 : p < 0.92 ? 5 : 6;

  const INSTRUMENTS = [
    [
      { label: 'Altitude', value: p > 0.15 ? 'Ground' : `${altitudeFt.toLocaleString('de-DE').replace(/\./g, ' ')} ft` },
      { label: 'Gear', value: config > 0.98 ? 'Down · locked' : config > 0.02 ? 'Extending' : 'Up' },
      { label: 'Status', value: p < 0.03 ? 'Cruising' : p < 0.125 ? 'On approach' : p < 0.155 ? 'Touchdown' : 'Roll-out' },
    ],
    [
      { label: 'Route', value: 'B2B webshop' },
      { label: 'Load', value: 'Crates · 24' },
      { label: 'Status', value: 'Delivering' },
    ],
    [
      { label: 'Fleet', value: 'Shared mobility' },
      { label: 'Telemetry', value: 'Live' },
      { label: 'Status', value: 'Unlocked' },
    ],
    [
      { label: 'Case', value: 'Chairside CAD' },
      { label: 'Stage', value: 'Design' },
      { label: 'Status', value: 'Milling' },
    ],
    [
      { label: 'Degree', value: 'M.Sc. Mechatronics' },
      { label: 'Grade', value: '1.1' },
      { label: 'Status', value: 'Awarded' },
    ],
    // here the readouts become the levels themselves
    [
      { label: 'Arabic', value: 'Native' },
      { label: 'English', value: 'C1' },
      { label: 'German', value: 'B2' },
    ],
    [
      { label: 'Based in', value: 'Bergisch Gladbach' },
      { label: 'Time zone', value: 'CET' },
      { label: 'Status', value: 'Say hello' },
    ],
  ];
  const instruments = INSTRUMENTS[activeSceneIndex];

  return {
    /* aircraft */
    gearMainDeg: lerp(-84, 0, easeOut(config)),
    gearNoseDeg: lerp(78, 0, easeOut(config)),
    gearOpacity: band(config, [0.02, 0.2]),
    spoilerDeg: -touch * 42,
    smokeOpacity: touch * (1 - band(p, [0.15, 0.18])),
    smokeScale: 1 + touch * 1.5,
    planeOffsetVh: lerp(-30, 0, sink),
    planePitchDeg: lerp(-2.2, -1.2, config) + flare * 5.5 - roll * 4.6,
    planeOpacity: planeVisible,
    isGrounded: p > 0.145,

    /* worlds */
    cloudDeckOpacity: 1 - band(p, [0.04, 0.11]),
    cloudDeckShiftVh: band(p, [0.04, 0.13]) * 40,
    cloudDeckScale: 1 + band(p, [0.04, 0.13]) * 0.5,
    runwayShiftPx: -(groundPx % 270),
    edgeLightShiftPx: -(groundPx % 159),
    roadShiftPx: -(van.travelledPx % 270),
    streetShiftPx: -(fleet.travelledPx % 270),
    floorShiftPx: -(cerec.travelledPx % 270),
    benchShiftPx: -(gears.travelledPx % 270),

    sceneOpacity: {
      eurowings: planeVisible,
      flaschenpost: visibility(p, WORLD.flaschenpost),
      invers: visibility(p, WORLD.invers),
      conze: visibility(p, WORLD.conze),
      education: visibility(p, WORLD.education),
      languages: visibility(p, WORLD.languages),
      contact: visibility(p, WORLD.contact),
    },

    /* ground vehicles */
    vanOffsetPx: van.offsetPx,
    vanWheelDeg: spin(van.travelledPx, 52),
    fleetOffsetPx: fleet.offsetPx,
    carWheelDeg: spin(fleet.travelledPx, 46),
    mopedWheelDeg: spin(fleet.travelledPx, 34),
    kickWheelDeg: spin(fleet.travelledPx, 26),
    cerecOffsetPx: cerec.offsetPx,
    castorDeg: spin(cerec.travelledPx, 12),
    gearsOffsetPx: gears.offsetPx,
    gearDeg: -spin(gears.travelledPx, 120),
    bubbleRise,
    signpostOffsetPx: signpost.offsetPx,
    /* the CEREC screen wakes once the unit has settled */
    screenOpacity: band(p, [0.59, 0.64]),

    /* copy + chrome */
    copyOpacity: {
      eurowings: 1 - band(p, COPY.eurowings.out),
      flaschenpost: visibility(p, COPY.flaschenpost),
      invers: visibility(p, COPY.invers),
      conze: visibility(p, COPY.conze),
      education: visibility(p, COPY.education),
      languages: visibility(p, COPY.languages),
      contact: visibility(p, COPY.contact),
    },
    activeSceneIndex,
    cueOpacity: 1 - band(p, [0.02, 0.1]),
    instruments,
  };
}
