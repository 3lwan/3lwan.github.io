import React, { useState, useRef, useEffect } from 'react';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXing } from '@fortawesome/free-brands-svg-icons';
import './App.css';

const TimelineItem = ({ title, subtitle, company, date, details, stack, type }) => (
  <div className={`timeline-item ${type}`}>
    <span className="timeline-date">{date}</span>
    <div className="timeline-content">
      {company && <h4 className="text-xl font-bold mb-2">{company}</h4>}
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      {subtitle && <p className="text-lg font-medium mb-2">{subtitle}</p>}
      {details && (
        <ul className="list-disc pl-5 mt-2">
          {details.map((detail, i) => (
            <li key={i}>{detail}</li>
          ))}
        </ul>
      )}
      {stack && <p className="mt-2"><strong>Main Stack:</strong> {stack}</p>}
    </div>
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

const ExperienceCard = ({ company, title, date, details, stack }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardHeight, setCardHeight] = useState('auto');
  const frontRef = useRef(null);

  useEffect(() => {
    if (frontRef.current) {
      setCardHeight(frontRef.current.offsetHeight);
    }
  }, []);

  return (
    <div
      className="mb-6 relative perspective"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ height: cardHeight }}
    >
      <div className={`flex-shrink-0 flex-grow-0 h-full relative w-full transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        <div className="w-full h-full backface-hidden" ref={frontRef}>
          {!isFlipped ? (
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <div className="flex items-center mb-4">
                <div>
                  <h4 className="text-xl font-semibold">{company}</h4>
                  <p className="text-gray-600">{title}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-2">{date}</p>
              <ul className="list-disc pl-5 mb-2">
                {details.map((detail, index) => (
                  <li key={index} className="text-gray-700">{detail}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-blue-100 rounded-lg shadow-md p-6 h-full flex flex-col justify-center items-center">
              <h4 className="text-xl font-semibold mb-4">Main Stack</h4>
              <p className="text-center">{stack}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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

  const experiences = [
    {
      company: "Flaschenpost", // Company name
      title: "FullStack Developer", // Job title
      date: "Jun, 2022 – Sept, 2024",
      details: [
        "Maintain/improve the B2B Webshop",
        "Maintain/improve internal APIs",
        "Maintain/improve Azure functions",
        "Contact with different business customers for ERP system integration",
        "Design/Architect team's different projects",
      ],
      stack: ".NET, Blazor, HTML, CSS, Javascript, SQL, Azure, Kubernetes",
      type: "experience",
    },
    {
      company: "INVERS",
      title: "Backend Developer",
      date: "Jul, 2020 – Jun, 2022",
      details: ["Maintaining existing microservices and creating new ones."],
      stack: ".Net(C#), Docker, Kubernetes/Helm, Gitlab and MongoDB.",
      type: "experience",
    },
    {
      company: "Conze Informatik",
      title: "Software Architect / Team Leader",
      date: "Mar, 2019 – Jul, 2020",
      details: [
        "Guiding and supporting team development",
        "Code reviewing",
        "Software architecture planning for complex tasks",
        "Regular meetings with customers",
        "Technical contact for customers",
        "Effort estimation for tasks",
      ],
      stack: ".NET, C#, WPF, XAML",
      type: "experience",
    },
    {
      company: "Conze Informatik",
      title: "Software Developer",
      date: "Nov, 2017 – Mar, 2019",
      details: [".Net Software Developer using C++, C# and XAML for desktop applications using WPF."],
      stack: ".NET, C++, C#, WPF, XAML",
      type: "experience",
    },
  ];

  const education = [
    {
      title: "M.Sc. in Mechatronics Engineering", // Degree
      subtitle: "Universität Siegen", // University name
      date: "2014 – 2017",
      details: ["Final grade: 1.1"],
      type: "education",
    },
    {
      title: "B.Sc. in Engineering and Material Science",
      subtitle: "German University in Cairo",
      date: "2007 – 2012",
      details: ["Final grade: Excellent"],
      type: "education",
    },
  ];

  const timelineItems = [...experiences, ...education].sort((a, b) => {
    const dateA = new Date(a.date.split(' – ')[1] || a.date.split(' – ')[0]);
    const dateB = new Date(b.date.split(' – ')[1] || b.date.split(' – ')[0]);
    return dateB - dateA;
  });

  return (
    <div className="App">
      <header className="header text-center p-6 bg-gradient-to-r from-indigo-800 via-indigo-600 to-teal-500 text-white rounded-lg shadow-md">
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

      <main className="main-content">
        <h3 className="text-2xl font-semibold mb-4">Experience & Education</h3>
        <div className="timeline-container">
          {timelineItems.map((item, index) => {
            console.log('Rendering timeline item:', item);
            return <TimelineItem key={index} {...item} />;
          })}
        </div>

        <div className="flex flex-col md:flex-row gap-8 px-8 mt-8">
          <div className="md:w-1/3">
            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Languages</h3>
              <div>
                <LanguageItem language="Arabic" level="Native" />
                <LanguageItem language="English" level="C1" />
                <LanguageItem language="German" level="B2" />
              </div>
            </section>
          </div>

          <section className="mb-8 md:w-2/3">
            <h3 className="text-2xl font-semibold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Skill key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;