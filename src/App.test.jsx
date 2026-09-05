import { render, screen, within } from '@testing-library/react';
import App from './App';
import { LinearCV } from './components/LinearCV';
import { experiences, education, languages } from './data/career';

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

  test('no employer is left carrying the placeholder flag', () => {
    expect(experiences.filter((job) => job.placeholder)).toHaveLength(0);
  });

  test('every stack entry is an object with a name, and levels stay in 1-5', () => {
    experiences.forEach((job) => {
      job.stack.forEach((tech) => {
        expect(typeof tech.name).toBe('string');
        expect(tech.name.length).toBeGreaterThan(0);
        if (tech.level !== undefined) {
          expect(tech.level).toBeGreaterThanOrEqual(1);
          expect(tech.level).toBeLessThanOrEqual(5);
        }
      });
    });
  });
});
