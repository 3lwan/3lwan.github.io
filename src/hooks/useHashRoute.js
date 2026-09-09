import { useEffect, useState } from 'react';

const read = () => {
  if (typeof window === 'undefined') return '/';
  const raw = window.location.hash.replace(/^#/, '');
  return raw === '' ? '/' : raw;
};

/**
 * Minimal hash router: returns '/' or '/cv'.
 *
 * Hash rather than path routing on purpose. GitHub Pages serves static files
 * with no rewrite rules, so `/cv` would 404 on refresh or on a shared link.
 * A hash route needs no server config and no 404.html redirect trick.
 */
export function useHashRoute() {
  const [route, setRoute] = useState(read);

  useEffect(() => {
    const onChange = () => setRoute(read());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
