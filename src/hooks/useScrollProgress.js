import { useEffect, useState } from 'react';

/**
 * Maps window scroll onto 0..1 across a tall "track" element.
 *
 * Returns 0 before the track is reached, ramps to 1 as it scrolls past, and
 * holds at 1 afterwards. Reads are throttled to one per animation frame.
 *
 * Deliberately driven from real scroll rather than hijacking it, so the
 * scrollbar, trackpad, Page Down and keyboard navigation all keep working.
 */
export function useScrollProgress(trackRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    let frame = null;

    const measure = () => {
      frame = null;
      const travel = track.offsetHeight - window.innerHeight;
      if (travel <= 0) {
        setProgress(0);
        return;
      }
      const next = -track.getBoundingClientRect().top / travel;
      setProgress(next < 0 ? 0 : next > 1 ? 1 : next);
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [trackRef]);

  return progress;
}
