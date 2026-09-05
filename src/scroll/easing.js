export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

/** Normalise `v` to 0..1 across the window [a, b], clamped at both ends. */
export const segment = (v, a, b) => clamp((v - a) / (b - a), 0, 1);

export const lerp = (a, b, t) => a + (b - a) * t;

export const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t) => 1 - Math.pow(1 - t, 3);
export const easeIn = (t) => t * t * t;
