import { clamp, segment, lerp, easeInOut, easeOut } from './easing';

/**
 * The Eurowings -> Flaschenpost hand-off, as a pure function of scroll progress.
 *
 * The aircraft descends and lands, rolls out, and yields to the van. Both
 * vehicles sit on one shared ground line (see --ground in index.css), which is
 * what lets the van take over exactly where the aircraft stopped - no morphing
 * of geometry required.
 *
 * Timeline, in scroll progress:
 *   .00-.14  cruise
 *   .14-.30  gear extends, descent begins
 *   .20-.55  sinking through the cloud deck toward the runway
 *   .48-.58  flare, then touchdown (smoke, spoilers)
 *   .56-.74  roll-out, decelerating
 *   .72-.86  hand-off: aircraft yields, street fades in, van takes over
 *   .86-1.0  Flaschenpost at rest
 *
 * @param {number} progress 0..1 across the whole track
 * @param {number} viewportWidth used to convert the van's entry into pixels
 * @returns a plain object of style values; no DOM access, so it is unit-testable
 */
export function frameAt(progress, viewportWidth = 1440) {
  const p = clamp(progress, 0, 1);

  const config = segment(p, 0.14, 0.3); // gear extension
  const sink = easeInOut(segment(p, 0.2, 0.55)); // altitude bleed
  const flare = segment(p, 0.48, 0.58);
  const touch = segment(p, 0.52, 0.56);
  const roll = easeOut(segment(p, 0.56, 0.74));
  const hand = easeInOut(segment(p, 0.72, 0.86)); // aircraft -> van

  const groundPx = easeOut(segment(p, 0.2, 0.78)) * 5200;

  // The van enters from the left. `vanOffsetPx` is how far it still has to go
  // (shrinks to 0); `vanTravelPx` is how far it has already come (grows). Wheel
  // rotation and the road stripes must both follow distance TRAVELLED, or the
  // wheels spin backwards as the van settles.
  const vanRunPx = viewportWidth * 0.55;
  const vanOffsetPx = (1 - hand) * vanRunPx;
  const vanTravelPx = hand * vanRunPx;
  const distanceCoveredPx = groundPx * 0.35 + vanTravelPx;
  const wheelSpinDeg = -((distanceCoveredPx / 62) * (180 / Math.PI));

  const altitudeFt = Math.round(lerp(38000, 0, sink) / 100) * 100;

  return {
    // aircraft
    gearMainDeg: lerp(-84, 0, easeOut(config)),
    gearNoseDeg: lerp(78, 0, easeOut(config)),
    spoilerDeg: -touch * 42,
    smokeOpacity: touch * (1 - segment(p, 0.56, 0.63)),
    smokeScale: 1 + touch * 1.5,
    planeOffsetVh: lerp(-30, 0, sink),
    planePitchDeg: lerp(-2.2, -1.2, config) + flare * 5.5 - roll * 4.6,
    planeOpacity: 1 - segment(hand, 0.25, 0.9),
    planeScaleX: lerp(1, 0.95, hand),
    planeScaleY: lerp(1, 0.86, hand),
    isGrounded: p > 0.55,

    // worlds
    cloudDeckOpacity: 1 - segment(p, 0.16, 0.42),
    cloudDeckShiftVh: segment(p, 0.16, 0.46) * 40,
    cloudDeckScale: 1 + segment(p, 0.16, 0.46) * 0.5,
    runwayShiftPx: -(groundPx % 270),
    edgeLightShiftPx: -(groundPx % 159),
    streetOpacity: segment(hand, 0.15, 0.85),
    roadShiftPx: -(distanceCoveredPx % 270),

    // van
    vanEntryPx: -vanOffsetPx,
    vanScaleX: lerp(1.05, 1, hand),
    vanScaleY: lerp(1.16, 1, hand),
    wheelSpinDeg,

    // copy + chrome
    copyOutOpacity: 1 - segment(p, 0.62, 0.76),
    copyInOpacity: segment(p, 0.8, 0.92),
    activeSceneIndex: p < 0.78 ? 0 : 1,
    cueOpacity: 1 - segment(p, 0.02, 0.12),

    // instruments
    altitude: p > 0.56 ? 'Ground' : `${altitudeFt.toLocaleString('de-DE').replace(/\./g, ' ')} ft`,
    gear: p > 0.78 ? 'Rolling' : config > 0.98 ? 'Down · locked' : config > 0.02 ? 'Extending' : 'Up',
    status:
      p < 0.14 ? 'Cruising'
      : p < 0.48 ? 'On approach'
      : p < 0.58 ? 'Touchdown'
      : p < 0.78 ? 'Roll-out'
      : 'Delivering',
  };
}
