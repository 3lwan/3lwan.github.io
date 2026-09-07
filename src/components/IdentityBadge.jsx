import { useEffect, useRef, useState } from 'react';
import { profile, currentEmployer } from '../data/career';
import { EurowingsMark } from '../illustrations/EurowingsMark';
import { MeMark } from '../illustrations/MeMark';

/**
 * The brandmark - monogram and name - and the identity card it opens.
 *
 * Drawn in the skill badges' visual language - the same shield silhouette and
 * the same mono type - but wearing the current employer's colours instead of
 * the badges' neutral glass, so the card reads as an employee pass rather than
 * a sixth skill.
 *
 * Unlike <SceneCopy/>, this lives in the stage chrome, which is not
 * aria-hidden. The links here are therefore real, focusable links: this is the
 * one place in the scroll story where contact details are reachable by
 * keyboard.
 */

/** Initials for the card face, so the monogram follows the name in the data. */
const MONOGRAM = profile.name
  .split(' ')
  .map((part) => part[0])
  .join('');

/** tel: wants no spaces; the visible text keeps them. */
const TEL_HREF = `tel:${profile.phone.replace(/\s/g, '')}`;

/**
 * The handle inside a profile URL, so a row reads "GITHUB  3lwan" rather than
 * saying the network's name twice. Route segments that only describe the page
 * ("in", "profile", "cv") are not handles.
 */
const ROUTE_WORDS = new Set(['in', 'profile', 'cv']);

function handleOf(url) {
  const segments = new URL(url).pathname.split('/').filter(Boolean);
  return segments.find((segment) => !ROUTE_WORDS.has(segment)) ?? url;
}

const CONTACTS = [
  { label: 'Email', text: profile.email, href: `mailto:${profile.email}` },
  { label: 'Phone', text: profile.phone, href: TEL_HREF },
  { label: 'GitHub', text: handleOf(profile.links.github), href: profile.links.github },
  { label: 'LinkedIn', text: handleOf(profile.links.linkedin), href: profile.links.linkedin },
  { label: 'Xing', text: handleOf(profile.links.xing), href: profile.links.xing },
];

export function IdentityBadge() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      // the card is leaving, so focus has to go somewhere deliberate
      triggerRef.current?.focus();
    };
    const onPointerDown = (event) => {
      if (rootRef.current?.contains(event.target)) return;
      setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [open]);

  const { primary, accent, secondary } = currentEmployer.palette;

  return (
    <div className="brandmark__identity" ref={rootRef}>
      <button
        type="button"
        className="brandmark__name"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        ref={triggerRef}
      >
        {/* One control, not two: the monogram sits inside the same button as
            the name, so there is a single tab stop and the card cannot be
            opened by one half and closed by the other. The mark is
            aria-hidden, so the button is still named by the name alone. */}
        <MeMark className="brandmark__logo" />
        <span className="brandmark__wordmark">{profile.name}</span>
      </button>

      {open && (
        <div
          className="idcard"
          role="dialog"
          aria-label={`${profile.name} — identity card`}
          style={{ '--brand': primary, '--brand-accent': accent, '--brand-sky': secondary }}
        >
          <div className="idcard__strip">
            <span className="idcard__mark">
              <EurowingsMark />
            </span>
            <span className="idcard__employer">{currentEmployer.company}</span>
          </div>

          <div className="idcard__body">
            <span className="idcard__shield">
              <span className="idcard__monogram">{MONOGRAM}</span>
            </span>
            <div className="idcard__who">
              <b>{profile.name}</b>
              <span>{profile.role}</span>
              <span>{profile.location}</span>
            </div>
          </div>

          <ul className="idcard__contacts">
            {CONTACTS.map((contact) => (
              <li key={contact.label}>
                <i>{contact.label}</i>
                <a
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                >
                  {contact.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
