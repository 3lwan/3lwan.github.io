import { render } from '@testing-library/react';
import { SkillBadge } from './SkillBadge';

describe('SkillBadge', () => {
  test('shows the short label on the badge face, not the full name', () => {
    const { container } = render(<SkillBadge label="JS" name="JavaScript" level={3} />);

    expect(container.querySelector('.badge__label')).toHaveTextContent('JS');
  });

  test('carries the full name in a tooltip', () => {
    const { container } = render(<SkillBadge label="JS" name="JavaScript" level={3} />);

    expect(container.querySelector('.badge__tip')).toHaveTextContent('JavaScript');
  });

  test('renders five stars, filling one per level', () => {
    const { container } = render(<SkillBadge label="JS" name="JavaScript" level={3} />);

    expect(container.querySelectorAll('.badge__star')).toHaveLength(5);
    expect(container.querySelectorAll('.badge__star--on')).toHaveLength(3);
  });

  test('states the name and the level for assistive tech', () => {
    const { container } = render(<SkillBadge label="K8s" name="Kubernetes" level={1} />);

    expect(container.querySelector('.badge__sr')).toHaveTextContent('Kubernetes — 1 out of 5');
  });
});
