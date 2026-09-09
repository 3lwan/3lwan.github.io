import { useEffect } from 'react';
import { LinearCV } from '../components/LinearCV';

/**
 * The CV as a plain, fast document - for anyone who would rather read than
 * scroll, and for printing.
 *
 * Content comes from the same LinearCV component the scroll story hides behind
 * itself, so the two views cannot drift apart.
 *
 * @param {boolean} canReturn false when reduced motion is on, since the scroll
 *   story is not available to return to in that case.
 */
export function CVPage({ canReturn }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="cv-page">
      <div className="cv-actions">
        {canReturn && (
          <a className="cv-action" href="#/">
            ← See the full story
          </a>
        )}
        <button className="cv-action" type="button" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>
      <LinearCV />
    </div>
  );
}
