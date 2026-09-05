import { SkillChip } from './SkillChip';

/**
 * The text block for one company scene. Real DOM text, never SVG text, so it
 * stays selectable and indexable.
 *
 * Marked aria-hidden throughout: assistive tech reads the complete CV from
 * <LinearCV/> instead, which avoids announcing every employer twice and gives
 * screen-reader users the sections the scroll story has not reached yet.
 */
export function SceneCopy({ scene, opacity }) {
  return (
    <article
      className="copy"
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
      <h3>{scene.title}</h3>
      <ul>
        {scene.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
      <div className="chips">
        {scene.stack.map((tech) => (
          <SkillChip key={tech.name} name={tech.name} level={tech.level} />
        ))}
      </div>
      {scene.placeholder && (
        <p className="placeholder">
          Placeholder scene — send the title, start date, responsibilities and stack to
          replace this.
        </p>
      )}
    </article>
  );
}
