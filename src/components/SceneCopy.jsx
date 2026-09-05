import { SkillChip } from './SkillChip';

/**
 * The text block for one scene. Real DOM text, never SVG text, so it stays
 * selectable and indexable.
 *
 * A scene can carry more than one role - Conze Informatik covers two - so each
 * role gets its own heading, period and responsibilities.
 *
 * Marked aria-hidden throughout: assistive tech reads the complete CV from
 * <LinearCV/> instead, which avoids announcing every employer twice and gives
 * screen-reader users the sections the scroll story has not reached yet.
 */
export function SceneCopy({ scene, opacity }) {
  const multiRole = scene.roles.length > 1;

  return (
    <article
      className={`copy${multiRole ? ' copy--dense' : ''}`}
      style={{
        opacity,
        transform: `translateY(${(1 - opacity) * 18}px)`,
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
      }}
      aria-hidden="true"
    >
      <div className="ticket">
        <em />
        {scene.ticket}
      </div>
      <h2>
        {scene.display[0]}
        {scene.display[1] ? (
          <>
            <br />
            {scene.display[1]}
          </>
        ) : null}
      </h2>

      <div className="copy__roles">
        {scene.roles.map((role) => (
          <div className="copy__role" key={role.id}>
            <h3>
              {role.title}
              {multiRole && <span className="copy__period">{role.period}</span>}
            </h3>
            <ul>
              {role.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="chips">
        {scene.stack.map((tech) => (
          <SkillChip key={tech.name} name={tech.name} level={tech.level} />
        ))}
      </div>
      {scene.roles.some((role) => role.placeholder) && (
        <p className="placeholder">
          Placeholder scene — send the title, start date, responsibilities and stack to
          replace this.
        </p>
      )}
    </article>
  );
}
