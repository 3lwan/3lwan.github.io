/**
 * One skill, drawn as a shield badge.
 *
 * The face carries the short registry label (".NET", "JS", "K8s") so every
 * badge stays the same width; the full name arrives in a tooltip on hover.
 * Because that tooltip is hover-only, the name and level are also written out
 * for assistive tech - and that same line is what the print stylesheet shows.
 *
 * Every badge is a rated technology: education and languages carry no badges at
 * all, because a star rating would mean nothing there.
 *
 * `label` rather than `key`: React consumes a `key` prop when a skill object is
 * spread into the component, so the face text would never arrive.
 */

/** Proficiency colour ramp, carried over from the pre-redesign chips. */
const LEVEL_COLORS = ['#CC0000', '#FF8C00', '#CCCC00', '#2F9E44', '#2F9E44'];

const STAR_SLOTS = [1, 2, 3, 4, 5];

function Star({ on }) {
  return (
    <svg
      className={`badge__star${on ? ' badge__star--on' : ''}`}
      viewBox="0 0 20 19"
      aria-hidden="true"
    >
      <path d="M10 0l2.9 6.2 6.8.9-5 4.7 1.3 6.7L10 15.3 4 18.5l1.3-6.7-5-4.7 6.8-.9z" />
    </svg>
  );
}

export function SkillBadge({ label, name, level }) {
  return (
    <span className="badge" style={{ '--level-color': LEVEL_COLORS[level - 1] ?? '#2F9E44' }}>
      <span className="badge__face">
        <span className="badge__label" aria-hidden="true">
          {label}
        </span>
        <span className="badge__stars" aria-hidden="true">
          {STAR_SLOTS.map((slot) => (
            <Star key={slot} on={slot <= level} />
          ))}
        </span>
      </span>
      <span className="badge__tip" role="tooltip" aria-hidden="true">
        {name}
      </span>
      <span className="badge__sr">{`${name} — ${level} out of 5`}</span>
    </span>
  );
}
