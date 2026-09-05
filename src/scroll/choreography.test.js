import { frameAt } from './choreography';
import { segment, lerp, easeOut, clamp } from './easing';

describe('easing helpers', () => {
  test('segment normalises and clamps at both ends', () => {
    expect(segment(0.1, 0.2, 0.6)).toBe(0);
    expect(segment(0.4, 0.2, 0.6)).toBeCloseTo(0.5);
    expect(segment(0.9, 0.2, 0.6)).toBe(1);
  });

  test('clamp and lerp behave at the boundaries', () => {
    expect(clamp(-5, 0, 1)).toBe(0);
    expect(clamp(5, 0, 1)).toBe(1);
    expect(lerp(10, 20, 0.5)).toBe(15);
    expect(easeOut(0)).toBe(0);
    expect(easeOut(1)).toBe(1);
  });
});

describe('frameAt', () => {
  test('clamps out-of-range progress instead of extrapolating', () => {
    expect(frameAt(-1)).toEqual(frameAt(0));
    expect(frameAt(2)).toEqual(frameAt(1));
  });

  test('at cruise the aircraft is high, gear up, van offstage', () => {
    const f = frameAt(0);
    expect(f.planeOffsetVh).toBeCloseTo(-30);
    expect(f.gearMainDeg).toBeCloseTo(-84);
    expect(f.gear).toBe('Up');
    expect(f.status).toBe('Cruising');
    expect(f.altitude).toMatch(/^38 000 ft$/);
    expect(f.planeOpacity).toBe(1);
    expect(f.streetOpacity).toBe(0);
    expect(f.vanEntryPx).toBeLessThan(0);
  });

  test('gear is down and locked before the wheels touch the runway', () => {
    // touchdown begins at .52; gear must have finished extending by .30
    expect(frameAt(0.3).gear).toBe('Down · locked');
    expect(frameAt(0.3).gearMainDeg).toBeCloseTo(0);
    expect(frameAt(0.3).gearNoseDeg).toBeCloseTo(0);
  });

  test('the aircraft reaches the ground line and stays there', () => {
    expect(frameAt(0.55).planeOffsetVh).toBeCloseTo(0);
    expect(frameAt(0.8).planeOffsetVh).toBeCloseTo(0);
    expect(frameAt(1).planeOffsetVh).toBeCloseTo(0);
  });

  test('altitude bleeds off monotonically and reads Ground after touchdown', () => {
    const alt = (p) => frameAt(p).planeOffsetVh;
    expect(alt(0.2)).toBeLessThanOrEqual(alt(0.35));
    expect(alt(0.35)).toBeLessThanOrEqual(alt(0.5));
    expect(frameAt(0.7).altitude).toBe('Ground');
  });

  test('the aircraft flares nose-up at touchdown, then lowers on roll-out', () => {
    expect(frameAt(0.56).planePitchDeg).toBeGreaterThan(frameAt(0.4).planePitchDeg);
    expect(frameAt(0.74).planePitchDeg).toBeLessThan(frameAt(0.56).planePitchDeg);
  });

  test('smoke fires only around touchdown', () => {
    expect(frameAt(0.4).smokeOpacity).toBe(0);
    expect(frameAt(0.56).smokeOpacity).toBeGreaterThan(0);
    expect(frameAt(0.72).smokeOpacity).toBe(0);
  });

  test('hand-off completes: van fully arrived, aircraft gone', () => {
    const f = frameAt(1);
    expect(f.planeOpacity).toBe(0);
    expect(f.streetOpacity).toBe(1);
    expect(f.vanEntryPx).toBeCloseTo(0);
    expect(f.vanScaleX).toBeCloseTo(1);
    expect(f.vanScaleY).toBeCloseTo(1);
    expect(f.status).toBe('Delivering');
  });

  test('the two scenes never both hold the copy at full opacity', () => {
    for (let p = 0; p <= 1; p += 0.01) {
      const f = frameAt(p);
      expect(f.copyOutOpacity + f.copyInOpacity).toBeLessThanOrEqual(1.0001);
    }
  });

  test('wheels roll forward, never backward', () => {
    let previous = 0;
    for (let p = 0; p <= 1; p += 0.02) {
      const spin = frameAt(p).wheelSpinDeg;
      expect(spin).toBeLessThanOrEqual(previous + 1e-9);
      previous = spin;
    }
  });

  test('rail highlights Eurowings first and Flaschenpost last', () => {
    expect(frameAt(0).activeSceneIndex).toBe(0);
    expect(frameAt(0.5).activeSceneIndex).toBe(0);
    expect(frameAt(1).activeSceneIndex).toBe(1);
  });

  test('every numeric output stays finite across the whole scroll', () => {
    for (let p = 0; p <= 1; p += 0.005) {
      for (const [key, value] of Object.entries(frameAt(p))) {
        if (typeof value === 'number') {
          expect(Number.isFinite(value), `${key} at p=${p.toFixed(3)}`).toBe(true);
        }
      }
    }
  });
});
