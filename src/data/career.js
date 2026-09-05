/**
 * Single source of truth for every piece of CV content.
 *
 * Content is lifted from the pre-redesign App.jsx, plus Eurowings Digital,
 * which that file never had - the old CV stopped at Flaschenpost (Sept 2024).
 *
 * `stack` entries are always objects. `level` (1-5) is optional and drives the
 * hover fill on SkillChip; it is only set where a level is actually known,
 * rather than inventing one to make the chips look uniform.
 */

export const profile = {
  name: 'Mohamed Elwan',
  role: 'Senior Software Developer',
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
    title: 'Senior Software Developer',
    period: 'Oct 2024 —',
    ticket: 'Gate 01 · Eurowings Digital · Oct 2024 —',
    details: [
      'Design and build the backend APIs behind the Eurowings mobile app',
      'Shape features with the team, so what ships genuinely helps travellers',
      'Track API health on dashboards to catch and resolve problems quickly',
    ],
    stack: [
      { name: 'C# / .NET' },
      { name: 'Java Spring Boot', level: 3 },
      { name: 'Azure' },
      { name: 'GitHub' },
      { name: 'Terraform', level: 2 },
      { name: 'AI', level: 4 },
      { name: 'REST' },
      { name: 'gRPC', level: 3 },
    ],
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
    stack: ['.NET', 'Blazor', 'JavaScript', 'HTML / CSS', 'SQL', 'Azure', 'Kubernetes'].map((name) => ({ name })),
    palette: { primary: '#A50A50', accent: '#82BE3C', secondary: '#5A9632' },
  },
  {
    id: 'invers',
    company: 'INVERS',
    display: ['INVERS'],
    title: 'Backend Developer',
    period: 'Jul 2020 – Jun 2022',
    ticket: 'Stop 03 · INVERS · Jul 2020 – Jun 2022',
    details: ['Maintaining existing microservices and creating new ones.'],
    stack: ['.NET / C#', 'Docker', 'Kubernetes / Helm', 'GitLab', 'MongoDB'].map((name) => ({ name })),
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
    stack: ['.NET', 'C#', 'WPF', 'XAML'].map((name) => ({ name })),
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
    stack: ['.NET', 'C++', 'C#', 'WPF', 'XAML'].map((name) => ({ name })),
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
  { name: 'AI', level: 4 },
  { name: 'Microservices', level: 4 },
  { name: 'Blazor', level: 4 },
  { name: 'Docker', level: 4 },
  { name: 'Azure', level: 3 },
  { name: 'SQL', level: 3 },
  { name: 'Javascript', level: 3 },
  { name: 'Java Spring Boot', level: 3 },
  { name: 'gRPC', level: 3 },
  { name: 'Python', level: 2 },
  { name: 'Angular', level: 2 },
  { name: 'Terraform', level: 2 },
  { name: 'Kubernetes', level: 1 },
];

/** The full seven-scene story. Scenes 5-7 are not built yet (Phase 4). */
export const sceneRail = [
  { label: 'Eurowings Digital', built: true },
  { label: 'Flaschenpost', built: true },
  { label: 'INVERS', built: true },
  { label: 'Conze Informatik', built: true },
  { label: 'Education', built: false },
  { label: 'Languages', built: false },
  { label: 'Contact', built: false },
];
