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
  country: 'Germany',
  email: 'mohamed.elwan.7@gmail.com',
  phone: '+49 176 37110701',
  links: {
    github: 'https://github.com/3lwan',
    linkedin: 'https://www.linkedin.com/in/mohamed-elwan/',
    xing: 'https://www.xing.com/profile/Mohamed_Elwan2/cv',
  },
};

/** tel: wants no spaces; the visible text keeps them. */
export const phoneHref = `tel:${profile.phone.replace(/\s/g, '')}`;

/**
 * Every technology named anywhere on the CV, with its display name and its
 * proficiency (1-5, which the badge shows as stars).
 *
 * Jobs and the skills section both resolve their chips through pick(), so a
 * technology cannot end up spelled or rated two different ways: ".NET" is one
 * entry, not the four spellings ("C# / .NET", ".NET / C#", "C#", ".NET C#")
 * this file used to carry.
 */
const SKILLS = {
  '.NET': { name: '.NET', level: 5 },
  xUnit: { name: 'xUnit', level: 5 },
  REST: { name: 'REST APIs', level: 5 },
  Git: { name: 'Git', level: 5 },
  GitHub: { name: 'GitHub', level: 4 },
  GitLab: { name: 'GitLab', level: 4 },
  AI: { name: 'AI', level: 4 },
  MSA: { name: 'Microservices', level: 4 },
  Blazor: { name: 'Blazor', level: 4 },
  Docker: { name: 'Docker', level: 4 },
  HTML: { name: 'HTML', level: 4 },
  CSS: { name: 'CSS', level: 4 },
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
  TF: { name: 'Terraform', level: 2 },
  'C++': { name: 'C++', level: 2 },
  K8s: { name: 'Kubernetes', level: 1 },
  Helm: { name: 'Helm', level: 1 },
};

/**
 * Resolve registry keys into the badge props.
 *
 * The key doubles as the badge's face text, which is why it is spelled the way
 * it should be read - the full `name` only appears in the badge tooltip and to
 * assistive tech. It is passed as `label`, not `key`: React consumes a `key`
 * prop when the object is spread into <SkillBadge/>.
 */
const pick = (...keys) =>
  keys
    .map((key) => {
      const skill = SKILLS[key];
      if (!skill) throw new Error(`Unknown skill: ${key}`);
      return { label: key, ...skill };
    })
    .sort(byRating);

/** Strongest first, ties broken by the label the badge actually shows. */
function byRating(a, b) {
  return b.level - a.level || a.label.localeCompare(b.label);
}

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
    stack: pick('.NET', 'Spring', 'Azure', 'GitHub', 'TF', 'AI', 'REST', 'gRPC'),
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
    stack: pick('.NET', 'Blazor', 'JS', 'HTML', 'CSS', 'SQL', 'Azure', 'K8s'),
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
    stack: pick('.NET', 'Docker', 'K8s', 'Helm', 'GitLab', 'MongoDB'),
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
    stack: pick('.NET', 'WPF', 'XAML'),
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
    stack: pick('.NET', 'C++', 'WPF', 'XAML'),
    palette: { primary: '#15779B', accent: '#333333', secondary: '#E6E6E6' },
  },
];

/**
 * Where he works today. The identity card reads its name and colours from here
 * rather than repeating them, so the card and the Eurowings scene can never
 * drift apart: both resolve to the same entry in `experiences`.
 */
export const currentEmployer = experiences[0];

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
  '.NET',
  'xUnit',
  'REST',
  'Git',
  'AI',
  'MSA',
  'Blazor',
  'Docker',
  'Azure',
  'SQL',
  'JS',
  'Spring',
  'gRPC',
  'Python',
  'Angular',
  'TF',
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
    // long stack, so the badges sit beside the copy rather than under it
    layout: 'aside',
    roles: [job('eurowings')],
    stack: job('eurowings').stack,
  },
  {
    id: 'flaschenpost',
    display: ['Flaschen', 'post'],
    ticket: 'Drop 02 · Flaschenpost · Jun 2022 – Sep 2024',
    // long stack, so the badges sit beside the copy rather than under it
    layout: 'aside',
    roles: [job('flaschenpost')],
    stack: job('flaschenpost').stack,
  },
  {
    id: 'invers',
    display: ['INVERS'],
    ticket: 'Stop 03 · INVERS · Jul 2020 – Jun 2022',
    layout: 'lifted',
    roles: [job('invers')],
    stack: job('invers').stack,
  },
  {
    id: 'conze',
    display: ['Conze', 'Informatik'],
    ticket: 'Stop 04 · Conze Informatik · Nov 2017 – Jul 2020',
    // two roles plus a stack, the tallest block in the story
    layout: 'aside',
    roles: [job('conze-lead'), job('conze-dev')],
    // both roles' technologies, de-duplicated, then ordered like every other stack
    // pick() builds a fresh object per call, so de-duplicate on the label
    stack: [...job('conze-lead').stack, ...job('conze-dev').stack]
      .filter((tech, index, all) => all.findIndex((other) => other.label === tech.label) === index)
      .sort(byRating),
  },
  {
    id: 'education',
    display: ['Education'],
    ticket: 'Stop 05 · Siegen & Cairo · 2007 – 2017',
    layout: 'lifted',
    roles: education.map((item) => ({
      id: item.degree,
      title: item.degree,
      period: `${item.school} · ${item.period}`,
      details: item.details,
    })),
    // no badges: a star rating would mean nothing for a field of study
    stack: [],
  },
  {
    id: 'languages',
    display: ['Languages'],
    ticket: 'Stop 06 · Arabic · English · German',
    layout: 'lifted',
    roles: [
      {
        id: 'languages',
        title: 'Three languages, daily',
        details: languages.map((entry) => `${entry.language} — ${entry.level}`),
      },
    ],
    // no badges: the languages already state Native/C1/B2 in the copy above
    stack: [],
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
          { text: profile.phone, href: phoneHref },
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
