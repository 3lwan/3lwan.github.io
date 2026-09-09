import { SkillBadge } from './SkillBadge';

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
 *
 * That is also why every link here carries tabIndex={-1}. A focusable element
 * inside aria-hidden content is a genuine accessibility fault: focus lands
 * somewhere the screen reader will not announce. These links stay clickable by
 * mouse and touch, and the same destinations are reachable by keyboard and by
 * assistive tech on the quick-view CV, which the "Quick view" link in the stage
 * chrome leads to.
 */

/** A responsibility line, which may itself be a link (the contact email). */
function Detail({ detail }) {
  if (typeof detail === 'string') return <li>{detail}</li>;
  if (!detail.href) return <li>{detail.text}</li>;
  return (
    <li>
      <a className="copy__inline-link" href={detail.href} tabIndex={-1}>
        {detail.text}
      </a>
    </li>
  );
}

export function SceneCopy({ scene, opacity }) {
  const multiRole = scene.roles.length > 1;
  const classes = ['copy'];
  if (multiRole) classes.push('copy--dense');
  // scenes whose copy runs tall enough to climb into the illustration
  if (scene.layout === 'aside') classes.push('copy--aside');
  // scenes whose copy is short, so it can sit closer to the horizon
  if (scene.layout === 'lifted') classes.push('copy--lifted');

  return (
    <article
      className={classes.join(' ')}
      data-scene={scene.id}
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

      <div className="copy__body">
        <div className="copy__roles">
          {scene.roles.map((role) => (
            <div className="copy__role" key={role.id}>
              <h3>
                {role.title}
                {multiRole && <span className="copy__period">{role.period}</span>}
              </h3>
              <ul>
                {role.details.map((detail) => (
                  <Detail key={typeof detail === 'string' ? detail : detail.text} detail={detail} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        {scene.stack.length > 0 && (
          <div className="chips">
            {scene.stack.map((tech) => (
              <SkillBadge key={tech.name} label={tech.label} name={tech.name} level={tech.level} />
            ))}
          </div>
        )}
      </div>

      {scene.links && (
        <div className="copy__links">
          {scene.links.map((link) => (
            <a
              key={link.label}
              className="copy__link"
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              tabIndex={-1}
            >
              {link.label}
              <span aria-hidden="true"> ↗</span>
            </a>
          ))}
        </div>
      )}

      {scene.roles.some((role) => role.placeholder) && (
        <p className="placeholder">
          Placeholder scene — send the title, start date, responsibilities and stack to
          replace this.
        </p>
      )}
    </article>
  );
}
