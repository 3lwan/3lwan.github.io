import { fireEvent, render, screen } from '@testing-library/react';
import { IdentityBadge } from './IdentityBadge';
import { profile, currentEmployer } from '../data/career';

describe('IdentityBadge', () => {
  test('shows the name on the trigger', () => {
    render(<IdentityBadge />);

    expect(screen.getByRole('button', { name: profile.name })).toBeInTheDocument();
  });

  test('draws the monogram on the trigger, without renaming the button', () => {
    const { container } = render(<IdentityBadge />);

    const trigger = screen.getByRole('button', { name: profile.name });

    expect(trigger.querySelector('.brandmark__logo')).toBeInTheDocument();
    // the mark is decorative: the button is still named by the name alone
    expect(trigger.querySelector('.brandmark__logo')).toHaveAttribute('aria-hidden', 'true');
  });

  test('clicking the monogram opens the card, the same as the name', () => {
    const { container } = render(<IdentityBadge />);

    fireEvent.click(container.querySelector('.brandmark__logo'));

    expect(container.querySelector('.idcard')).toBeInTheDocument();
  });

  test('keeps the card closed until the name is clicked', () => {
    const { container } = render(<IdentityBadge />);

    expect(container.querySelector('.idcard')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: profile.name })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  test('opens the card when the name is clicked', () => {
    const { container } = render(<IdentityBadge />);

    fireEvent.click(screen.getByRole('button', { name: profile.name }));

    expect(container.querySelector('.idcard')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: profile.name })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  test('clicking the name again closes the card', () => {
    const { container } = render(<IdentityBadge />);
    const trigger = screen.getByRole('button', { name: profile.name });

    fireEvent.click(trigger);
    fireEvent.click(trigger);

    expect(container.querySelector('.idcard')).not.toBeInTheDocument();
  });

  test('names the employer and draws its mark on the open card', () => {
    const { container } = render(<IdentityBadge />);

    fireEvent.click(screen.getByRole('button', { name: profile.name }));

    expect(screen.getByText(currentEmployer.company)).toBeInTheDocument();
    expect(container.querySelector('.idcard__mark svg')).toBeInTheDocument();
  });

  test('carries the employer palette so the card takes its colours', () => {
    const { container } = render(<IdentityBadge />);

    fireEvent.click(screen.getByRole('button', { name: profile.name }));

    expect(container.querySelector('.idcard').style.getPropertyValue('--brand')).toBe(
      currentEmployer.palette.primary,
    );
  });

  test('states the role and location', () => {
    render(<IdentityBadge />);

    fireEvent.click(screen.getByRole('button', { name: profile.name }));

    expect(screen.getByText(profile.role)).toBeInTheDocument();
    expect(screen.getByText(profile.location)).toBeInTheDocument();
  });

  test('links every way of reaching him', () => {
    render(<IdentityBadge />);

    fireEvent.click(screen.getByRole('button', { name: profile.name }));

    expect(screen.getByRole('link', { name: profile.email })).toHaveAttribute(
      'href',
      `mailto:${profile.email}`,
    );
    expect(screen.getByRole('link', { name: profile.phone })).toHaveAttribute(
      'href',
      `tel:${profile.phone.replace(/\s/g, '')}`,
    );
  });

  test('shows the handle on a profile row, not the network name twice over', () => {
    render(<IdentityBadge />);

    fireEvent.click(screen.getByRole('button', { name: profile.name }));

    expect(screen.getByRole('link', { name: '3lwan' })).toHaveAttribute(
      'href',
      profile.links.github,
    );
    expect(screen.getByRole('link', { name: 'mohamed-elwan' })).toHaveAttribute(
      'href',
      profile.links.linkedin,
    );
    expect(screen.getByRole('link', { name: 'Mohamed_Elwan2' })).toHaveAttribute(
      'href',
      profile.links.xing,
    );
  });

  test('Escape closes the card and puts focus back on the name', () => {
    const { container } = render(<IdentityBadge />);
    const trigger = screen.getByRole('button', { name: profile.name });

    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(container.querySelector('.idcard')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  test('a click outside closes the card', () => {
    const { container } = render(<IdentityBadge />);

    fireEvent.click(screen.getByRole('button', { name: profile.name }));
    fireEvent.mouseDown(document.body);

    expect(container.querySelector('.idcard')).not.toBeInTheDocument();
  });

  test('a click inside the card leaves it open', () => {
    const { container } = render(<IdentityBadge />);

    fireEvent.click(screen.getByRole('button', { name: profile.name }));
    fireEvent.mouseDown(container.querySelector('.idcard'));

    expect(container.querySelector('.idcard')).toBeInTheDocument();
  });
});
