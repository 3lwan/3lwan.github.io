import { profile, phoneHref, experiences, education, languages, skills } from '../data/career';
import { SkillBadge } from './SkillBadge';

/**
 * The whole CV as a plain, readable document.
 *
 * Serves three jobs at once: the prefers-reduced-motion experience, the print
 * stylesheet, and the accessible/no-JS baseline. Nothing here depends on scroll.
 */
export function LinearCV() {
  return (
    <div className="linear">
      <header>
        <h1>{profile.name}</h1>
        <p className="linear__role">
          {profile.role} · {profile.location}
        </p>
        <p className="linear__contact">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          {' · '}
          <a href={phoneHref}>{profile.phone}</a>
          {' · '}
          <a href={profile.links.github}>GitHub</a>
          {' · '}
          <a href={profile.links.linkedin}>LinkedIn</a>
          {' · '}
          <a href={profile.links.xing}>Xing</a>
        </p>
      </header>

      <section>
        <h2>Experience</h2>
        {experiences.map((job) => (
          <article key={job.id} className="linear__job">
            <h3>
              {job.company} — {job.title}
            </h3>
            <p className="linear__period">
              {job.period}
              {job.placeholder ? ' · details pending' : ''}
            </p>
            <ul>
              {job.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <p className="linear__stack">{job.stack.map((t) => t.name).join(' · ')}</p>
          </article>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        {education.map((item) => (
          <article key={item.degree} className="linear__job">
            <h3>{item.degree}</h3>
            <p className="linear__period">
              {item.school} · {item.period}
            </p>
            <ul>
              {item.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <div className="chips">
          {skills.map((skill) => (
            <SkillBadge key={skill.name} {...skill} />
          ))}
        </div>
      </section>

      <section>
        <h2>Languages</h2>
        <ul className="linear__languages">
          {languages.map((entry) => (
            <li key={entry.language}>
              <span>{entry.language}</span>
              <span>{entry.level}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
