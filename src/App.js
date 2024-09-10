import React from 'react';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXing } from '@fortawesome/free-brands-svg-icons';

const App = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 min-h-screen">
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

      <section className="mb-8">
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
              details: ["Maintaining existing microservices and creating new ones using .Net Framework (C#), Docker, Kubernetes/Helm, Gitlab and MongoDB."],
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
          ].map((job, index) => (
            <div key={index} className="mb-8 relative">
              <div className="absolute -left-10 mt-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white"></div>
              <h4 className="text-xl font-medium">{job.title}</h4>
              <p className="text-gray-600">{job.date}</p>
              <ul className="list-disc pl-5 mt-2">
                {job.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
              {job.stack && <p className="mt-2"><strong>Main Stack:</strong> {job.stack}</p>}
            </div>
          ))}
        </div>
      </section>

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

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Education</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-xl font-medium">M.Sc. in Mechatronics Engineering</h4>
            <p className="text-gray-600">Universität Siegen, 2014 – 2017</p>
            <p>Final grade: 1.1</p>
          </div>
          <div>
            <h4 className="text-xl font-medium">B.Sc. in Engineering and Material Science</h4>
            <p className="text-gray-600">German University in Cairo, 2007 – 2012</p>
            <p>Final grade: Excellent</p>
          </div>
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