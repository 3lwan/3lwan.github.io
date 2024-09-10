import React from 'react';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXing } from '@fortawesome/free-brands-svg-icons';

const TimelineItem = ({ title, subtitle, date, details, stack }) => (
  <div className="mb-8 relative">
    <div className="absolute -left-10 mt-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white animate-pulse"></div>
    <h4 className="text-xl font-medium">{title}</h4>
    {subtitle && <p className="text-gray-600">{subtitle}</p>}
    <p className="text-gray-600">{date}</p>
    {details && (
      <ul className="list-disc pl-5 mt-2">
        {details.map((detail, i) => (
          <li key={i}>{detail}</li>
        ))}
      </ul>
    )}
    {stack && <p className="mt-2"><strong>Main Stack:</strong> {stack}</p>}
  </div>
);

const Skill = ({ name, level }) => {
  const getColor = (level) => {
    switch (level) {
      case 5: return 'rgb(0, 128, 0)'; // dark green
      case 4: return 'rgb(0, 128, 0)'; // dark green
      case 3: return 'rgb(204, 204, 0)'; // dark yellow
      case 2: return 'rgb(255, 140, 0)'; // dark orange
      case 1: return 'rgb(204, 0, 0)'; // dark red
      default: return 'rgb(0, 0, 255)'; // dark blue
    }
  };

  const getFillPercentage = (level) => {
    return `${(level / 5) * 100}%`;
  };

  const getTextColor = (level) => {
    return level > 3 ? 'white' : 'black';
  };

  return (
    <span
      className="px-3 py-1 rounded-full text-sm relative overflow-hidden group bg-blue-100 text-blue-800 shadow-sm hover:shadow-md transition-shadow duration-300"
      style={{
        '--skill-color': getColor(level),
        '--skill-fill': getFillPercentage(level),
        '--skill-text-color': getTextColor(level),
      }}
    >
      <span
        className="relative z-10 transition-colors duration-300 group-hover:text-[var(--skill-text-color)]"
      >
        {name}
      </span>
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to right, var(--skill-color) var(--skill-fill), transparent var(--skill-fill))`,
        }}
      ></span>
    </span>
  );
};

const LanguageItem = ({ language, level }) => (
  <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg mb-2 hover:bg-gray-200 transition-colors duration-300">
    <span className="font-medium">{language}</span>
    <span className="text-sm px-2 py-1 bg-blue-500 text-white rounded-full">{level}</span>
  </div>
);

const App = () => {
  const skills = [
    { name: '.NET C#', level: 5 },
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

  const ContactItem = ({ icon, children }) => (
    <div className="flex items-center hover:bg-indigo-700 p-2 rounded transition-colors duration-300">
      {icon}
      {children}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-b from-gray-100 to-white min-h-screen">
      <header className="mb-8 text-center p-8 bg-gradient-to-r from-indigo-800 via-indigo-600 to-teal-500 text-white rounded-b-lg shadow-md">
        <h1 className="text-4xl font-bold mb-2">Mohamed Elwan</h1>
        <h2 className="text-2xl text-gray-200 mb-4">C# Software Developer</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <ContactItem icon={<Mail className="w-4 h-4 mr-2" />}>
            <a href="mailto:mohamed.elwan.7@gmail.com" className="text-gray-200 hover:text-white hover:underline">
              mohamed.elwan.7@gmail.com
            </a>
          </ContactItem>
          <ContactItem icon={<MapPin className="w-4 h-4 mr-2" />}>
            <span>Bergisch Gladbach, Germany</span>
          </ContactItem>
          <ContactItem icon={<Phone className="w-4 h-4 mr-2" />}>
            <span>+49 176 37110701</span>
          </ContactItem>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://github.com/3lwan" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/mohamed-elwan/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="https://www.xing.com/profile/Mohamed_Elwan2/cv" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <FontAwesomeIcon icon={faXing} className="w-6 h-6" />
          </a>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        <section className="mb-8 md:w-1/2">
          <h3 className="text-2xl font-semibold mb-4">Professional Experience</h3>
          <div className="relative border-l-2 border-gray-300 pl-8 ml-4">
            {[
              {
                title: "Flaschenpost | FullStack Developer",
                date: "Jun, 2022 – Present",
                details: [
                  "Maintain/improve the B2B Webshop",
                  "Maintain/improve internal APIs",
                  "Maintain/improve Azure functions",
                  "Contact with different business customers for ERP system integration",
                  "Design/Architect team's different projects",
                ],
                stack: ".NET, Blazor, HTML, CSS, Javascript, SQL, Azure, Kubernetes",
              },
              {
                title: "INVERS | Backend Developer",
                date: "Jul, 2020 – Jun, 2022",
                details: ["Maintaining existing microservices and creating new ones."],
                stack: ".Net(C#), Docker, Kubernetes/Helm, Gitlab and MongoDB.",
              },
              {
                title: "Conze Informatik | Software Architect / Team Leader",
                date: "Mar, 2019 – Jul, 2020",
                details: [
                  "Guiding and supporting team development",
                  "Code reviewing",
                  "Software architecture planning for complex tasks",
                  "Regular meetings with customers",
                  "Technical contact for customers",
                  "Effort estimation for tasks",
                ],
              },
              {
                title: "Conze Informatik | Software Developer",
                date: "Nov, 2017 – Mar, 2019",
                details: [".Net Software Developer using C++, C# and XAML for desktop applications using WPF."],
              }
            ].map((job, index) => (
              <TimelineItem key={index} {...job} />
            ))}
          </div>
        </section>

        <div className="md:w-1/4">
          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Education</h3>
            <div className="relative border-l-2 border-gray-300 pl-8 ml-4">
              <TimelineItem
                title="M.Sc. in Mechatronics Engineering"
                subtitle="Universität Siegen"
                date="2014 – 2017"
                details={["Final grade: 1.1"]}
              />
              <TimelineItem
                title="B.Sc. in Engineering and Material Science"
                subtitle="German University in Cairo"
                date="2007 – 2012"
                details={["Final grade: Excellent"]}
              />
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Languages</h3>
            <div>
              <LanguageItem language="Arabic" level="Native" />
              <LanguageItem language="English" level="C1" />
              <LanguageItem language="German" level="B2" />
            </div>
          </section>
        </div>

        <section className="mb-8 md:w-1/4">
          <h3 className="text-2xl font-semibold mb-4">Skills</h3>
          <div className="flex flex-col gap-2">
            {skills.map((skill) => (
              <Skill key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;