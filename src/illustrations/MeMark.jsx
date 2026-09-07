/**
 * The ME monogram, as one ligature in two strokes.
 *
 * The M runs up the stem, down to the vertex and up to the right, where it
 * stops - its right leg is also the top arm of the E. The E is a Z of top arm,
 * spine and bottom arm, parallel to that leg. Every diagonal is 3:2 and every
 * stroke is one width, so the three arms step evenly.
 *
 * Outlines rather than strokes, so nothing has to scale with the box, and
 * currentColor rather than a fill, so it takes the colour of whatever it sits
 * in. The same paths are in public/icon.svg and brand/; tools/monogram.py
 * generates them from the construction constants.
 */
export function MeMark({ className }) {
  return (
    <svg
      className={className}
      viewBox="73 56 366 400"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M126.5,343.0 L126.5,155.5 L256.6,242.2 L438.5,120.9 L438.5,57.2 L256.6,178.4 L73.5,56.3 L73.5,378.3 Z" />
      <path d="M438.5,166.4 L264.2,282.6 L264.2,455.7 L438.5,339.5 L438.5,275.7 L317.3,356.5 L317.3,311.0 L438.5,230.2 Z" />
    </svg>
  );
}
