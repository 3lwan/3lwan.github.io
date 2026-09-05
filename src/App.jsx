import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { ScrollStory } from './ScrollStory';
import { LinearCV } from './components/LinearCV';
import './App.css';

export default function App() {
  const reducedMotion = usePrefersReducedMotion();

  // Reduced motion gets the plain CV outright - no hidden duplicate.
  if (reducedMotion) return <LinearCV />;

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
