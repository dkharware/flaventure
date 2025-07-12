'use client';
import { useResume } from '@/components/Editor';
import { Mail, Phone, Linkedin, Globe, MapPin, User, Briefcase, GraduationCap, Star } from 'lucide-react';

export function EntryLevelTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, objective, education, experience, skills, projects } = resumeData;

  return (
    <div className="p-8 bg-white text-gray-800 font-sans text-[10px] leading-snug">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold font-headline">{personalInfo.name}</h1>
        <p className="text-lg text-primary">{personalInfo.title}</p>
        <div className="flex justify-center items-center gap-x-4 gap-y-1 text-xs text-gray-600 mt-2 flex-wrap">
          <span>{personalInfo.location}</span>
          <span>&bull;</span>
          <span>{personalInfo.phone}</span>
          <span>&bull;</span>
          <span>{personalInfo.email}</span>
        </div>
      </header>

      <section className="mb-4">
        <h2 className="text-md font-bold text-primary border-b-2 border-primary/20 mb-2 pb-1 tracking-wider flex items-center gap-2"><User size={14}/> OBJECTIVE</h2>
        <p className="text-gray-700 text-center italic">{objective}</p>
      </section>

      <section className="mb-4">
        <h2 className="text-md font-bold text-primary border-b-2 border-primary/20 mb-2 pb-1 tracking-wider flex items-center gap-2"><GraduationCap size={14}/> EDUCATION</h2>
        {education.map(edu => (
          <div key={edu.id} className="mb-2">
             <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-md">{edu.school}</h3>
              <p className="font-medium text-gray-600">{edu.startDate} - {edu.endDate}</p>
            </div>
            <p className="italic">{edu.degree}</p>
          </div>
        ))}
      </section>
      
      {experience?.length > 0 && <section className="mb-4">
        <h2 className="text-md font-bold text-primary border-b-2 border-primary/20 mb-2 pb-1 tracking-wider flex items-center gap-2"><Briefcase size={14}/> EXPERIENCE</h2>
        {experience.map(exp => (
          <div key={exp.id} className="mb-3">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-md">{exp.title}</h3>
              <p className="font-medium text-gray-600">{exp.startDate} - {exp.endDate}</p>
            </div>
            <p className="font-semibold italic">{exp.company}</p>
            <ul className="list-disc list-inside text-gray-700 mt-1 space-y-0.5">
              {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('-', '').trim()}</li>)}
            </ul>
          </div>
        ))}
      </section>}
      
      {projects?.length > 0 && <section className="mb-4">
        <h2 className="text-md font-bold text-primary border-b-2 border-primary/20 mb-2 pb-1 tracking-wider">PROJECTS</h2>
        {projects.map(proj => (
          <div key={proj.id} className="mb-2">
            <h3 className="font-bold">{proj.name}</h3>
            <p>{proj.description}</p>
          </div>
        ))}
      </section>}

      <section>
        <h2 className="text-md font-bold text-primary border-b-2 border-primary/20 mb-2 pb-1 tracking-wider flex items-center gap-2"><Star size={14}/> SKILLS</h2>
        <p className="text-center">{skills.map(skill => skill.name).join(' | ')}</p>
      </section>
    </div>
  );
}
