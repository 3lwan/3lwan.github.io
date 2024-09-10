import React from 'react';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

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
          <a href="https://github.com/3lwan" className="text-gray-600 hover:text-gray-900">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/mohamed-elwan/" className="text-gray-600 hover:text-gray-900">
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </header>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Professional Experience</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-xl font-medium">Flaschenpost | FullStack Developer</h4>
            <p className="text-gray-600">Jun, 2022 – Present</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Maintain/improve the B2B Webshop</li>
              <li>Maintain/improve internal APIs</li>
              <li>Maintain/improve Azure functions</li>
              <li>Contact with different business customers for ERP system integration</li>
              <li>Design/Architect team's different projects</li>
            </ul>
            <p className="mt-2"><strong>Main Stack:</strong> .NET, Blazor, HTML, CSS, Javascript, SQL, Azure, Kubernetes</p>
          </div>
          <div>
            <h4 className="text-xl font-medium">INVERS | Backend Developer</h4>
            <p className="text-gray-600">Jul, 2020 – Jun, 2022</p>
            <p>Maintaining existing microservices and creating new ones using .Net Framework (C#), Docker, Kubernetes/Helm, Gitlab and MongoDB.</p>
          </div>
          <div>
            <h4 className="text-xl font-medium">Conze Informatik | Software Architect / Team Leader</h4>
            <p className="text-gray-600">Mar, 2019 – Jul, 2020</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Guiding and supporting team development</li>
              <li>Code reviewing</li>
              <li>Software architecture planning for complex tasks</li>
              <li>Regular meetings with customers</li>
              <li>Technical contact for customers</li>
              <li>Effort estimation for tasks</li>
            </ul>
          </div>
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