'use client';
import { useResume } from '@/components/Editor';
import { Mail, Phone, Linkedin, Globe, MapPin, Award, Activity, BarChart2 } from 'lucide-react';

export function ExecutiveTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills, leadership, achievements } = resumeData;

  return (
    <div className="p-10 bg-white text-gray-800 font-serif text-[11px] leading-relaxed">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-wider">{personalInfo.name.toUpperCase()}</h1>
        <p className="text-xl text-primary tracking-widest mt-1">{personalInfo.title}</p>
        <div className="flex justify-center items-center gap-x-6 gap-y-1 text-xs text-gray-500 mt-4 flex-wrap">
          <span className="flex items-center gap-1.5"><Phone size={12} /> {personalInfo.phone}</span>
          <span className="flex items-center gap-1.5"><Mail size={12} /> {personalInfo.email}</span>
          <span className="flex items-center gap-1.5"><Linkedin size={12} /> {personalInfo.linkedin}</span>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-700 border-b-2 border-gray-300 pb-1 mb-2 tracking-widest">EXECUTIVE SUMMARY</h2>
        <p className="text-gray-600">{summary}</p>
      </section>
      
      {achievements?.length > 0 && <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-700 border-b-2 border-gray-300 pb-1 mb-2 tracking-widest flex items-center gap-2"><BarChart2 size={16} /> KEY ACHIEVEMENTS</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {achievements.map(ach => (
            <li key={ach.id}>{ach.details}</li>
          ))}
        </ul>
      </section>}

      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-700 border-b-2 border-gray-300 pb-1 mb-2 tracking-widest">PROFESSIONAL EXPERIENCE</h2>
        {experience.map(exp => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-md font-bold">{exp.company} - <span className="font-normal italic">{exp.location}</span></h3>
              <p className="font-medium text-gray-500">{exp.startDate} - {exp.endDate}</p>
            </div>
            <h4 className="text-md font-semibold text-primary mb-1">{exp.title}</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('-', '').trim()}</li>)}
            </ul>
          </div>
        ))}
      </section>
      
      {leadership?.length > 0 && <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-700 border-b-2 border-gray-300 pb-1 mb-2 tracking-widest flex items-center gap-2"><Activity size={16} /> LEADERSHIP & AFFILIATIONS</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          {leadership.map(lead => (
            <li key={lead.id}>{lead.details}</li>
          ))}
        </ul>
      </section>}

      <section className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-bold text-gray-700 border-b-2 border-gray-300 pb-1 mb-2 tracking-widest">EDUCATION</h2>
          {education.map(edu => (
            <div key={edu.id} className="mb-2">
              <h3 className="font-bold">{edu.degree}</h3>
              <p className="text-gray-600">{edu.school}, {edu.endDate}</p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-700 border-b-2 border-gray-300 pb-1 mb-2 tracking-widest">CORE COMPETENCIES</h2>
          <ul className="list-disc list-inside columns-2 text-gray-600">
            {skills.map(skill => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
