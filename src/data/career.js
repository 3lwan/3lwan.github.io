/**
 * Single source of truth for every piece of CV content.
 *
 * Content is lifted from the pre-redesign App.jsx, plus Eurowings Digital,
 * which that file never had - the old CV stopped at Flaschenpost (Sept 2024).
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

/**
 * Every technology named anywhere on the CV, with its display name and its
 * proficiency (1-5, which drives the hover fill on SkillChip).
 *
 * Jobs and the skills section both resolve their chips through pick(), so a
 * technology cannot end up spelled or rated two different ways: ".NET" is one
 * entry, not the four spellings ("C# / .NET", ".NET / C#", "C#", ".NET C#")
 * this file used to carry.
 */
const SKILLS = {
  DotNet: { name: '.NET', level: 5 },
  xUnit: { name: 'xUnit', level: 5 },
  REST: { name: 'REST APIs', level: 5 },
  Git: { name: 'Git', level: 5 },
  GitHub: { name: 'GitHub', level: 4 },
  GitLab: { name: 'GitLab', level: 4 },
  AI: { name: 'AI', level: 4 },
  Microservices: { name: 'Microservices', level: 4 },
  Blazor: { name: 'Blazor', level: 4 },
  Docker: { name: 'Docker', level: 4 },
  'HTML/CSS': { name: 'HTML / CSS', level: 4 },
  WPF: { name: 'WPF', level: 4 },
  XAML: { name: 'XAML', level: 4 },
  Azure: { name: 'Azure', level: 3 },
  SQL: { name: 'SQL', level: 3 },
  JS: { name: 'JavaScript', level: 3 },
  Spring: { name: 'Java Spring Boot', level: 3 },
  gRPC: { name: 'gRPC', level: 3 },
  MongoDB: { name: 'MongoDB', level: 3 },
  Python: { name: 'Python', level: 2 },
  Angular: { name: 'Angular', level: 2 },
  Terraform: { name: 'Terraform', level: 2 },
  'C++': { name: 'C++', level: 2 },
  K8s: { name: 'Kubernetes', level: 1 },
  Helm: { name: 'Helm', level: 1 },
};

/** Resolve registry keys into the { name, level } objects the chips render. */
const pick = (...keys) =>
  keys.map((key) => {
    const skill = SKILLS[key];
    if (!skill) throw new Error(`Unknown skill: ${key}`);
    return skill;
  });

/**
 * Chips that are not technologies - fields of study, spoken languages - carry
 * no level: a proficiency fill would mean nothing there, and the languages
 * already state Native/C1/B2 in their own section.
 */
const plainChips = (...names) => names.map((name) => ({ name }));

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
    stack: pick('DotNet', 'Spring', 'Azure', 'GitHub', 'Terraform', 'AI', 'REST', 'gRPC'),
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
    stack: pick('DotNet', 'Blazor', 'JS', 'HTML/CSS', 'SQL', 'Azure', 'K8s'),
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
    stack: pick('DotNet', 'Docker', 'K8s', 'Helm', 'GitLab', 'MongoDB'),
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
    stack: pick('DotNet', 'WPF', 'XAML'),
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
    stack: pick('DotNet', 'C++', 'WPF', 'XAML'),
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

/**
 * The skills section of the CV.
 *
 * Deliberately a subset of SKILLS: the registry also holds things that belong
 * to one employer's story rather than to a general claim of proficiency
 * (GitHub vs GitLab, Helm, WPF/XAML, C++, MongoDB).
 */
export const skills = pick(
  'DotNet',
  'xUnit',
  'REST',
  'Git',
  'AI',
  'Microservices',
  'Blazor',
  'Docker',
  'Azure',
  'SQL',
  'JS',
  'Spring',
  'gRPC',
  'Python',
  'Angular',
  'Terraform',
  'K8s'
);

/**
 * The scenes of the scroll story, in scroll order.
 *
 * A scene is not the same thing as a job: Conze Informatik covers two roles at
 * one employer, and the scene shows both rather than dropping the earlier one.
 */
const job = (id) => experiences.find((entry) => entry.id === id);

export const storyScenes = [
  {
    id: 'eurowings',
    display: ['Eurowings', 'Digital'],
    ticket: 'Gate 01 · Eurowings Digital · Oct 2024 —',
    roles: [job('eurowings')],
    stack: job('eurowings').stack,
  },
  {
    id: 'flaschenpost',
    display: ['Flaschen', 'post'],
    ticket: 'Drop 02 · Flaschenpost · Jun 2022 – Sep 2024',
    roles: [job('flaschenpost')],
    stack: job('flaschenpost').stack,
  },
  {
    id: 'invers',
    display: ['INVERS'],
    ticket: 'Stop 03 · INVERS · Jul 2020 – Jun 2022',
    roles: [job('invers')],
    stack: job('invers').stack,
  },
  {
    id: 'conze',
    display: ['Conze', 'Informatik'],
    ticket: 'Stop 04 · Conze Informatik · Nov 2017 – Jul 2020',
    roles: [job('conze-lead'), job('conze-dev')],
    // both roles' technologies, de-duplicated, newest role first
    stack: [...job('conze-lead').stack, ...job('conze-dev').stack].filter(
      (tech, index, all) => all.indexOf(tech) === index
    ),
  },
  {
    id: 'education',
    display: ['Education'],
    ticket: 'Stop 05 · Siegen & Cairo · 2007 – 2017',
    roles: education.map((item) => ({
      id: item.degree,
      title: item.degree,
      period: `${item.school} · ${item.period}`,
      details: item.details,
    })),
    stack: plainChips('Mechatronics', 'Engineering', 'Material Science'),
  },
  {
    id: 'languages',
    display: ['Languages'],
    ticket: 'Stop 06 · Arabic · English · German',
    roles: [
      {
        id: 'languages',
        title: 'Three languages, daily',
        details: languages.map((entry) => `${entry.language} — ${entry.level}`),
      },
    ],
    stack: plainChips(...languages.map((entry) => entry.language)),
  },
  {
    id: 'contact',
    display: ['Get in', 'touch'],
    ticket: 'Stop 07 · End of the line',
    roles: [
      {
        id: 'contact',
        title: 'Say hello',
        details: [
          { text: profile.email, href: `mailto:${profile.email}` },
          { text: profile.location },
        ],
      },
    ],
    stack: [],
    links: [
      { label: 'GitHub', href: profile.links.github },
      { label: 'LinkedIn', href: profile.links.linkedin },
      { label: 'Xing', href: profile.links.xing },
    ],
  },
];

/** The full seven-scene story. */
export const sceneRail = [
  { label: 'Eurowings Digital', built: true },
  { label: 'Flaschenpost', built: true },
  { label: 'INVERS', built: true },
  { label: 'Conze Informatik', built: true },
  { label: 'Education', built: true },
  { label: 'Languages', built: true },
  { label: 'Contact', built: true },
];
