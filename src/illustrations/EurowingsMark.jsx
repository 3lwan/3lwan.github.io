/**
 * The Eurowings Digital Bildmarke, supplied by the company's own site and used
 * verbatim - the same four brand fills the Eurowings scene already paints with
 * (#871C54 / #AF1E65 / #00A6CE, see the palette in data/career.js).
 *
 * Inlined rather than loaded from /public so it inherits nothing from the host
 * page and needs no network round trip. The source markup's Vue scope attribute
 * and per-path `id`s are dropped: ids would be duplicated in the document the
 * moment the mark is drawn twice.
 */
export function EurowingsMark() {
  return (
    <svg viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M35.3007 18.0254C31.5366 18.0254 29.5332 20.0201 29.5332 23.782L29.5419 26.656C29.5419 28.5337 28.5413 29.5343 26.6636 29.5343H34.991C35.1967 28.668 35.3007 27.7086 35.3007 26.656V18.0254Z"
        fill="#00A6CE"
      />
      <path
        d="M9.38297 6.51172C4.79803 6.51172 1.9652 8.49557 1.06641 12.2683H12.2743C15.4536 12.2683 18.0309 9.69107 18.0309 6.51172H9.38297Z"
        fill="#00A6CE"
      />
      <path
        d="M40.7454 6.51248C39.8444 2.73754 37.0008 0.755859 32.4115 0.755859C32.4115 0.755859 23.8004 0.755859 23.7874 0.755859C20.608 0.755859 18.0308 3.33313 18.0308 6.51248H40.7454Z"
        fill="#AF1E65"
      />
      <path
        d="M32.4224 6.51172C34.3001 6.51172 35.3007 7.52313 35.3007 9.40086V18.025C38.48 18.025 41.0573 15.4477 41.0573 12.2683V9.39219C41.0573 8.33963 40.9533 7.37803 40.7454 6.51172H32.4224Z"
        fill="#891C55"
      />
      <path
        d="M26.6657 29.5372H9.39369C7.51596 29.5372 6.51538 28.5366 6.51538 26.6589V15.1435C6.51538 13.3156 7.46399 12.3215 9.24642 12.2695H1.0663C0.860549 13.1337 0.756592 14.0931 0.756592 15.1435V26.6676C0.756592 32.3094 3.76052 35.2939 9.40235 35.2939L26.6744 35.3025C31.2637 35.3025 34.0943 33.3143 34.9909 29.5351H26.6657V29.5372Z"
        fill="#6ACCE0"
      />
    </svg>
  );
}
