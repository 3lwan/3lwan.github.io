/**
 * Single source of truth for every piece of CV content.
 *
 * Content here is lifted verbatim from the pre-redesign App.jsx. The one
 * exception is Eurowings Digital, which was never in that file - the old CV
 * stopped at Flaschenpost (Sept 2024). It is marked `placeholder: true` so the
 * UI can flag it rather than quietly present invented text as fact.
 */

export const profile = {
  name: 'Mohamed Elwan',
  role: 'Software Engineer',
  location: 'Bergisch Gladbach, Germany',
  email: 'mohamed.elwan.7@gmail.com',
  phone: '+49 176 37110701',
  links: {
    github: 'https://github.com/3lwan',
    linkedin: 'https://www.linkedin.com/in/mohamed-elwan/',
    xing: 'https://www.xing.com/profile/Mohamed_Elwan2/cv',
  },
};

/** Employers, newest first - the order the visitor scrolls through. */
export const experiences = [
  {
    id: 'eurowings',
    company: 'Eurowings Digital',
    display: ['Eurowings', 'Digital'],
    title: 'Software Engineer',
    period: '2024 —',
    ticket: 'Gate 01 · Eurowings Digital · 2024 —',
    placeholder: true,
    details: ['Role details to be supplied — this scene is running on placeholder copy.'],
    stack: ['.NET / C#', 'Azure', 'Kubernetes', 'REST APIs'],
    palette: { primary: '#871C54', accent: '#AF1E65', secondary: '#00A6CE' },
  },
  {
    id: 'flaschenpost',
    company: 'Flaschenpost',
    display: ['Flaschen', 'post'],
    title: 'Full-Stack Developer',
    period: 'Jun 2022 – Sep 2024',
    ticket: 'Drop 02 · Flaschenpost · Jun 2022 – Sep 2024',
    details: [
      'Maintained and improved the B2B webshop',
      'Maintained and improved internal APIs and Azure Functions',
      'Worked directly with business customers on ERP system integration',
      "Designed and architected the team's projects",
    ],
    stack: ['.NET', 'Blazor', 'JavaScript', 'HTML / CSS', 'SQL', 'Azure', 'Kubernetes'],
    palette: { primary: '#A50A50', accent: '#82BE3C', secondary: '#5A9632' },
  },
  {
    id: 'invers',
    company: 'INVERS',
    display: ['IN', 'VERS'],
    title: 'Backend Developer',
    period: 'Jul 2020 – Jun 2022',
    ticket: 'Stop 03 · INVERS · Jul 2020 – Jun 2022',
    details: ['Maintaining existing microservices and creating new ones.'],
    stack: ['.NET / C#', 'Docker', 'Kubernetes / Helm', 'GitLab', 'MongoDB'],
    palette: { primary: '#00469C', accent: '#00C8AA', secondary: '#A4A4A4' },
  },
  {
    id: 'conze-lead',
    company: 'Conze Informatik',
    display: ['Conze', 'Informatik'],
    title: 'Team Leader',
    period: 'Mar 2019 – Jul 2020',
    ticket: 'Stop 04 · Conze Informatik · Mar 2019 – Jul 2020',
    details: [
      'Guiding and supporting team development',
      'Code reviewing',
      'Software architecture planning for complex tasks',
      'Regular meetings with customers',
      'Technical contact for customers',
      'Effort estimation for tasks',
    ],
    stack: ['.NET', 'C#', 'WPF', 'XAML'],
    palette: { primary: '#15779B', accent: '#333333', secondary: '#E6E6E6' },
  },
  {
    id: 'conze-dev',
    company: 'Conze Informatik',
    display: ['Conze', 'Informatik'],
    title: 'Software Developer',
    period: 'Nov 2017 – Mar 2019',
    details: [
      '.NET software developer using C++, C# and XAML for desktop applications with WPF.',
    ],
    stack: ['.NET', 'C++', 'C#', 'WPF', 'XAML'],
    palette: { primary: '#15779B', accent: '#333333', secondary: '#E6E6E6' },
  },
];

export const education = [
  {
    degree: 'M.Sc. in Mechatronics Engineering',
    school: 'Universität Siegen',
    period: '2014 – 2017',
    details: ['Final grade: 1.1'],
  },
  {
    degree: 'B.Sc. in Engineering and Material Science',
    school: 'German University in Cairo',
    period: '2007 – 2012',
    details: ['Final grade: Excellent'],
  },
];

export const languages = [
  { language: 'Arabic', level: 'Native' },
  { language: 'English', level: 'C1' },
  { language: 'German', level: 'B2' },
];

/** level is 1-5; drives the hover fill on SkillChip. */
export const skills = [
  { name: '.NET C#', level: 5 },
  { name: 'xUnit', level: 5 },
  { name: 'Rest APIs', level: 5 },
  { name: 'Git', level: 5 },
  { name: 'Microservices', level: 4 },
  { name: 'Blazor', level: 4 },
  { name: 'Docker', level: 4 },
  { name: 'Azure', level: 3 },
  { name: 'SQL', level: 3 },
  { name: 'Javascript', level: 3 },
  { name: 'Python', level: 2 },
  { name: 'Angular', level: 2 },
  { name: 'Kubernetes', level: 1 },
];

/** The full seven-scene story. Scenes 3-7 are not built yet (Phases 3-4). */
export const sceneRail = [
  { label: 'Eurowings Digital', built: true },
  { label: 'Flaschenpost', built: true },
  { label: 'INVERS', built: false },
  { label: 'Conze Informatik', built: false },
  { label: 'Education', built: false },
  { label: 'Languages', built: false },
  { label: 'Contact', built: false },
];
