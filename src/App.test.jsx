import { render, screen, within } from '@testing-library/react';
import App from './App';
import { LinearCV } from './components/LinearCV';
import { experiences, education, languages, skills, storyScenes } from './data/career';

/**
 * jsdom reports no matchMedia by default, and usePrefersReducedMotion reads it.
 * Default to "motion allowed" so App renders the scroll story, and let
 * individual tests opt into reduced motion.
 */
function mockReducedMotion(reduced) {
  window.matchMedia = (query) => ({
    matches: reduced,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

beforeEach(() => mockReducedMotion(false));

describe('App', () => {
  test('draws the scene stacks as badges', () => {
    const { container } = render(<App />);

    expect(container.querySelectorAll('.badge').length).toBeGreaterThan(0);
    expect(container.querySelector('.chip')).toBeNull();
  });

  test('renders the scroll story when motion is allowed', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.track')).toBeInTheDocument();
    expect(container.querySelector('.stage')).toBeInTheDocument();
  });

  test('renders the plain CV instead when the visitor prefers reduced motion', () => {
    mockReducedMotion(true);
    const { container } = render(<App />);
    expect(container.querySelector('.track')).not.toBeInTheDocument();
    expect(container.querySelector('.linear')).toBeInTheDocument();
    // no hidden duplicate in this mode
    expect(container.querySelector('.cv-fallback')).not.toBeInTheDocument();
  });

  test('keeps the full CV reachable for screen readers behind the scroll story', () => {
    const { container } = render(<App />);
    const fallback = container.querySelector('.cv-fallback');
    expect(fallback).toBeInTheDocument();
    // visually hidden, but NOT hidden from assistive tech
    expect(fallback).not.toHaveAttribute('aria-hidden');
    expect(within(fallback).getByRole('heading', { name: /mohamed elwan/i })).toBeInTheDocument();
  });

  test('scene copy is aria-hidden so employers are not announced twice', () => {
    const { container } = render(<App />);
    container.querySelectorAll('.copy').forEach((copy) => {
      expect(copy).toHaveAttribute('aria-hidden', 'true');
    });
  });
});

describe('LinearCV', () => {
  test('lists every employer, both degrees and all languages', () => {
    render(<LinearCV />);
    experiences.forEach((job) => {
      expect(screen.getAllByText(new RegExp(job.company, 'i')).length).toBeGreaterThan(0);
    });
    education.forEach((item) => {
      expect(screen.getByText(item.degree)).toBeInTheDocument();
    });
    languages.forEach((entry) => {
      expect(screen.getByText(entry.language)).toBeInTheDocument();
    });
  });

  test('shows the real Eurowings role, no placeholder left anywhere', () => {
    render(<LinearCV />);
    expect(
      screen.getByRole('heading', { name: /Eurowings Digital — Senior Software Developer/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Oct 2024/)).toBeInTheDocument();
    expect(screen.queryByText(/details pending/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/placeholder/i)).not.toBeInTheDocument();
  });

  test('renders every skill as a badge, not a text chip', () => {
    const { container } = render(<LinearCV />);

    expect(container.querySelectorAll('.badge')).toHaveLength(skills.length);
    expect(container.querySelector('.chip')).toBeNull();
  });

  test('a scene covering two roles lists each technology once', () => {
    const conze = storyScenes.find((scene) => scene.id === 'conze');
    const labels = conze.stack.map((entry) => entry.label);

    expect(labels).toEqual([...new Set(labels)]);
  });

  test('rated skills are ordered by level, then alphabetically', () => {
    const rated = [
      skills,
      ...experiences.map((job) => job.stack),
      ...storyScenes.map((scene) => scene.stack),
    ].filter((list) => list.some((entry) => entry.level !== undefined));

    rated.forEach((list) => {
      const sorted = [...list].sort(
        (a, b) => b.level - a.level || a.label.localeCompare(b.label)
      );
      expect(list.map((entry) => entry.label)).toEqual(sorted.map((entry) => entry.label));
    });
  });

  test('no employer is left carrying the placeholder flag', () => {
    expect(experiences.filter((job) => job.placeholder)).toHaveLength(0);
  });

  test('every stack entry is an object with a name, and levels stay in 1-5', () => {
    experiences.forEach((job) => {
      job.stack.forEach((tech) => {
        expect(typeof tech.name).toBe('string');
        expect(tech.name.length).toBeGreaterThan(0);
        // the badge face shows the short label, so it must never be longer
        expect(typeof tech.label).toBe('string');
        expect(tech.label.length).toBeGreaterThan(0);
        expect(tech.label.length).toBeLessThanOrEqual(tech.name.length);
        if (tech.level !== undefined) {
          expect(tech.level).toBeGreaterThanOrEqual(1);
          expect(tech.level).toBeLessThanOrEqual(5);
        }
      });
    });
  });
});
