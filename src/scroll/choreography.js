import { clamp, segment, lerp, easeInOut, easeOut } from './easing';

/**
 * The whole four-scene story, as a pure function of scroll progress.
 *
 * No DOM access, so the motion can be unit-tested without a browser.
 *
 * Every vehicle sits on one shared ground line (--ground in index.css) and
 * travels the same direction: entering from the left, leaving to the right.
 * That is what lets one scene hand over to the next without morphing geometry.
 *
 * Timeline
 *   .000-.055  cruise
 *   .055-.300  the landing: gear, descent, flare, touchdown, roll-out
 *   .300-.390  hand-off to the Flaschenpost van
 *   .390-.520  Flaschenpost at rest
 *   .520-.610  hand-off to the INVERS fleet
 *   .610-.740  INVERS at rest
 *   .740-.830  hand-off to the Conze CEREC unit
 *   .830-1.00  Conze at rest
 */

/** Copy windows deliberately overlap, so no stretch of scroll is text-free. */
const COPY = {
  eurowings: { in: [-1, -1], out: [0.27, 0.34] },
  flaschenpost: { in: [0.3, 0.37], out: [0.5, 0.57] },
  invers: { in: [0.53, 0.6], out: [0.72, 0.79] },
  conze: { in: [0.75, 0.82], out: [2, 3] },
};

const WORLD = {
  eurowings: { in: [-1, -1], out: [0.3, 0.37] },
  flaschenpost: { in: [0.3, 0.38], out: [0.53, 0.6] },
  invers: { in: [0.53, 0.61], out: [0.75, 0.82] },
  conze: { in: [0.75, 0.83], out: [2, 3] },
};

/** Enter from the left, hold, leave to the right. */
const TRAVEL = {
  van: { enter: [0.3, 0.4], leave: [0.52, 0.61] },
  fleet: { enter: [0.52, 0.62], leave: [0.74, 0.83] },
  cerec: { enter: [0.74, 0.84], leave: [2, 3] },
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
  const config = band(p, [0.055, 0.12]); // gear extension
  const sink = easeInOut(band(p, [0.075, 0.205]));
  const flare = band(p, [0.185, 0.225]);
  const touch = band(p, [0.2, 0.22]);
  const roll = easeOut(band(p, [0.215, 0.3]));
  const groundPx = easeOut(band(p, [0.075, 0.3])) * 5200;

  const planeVisible = visibility(p, WORLD.eurowings);

  /* ---------------- ground vehicles ---------------- */
  const van = transit(p, TRAVEL.van, run);
  const fleet = transit(p, TRAVEL.fleet, run);
  const cerec = transit(p, TRAVEL.cerec, run);

  const spin = (travelledPx, radius) => -((travelledPx / radius) * (180 / Math.PI));

  /* ---------------- instruments, per scene ---------------- */
  const altitudeFt = Math.round(lerp(38000, 0, sink) / 100) * 100;
  let instruments;
  if (p < 0.3) {
    instruments = [
      { label: 'Altitude', value: p > 0.22 ? 'Ground' : `${altitudeFt.toLocaleString('de-DE').replace(/\./g, ' ')} ft` },
      { label: 'Gear', value: config > 0.98 ? 'Down · locked' : config > 0.02 ? 'Extending' : 'Up' },
      { label: 'Status', value: p < 0.055 ? 'Cruising' : p < 0.185 ? 'On approach' : p < 0.225 ? 'Touchdown' : 'Roll-out' },
    ];
  } else if (p < 0.56) {
    instruments = [
      { label: 'Route', value: 'B2B webshop' },
      { label: 'Load', value: 'Crates · 24' },
      { label: 'Status', value: 'Delivering' },
    ];
  } else if (p < 0.78) {
    instruments = [
      { label: 'Fleet', value: 'Shared mobility' },
      { label: 'Telemetry', value: 'Live' },
      { label: 'Status', value: 'Unlocked' },
    ];
  } else {
    instruments = [
      { label: 'Case', value: 'Chairside CAD' },
      { label: 'Stage', value: 'Design' },
      { label: 'Status', value: 'Milling' },
    ];
  }

  const activeSceneIndex = p < 0.33 ? 0 : p < 0.56 ? 1 : p < 0.78 ? 2 : 3;

  return {
    /* aircraft */
    gearMainDeg: lerp(-84, 0, easeOut(config)),
    gearNoseDeg: lerp(78, 0, easeOut(config)),
    gearOpacity: band(config, [0, 0.18]),
    spoilerDeg: -touch * 42,
    smokeOpacity: touch * (1 - band(p, [0.22, 0.26])),
    smokeScale: 1 + touch * 1.5,
    planeOffsetVh: lerp(-30, 0, sink),
    planePitchDeg: lerp(-2.2, -1.2, config) + flare * 5.5 - roll * 4.6,
    planeOpacity: planeVisible,
    isGrounded: p > 0.21,

    /* worlds */
    cloudDeckOpacity: 1 - band(p, [0.06, 0.17]),
    cloudDeckShiftVh: band(p, [0.06, 0.19]) * 40,
    cloudDeckScale: 1 + band(p, [0.06, 0.19]) * 0.5,
    runwayShiftPx: -(groundPx % 270),
    edgeLightShiftPx: -(groundPx % 159),
    roadShiftPx: -(van.travelledPx % 270),
    streetShiftPx: -(fleet.travelledPx % 270),
    floorShiftPx: -(cerec.travelledPx % 270),

    sceneOpacity: {
      eurowings: planeVisible,
      flaschenpost: visibility(p, WORLD.flaschenpost),
      invers: visibility(p, WORLD.invers),
      conze: visibility(p, WORLD.conze),
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
    /* the CEREC screen wakes once the unit has settled */
    screenOpacity: band(p, [0.82, 0.88]),

    /* copy + chrome */
    copyOpacity: {
      eurowings: 1 - band(p, COPY.eurowings.out),
      flaschenpost: visibility(p, COPY.flaschenpost),
      invers: visibility(p, COPY.invers),
      conze: visibility(p, COPY.conze),
    },
    activeSceneIndex,
    cueOpacity: 1 - band(p, [0.02, 0.1]),
    instruments,
  };
}
