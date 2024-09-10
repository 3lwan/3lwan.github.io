import React from 'react';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXing } from '@fortawesome/free-brands-svg-icons';

const TimelineItem = ({ title, subtitle, date, details, stack }) => (
  <div className="mb-8 relative">
    <div className="absolute -left-10 mt-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white"></div>
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

const App = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-100 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Mohamed Elwan</h1>
        <h2 className="text-2xl text-gray-600 mb-4">C# Software Developer</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            <a href="mailto:mohamed.elwan.7@gmail.com" className="text-blue-600 hover:underline">
              mohamed.elwan.7@gmail.com
            </a>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>Bergisch Gladbach, Germany</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            <span>+49 176 37110701</span>
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://github.com/3lwan" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/mohamed-elwan/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="https://www.xing.com/profile/Mohamed_Elwan2/cv" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
            <FontAwesomeIcon icon={faXing} className="w-6 h-6" />
          </a>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        <section className="mb-8 md:w-2/3">
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

        <section className="mb-8 md:w-1/3">
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
      </div>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {['.NET C#', 'Rest APIs', 'Microservices', 'Git/Gitlab', 'Blazor', 'SQL', 'Javascript', 'Python', 'Docker/Kubernetes/Helm', 'Angular', 'Azure'].map((skill) => (
            <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-4">Languages</h3>
        <ul className="list-disc pl-5">
          <li>Arabic - Native</li>
          <li>English - C1</li>
          <li>German - B2</li>
        </ul>
      </section>
    </div>
  );
};

export default App;