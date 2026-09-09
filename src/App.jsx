import { useEffect } from 'react';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { useHashRoute } from './hooks/useHashRoute';
import { ScrollStory } from './ScrollStory';
import { LinearCV } from './components/LinearCV';
import { CVPage } from './pages/CVPage';
import { profile } from './data/career';
import './App.css';

const TITLES = {
  story: `${profile.name} — ${profile.role}`,
  cv: `${profile.name} — CV`,
};

export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const route = useHashRoute();

  // Reduced motion never gets the scroll story, whatever the route says.
  const showCV = reducedMotion || route === '/cv';

  useEffect(() => {
    document.title = showCV ? TITLES.cv : TITLES.story;
  }, [showCV]);

  if (showCV) return <CVPage canReturn={!reducedMotion} />;

  return (
    <>
      <ScrollStory />
      {/* The full CV, visually hidden but present for screen readers and for
          print. Not display:none, or assistive tech would not reach it either. */}
      <div className="cv-fallback">
        <LinearCV />
      </div>
    </>
  );
}
