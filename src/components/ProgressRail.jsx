import { sceneRail } from '../data/career';

/**
 * Side rail listing all seven scenes. Scenes not yet built are shown dimmed, so
 * the rail reflects the real state of the story rather than promising screens
 * that do not exist.
 */
export function ProgressRail({ activeIndex }) {
  return (
    <nav className="rail" aria-label="Career scenes">
      {sceneRail.map((scene, index) => {
        const number = String(index + 1).padStart(2, '0');
        const active = scene.built && index === activeIndex;
        return (
          <span
            key={scene.label}
            className={`stop${active ? ' stop--on' : ''}${scene.built ? '' : ' stop--todo'}`}
            aria-current={active ? 'true' : undefined}
          >
            <span>
              {number} {scene.label}
            </span>
            <u />
          </span>
        );
      })}
    </nav>
  );
}
