'use client';

import { useResume } from '@/components/Editor';
import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';

export function ProfessionalTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills } = resumeData;

  return (
    <div className="p-8 bg-white text-gray-800 font-sans text-[10px] leading-snug">
      <header className="text-center mb-6 border-b-2 border-gray-300 pb-4">
        <h1 className="text-3xl font-bold font-serif text-gray-800 tracking-wider">{personalInfo.name}</h1>
        <h2 className="text-lg font-semibold text-primary tracking-widest">{personalInfo.title}</h2>
      </header>
      
      <div className="flex justify-center items-center gap-x-4 gap-y-1 text-[9px] text-gray-600 mb-6 flex-wrap">
          <span className="flex items-center gap-1"><MapPin size={10} /> {personalInfo.location}</span>
          <span className="flex items-center gap-1"><Phone size={10} /> {personalInfo.phone}</span>
          <span className="flex items-center gap-1"><Mail size={10} /> {personalInfo.email}</span>
          <span className="flex items-center gap-1"><Linkedin size={10} /> {personalInfo.linkedin}</span>
          <span className="flex items-center gap-1"><Globe size={10} /> {personalInfo.website}</span>
        </div>

      <section>
        <h3 className="text-sm font-bold text-primary border-b border-gray-300 mb-2 pb-1 tracking-wider">SUMMARY</h3>
        <p className="text-gray-700">{summary}</p>
      </section>

      <section className="mt-4">
        <h3 className="text-sm font-bold text-primary border-b border-gray-300 mb-2 pb-1 tracking-wider">EXPERIENCE</h3>
        {experience.map(exp => (
          <div key={exp.id} className="mb-3">
            <div className="flex justify-between items-baseline">
              <h4 className="text-[11px] font-bold">{exp.title}</h4>
              <span className="text-[9px] font-medium text-gray-600">{exp.startDate} - {exp.endDate}</span>
            </div>
            <div className="flex justify-between items-baseline mb-1">
              <p className="font-semibold text-primary">{exp.company}</p>
              <p className="text-[9px] font-medium text-gray-600">{exp.location}</p>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('-', '').trim()}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-4">
        <h3 className="text-sm font-bold text-primary border-b border-gray-300 mb-2 pb-1 tracking-wider">EDUCATION</h3>
        {education.map(edu => (
          <div key={edu.id} className="mb-2">
             <div className="flex justify-between items-baseline">
              <h4 className="text-[11px] font-bold">{edu.degree}</h4>
              <span className="text-[9px] font-medium text-gray-600">{edu.startDate} - {edu.endDate}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <p className="font-semibold text-primary">{edu.school}</p>
              <p className="text-[9px] font-medium text-gray-600">{edu.location}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-4">
        <h3 className="text-sm font-bold text-primary border-b border-gray-300 mb-2 pb-1 tracking-wider">SKILLS</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
          {skills.map(skill => <span key={skill.id}>{skill.name}</span>)}
        </div>
      </section>
    </div>
  );
}
