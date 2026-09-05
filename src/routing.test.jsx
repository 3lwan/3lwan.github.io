import { render, screen, within, act } from '@testing-library/react';
import App from './App';
import { profile } from './data/career';

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

function goTo(hash) {
  act(() => {
    window.location.hash = hash;
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });
}

beforeEach(() => {
  mockReducedMotion(false);
  window.location.hash = '';
});

describe('routing', () => {
  test('the default route shows the scroll story', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.track')).toBeInTheDocument();
    expect(container.querySelector('.cv-page')).not.toBeInTheDocument();
  });

  test('#/cv shows the quick-view CV instead', () => {
    window.location.hash = '#/cv';
    const { container } = render(<App />);
    expect(container.querySelector('.cv-page')).toBeInTheDocument();
    expect(container.querySelector('.track')).not.toBeInTheDocument();
  });

  test('navigating between the two views works both ways', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.track')).toBeInTheDocument();

    goTo('#/cv');
    expect(container.querySelector('.cv-page')).toBeInTheDocument();

    goTo('#/');
    expect(container.querySelector('.track')).toBeInTheDocument();
  });

  test('the scroll story offers a visible way into the quick view', () => {
    render(<App />);
    const link = screen.getByRole('link', { name: /quick view/i });
    expect(link).toHaveAttribute('href', '#/cv');
  });

  test('the quick view offers a way back, and a print action', () => {
    window.location.hash = '#/cv';
    render(<App />);
    expect(screen.getByRole('link', { name: /see the full story/i })).toHaveAttribute('href', '#/');
    expect(screen.getByRole('button', { name: /print/i })).toBeInTheDocument();
  });

  test('reduced motion lands on the CV and offers no route back to the story', () => {
    mockReducedMotion(true);
    const { container } = render(<App />);
    expect(container.querySelector('.cv-page')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /see the full story/i })).not.toBeInTheDocument();
  });

  test('reduced motion wins even if the URL asks for the story', () => {
    mockReducedMotion(true);
    window.location.hash = '#/';
    const { container } = render(<App />);
    expect(container.querySelector('.track')).not.toBeInTheDocument();
    expect(container.querySelector('.cv-page')).toBeInTheDocument();
  });

  test('the document title reflects the active view', () => {
    const { container } = render(<App />);
    expect(document.title).toBe(`${profile.name} — ${profile.role}`);
    goTo('#/cv');
    expect(document.title).toBe(`${profile.name} — CV`);
    expect(container.querySelector('.cv-page')).toBeInTheDocument();
  });

  test('both views serve the same CV content from one source', () => {
    const story = render(<App />);
    const hidden = story.container.querySelector('.cv-fallback');
    const fromStory = within(hidden).getByRole('heading', { name: /Eurowings Digital/i }).textContent;
    story.unmount();

    window.location.hash = '#/cv';
    const page = render(<App />);
    const fromPage = within(page.container.querySelector('.cv-page'))
      .getByRole('heading', { name: /Eurowings Digital/i })
      .textContent;

    expect(fromPage).toBe(fromStory);
  });
});
