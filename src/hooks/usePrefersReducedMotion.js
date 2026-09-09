import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * True when the visitor has asked the OS to reduce motion. The scroll story is
 * replaced wholesale by the linear CV in that case - the same layout the print
 * stylesheet uses.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const list = window.matchMedia(QUERY);
    const onChange = (event) => setReduced(event.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
