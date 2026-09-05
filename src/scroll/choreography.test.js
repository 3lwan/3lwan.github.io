import { frameAt } from './choreography';
import { segment, lerp, easeOut, clamp } from './easing';

const SCENES = ['eurowings', 'flaschenpost', 'invers', 'conze', 'education', 'languages', 'contact'];
const step = (fn, increment = 0.005) => {
  for (let p = 0; p <= 1 + 1e-9; p += increment) fn(Math.min(p, 1), frameAt(Math.min(p, 1)));
};

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

  test('every numeric output stays finite across the whole scroll', () => {
    step((p, f) => {
      const walk = (obj, path) => {
        for (const [key, value] of Object.entries(obj)) {
          if (typeof value === 'number') {
            expect(Number.isFinite(value), `${path}${key} at p=${p.toFixed(3)}`).toBe(true);
          } else if (value && typeof value === 'object' && !Array.isArray(value)) {
            walk(value, `${path}${key}.`);
          }
        }
      };
      walk(f, '');
    });
  });
});

describe('the landing', () => {
  test('at cruise the aircraft is high, gear up and not drawn', () => {
    const f = frameAt(0);
    expect(f.planeOffsetVh).toBeCloseTo(-30);
    expect(f.gearOpacity).toBe(0);
    expect(f.instruments[1].value).toBe('Up');
    expect(f.instruments[2].value).toBe('Cruising');
  });

  test('gear is down and locked before the wheels touch', () => {
    const f = frameAt(0.085);
    expect(f.instruments[1].value).toBe('Down · locked');
    expect(f.gearMainDeg).toBeCloseTo(0);
    expect(f.gearOpacity).toBe(1);
  });

  test('gear is never drawn while the readout says Up', () => {
    step((p, f) => {
      if (f.instruments[1] && f.instruments[1].value === 'Up') {
        expect(f.gearOpacity, `gear drawn at p=${p.toFixed(3)}`).toBe(0);
      }
    });
  });

  test('the aircraft reaches the ground line and stays there', () => {
    [0.145, 0.3, 0.6, 1].forEach((p) => expect(frameAt(p).planeOffsetVh).toBeCloseTo(0));
  });

  test('it flares nose-up at touchdown, then lowers through the roll-out', () => {
    expect(frameAt(0.15).planePitchDeg).toBeGreaterThan(frameAt(0.1).planePitchDeg);
    expect(frameAt(0.205).planePitchDeg).toBeLessThan(frameAt(0.15).planePitchDeg);
  });

  test('smoke fires only around touchdown', () => {
    expect(frameAt(0.1).smokeOpacity).toBe(0);
    expect(frameAt(0.148).smokeOpacity).toBeGreaterThan(0);
    expect(frameAt(0.2).smokeOpacity).toBe(0);
  });
});

describe('scene hand-offs', () => {
  test('each scene reaches full strength while it holds', () => {
    expect(frameAt(0.0).sceneOpacity.eurowings).toBe(1);
    expect(frameAt(0.33).sceneOpacity.flaschenpost).toBe(1);
    expect(frameAt(0.47).sceneOpacity.invers).toBe(1);
    expect(frameAt(0.62).sceneOpacity.conze).toBe(1);
    expect(frameAt(0.77).sceneOpacity.education).toBe(1);
    expect(frameAt(0.885).sceneOpacity.languages).toBe(1);
    expect(frameAt(1.0).sceneOpacity.contact).toBe(1);
  });

  test('each scene is fully gone once its successor has settled', () => {
    expect(frameAt(0.33).sceneOpacity.eurowings).toBe(0);
    expect(frameAt(0.47).sceneOpacity.flaschenpost).toBe(0);
    expect(frameAt(0.62).sceneOpacity.invers).toBe(0);
    expect(frameAt(0.77).sceneOpacity.conze).toBe(0);
    expect(frameAt(1.0).sceneOpacity.education).toBe(0);
  });

  test('a scene never fades back in once it has left', () => {
    SCENES.forEach((scene) => {
      let seenFull = false;
      let ended = false;
      step((p, f) => {
        const value = f.sceneOpacity[scene];
        if (value > 0.99) seenFull = true;
        if (seenFull && value === 0) ended = true;
        if (ended) expect(value, `${scene} returned at p=${p.toFixed(3)}`).toBe(0);
      });
    });
  });

  test('exactly one scene dominates at any point', () => {
    step((p, f) => {
      const strongest = Math.max(...SCENES.map((s) => f.sceneOpacity[s]));
      expect(strongest, `no scene visible at p=${p.toFixed(3)}`).toBeGreaterThan(0.4);
    });
  });
});

