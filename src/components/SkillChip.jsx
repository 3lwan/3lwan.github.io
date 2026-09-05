/**
 * Skill tag whose hover fill shows proficiency (1-5).
 * The gradient-fill treatment is carried over from the pre-redesign App.jsx.
 */
const LEVEL_COLORS = ['#CC0000', '#FF8C00', '#CCCC00', '#2F9E44', '#2F9E44'];

export function SkillChip({ name, level }) {
  if (level === undefined) return <span className="chip">{name}</span>;

  return (
    <span
      className="chip chip--rated"
      style={{
        '--skill-color': LEVEL_COLORS[level - 1] ?? '#2F9E44',
        '--skill-fill': `${(level / 5) * 100}%`,
        '--skill-text': level > 3 ? '#fff' : '#111',
      }}
    >
      <span className="chip__label">{name}</span>
      <span className="chip__fill" aria-hidden="true" />
    </span>
  );
}
