import '@testing-library/jest-dom';

// jsdom has no layout engine, so scrollTo is unimplemented and logs a noisy
// "not implemented" trace whenever a component scrolls on mount.
window.scrollTo = () => {};