describe('copy', () => {
  test('there is never a stretch of scroll with no copy on screen', () => {
    step((p, f) => {
      const visible = Math.max(...SCENES.map((s) => f.copyOpacity[s]));
      expect(visible, `no copy at p=${p.toFixed(3)}`).toBeGreaterThan(0.25);
    });
  });

  test('two copy blocks never both sit at full opacity', () => {
    step((p, f) => {
      const total = SCENES.reduce((sum, s) => sum + f.copyOpacity[s], 0);
      expect(total, `copy stacked at p=${p.toFixed(3)}`).toBeLessThanOrEqual(1.0001);
    });
  });

  test('each employer gets its own moment', () => {
    expect(frameAt(0.1).copyOpacity.eurowings).toBe(1);
    expect(frameAt(0.32).copyOpacity.flaschenpost).toBe(1);
    expect(frameAt(0.46).copyOpacity.invers).toBe(1);
    expect(frameAt(0.6).copyOpacity.conze).toBe(1);
    expect(frameAt(0.755).copyOpacity.education).toBe(1);
    expect(frameAt(0.875).copyOpacity.languages).toBe(1);
    expect(frameAt(0.98).copyOpacity.contact).toBe(1);
  });
});

describe('ground vehicles', () => {
  test('each waits offstage left, arrives, then leaves to the right', () => {
    expect(frameAt(0.0).vanOffsetPx).toBeLessThan(0);
    expect(frameAt(0.33).vanOffsetPx).toBeCloseTo(0);
    expect(frameAt(1.0).vanOffsetPx).toBeGreaterThan(0);

    expect(frameAt(0.2).fleetOffsetPx).toBeLessThan(0);
    expect(frameAt(0.47).fleetOffsetPx).toBeCloseTo(0);
    expect(frameAt(1.0).fleetOffsetPx).toBeGreaterThan(0);

    expect(frameAt(0.3).cerecOffsetPx).toBeLessThan(0);
    expect(frameAt(0.62).cerecOffsetPx).toBeCloseTo(0);
    expect(frameAt(1.0).cerecOffsetPx).toBeGreaterThan(0);

    expect(frameAt(0.5).gearsOffsetPx).toBeLessThan(0);
    expect(frameAt(0.77).gearsOffsetPx).toBeCloseTo(0);
    expect(frameAt(1.0).gearsOffsetPx).toBeGreaterThan(0);

    expect(frameAt(0.7).signpostOffsetPx).toBeLessThan(0);
    expect(frameAt(1.0).signpostOffsetPx).toBeCloseTo(0);
  });

  test('every wheel rolls forward and never backward', () => {
    ['vanWheelDeg', 'carWheelDeg', 'mopedWheelDeg', 'kickWheelDeg', 'castorDeg'].forEach((key) => {
      let previous = Infinity;
      step((p, f) => {
        expect(f[key], `${key} reversed at p=${p.toFixed(3)}`).toBeLessThanOrEqual(previous + 1e-9);
        previous = f[key];
      }, 0.01);
    });
  });

  test('the CEREC screen only wakes once the unit has settled', () => {
    expect(frameAt(0.55).screenOpacity).toBe(0);
    expect(frameAt(0.64).screenOpacity).toBe(1);
  });
});

describe('instruments and rail', () => {
  test('readouts are re-labelled per scene', () => {
    expect(frameAt(0.0).instruments[0].label).toBe('Altitude');
    expect(frameAt(0.32).instruments[0].label).toBe('Route');
    expect(frameAt(0.46).instruments[0].label).toBe('Fleet');
    expect(frameAt(0.6).instruments[0].label).toBe('Case');
    expect(frameAt(0.75).instruments[0].label).toBe('Degree');
    expect(frameAt(0.85).instruments[0].label).toBe('Arabic');
    expect(frameAt(0.97).instruments[0].label).toBe('Based in');
  });

  test('there are always exactly three readouts, all filled in', () => {
    step((p, f) => {
      expect(f.instruments).toHaveLength(3);
      f.instruments.forEach((row) => {
        expect(typeof row.label).toBe('string');
        expect(row.value.length).toBeGreaterThan(0);
      });
    });
  });

  test('the rail advances through all four scenes and never goes backwards', () => {
    expect(frameAt(0).activeSceneIndex).toBe(0);
    expect(frameAt(1).activeSceneIndex).toBe(6);
    let previous = 0;
    step((p, f) => {
      expect(f.activeSceneIndex).toBeGreaterThanOrEqual(previous);
      previous = f.activeSceneIndex;
    });
  });
});

describe('the panel always describes the scene on screen', () => {
  const FIRST_LABEL = ['Altitude', 'Route', 'Fleet', 'Case', 'Degree', 'Arabic', 'Based in'];

  test('readouts and the rail never disagree', () => {
    step((p, f) => {
      expect(f.instruments[0].label, `panel/rail disagree at p=${p.toFixed(3)}`).toBe(
        FIRST_LABEL[f.activeSceneIndex]
      );
    });
  });

  test('the rail reaches every one of the seven scenes', () => {
    const seen = new Set();
    step((p, f) => seen.add(f.activeSceneIndex));
    expect([...seen].sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });
});
