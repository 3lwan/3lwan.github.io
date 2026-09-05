import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the name and role in the header', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /mohamed elwan/i })).toBeInTheDocument();
  expect(screen.getByText(/c# software developer/i)).toBeInTheDocument();
});

test('lists every employer in the timeline', () => {
  // Eurowings Digital is deliberately absent: the CV data still stops at
  // Flaschenpost (Sept 2024). Add it here once the role details land.
  // Conze Informatik appears twice - two roles at the same employer.
  render(<App />);
  ['Flaschenpost', 'INVERS', 'Conze Informatik'].forEach((company) => {
    expect(screen.getAllByText(company).length).toBeGreaterThan(0);
  });
});

test('renders both degrees', () => {
  render(<App />);
  expect(screen.getByText(/M\.Sc\. in Mechatronics Engineering/i)).toBeInTheDocument();
  expect(screen.getByText(/B\.Sc\. in Engineering and Material Science/i)).toBeInTheDocument();
});
