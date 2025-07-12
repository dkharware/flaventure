'use client';
import { useResume } from '@/components/Editor';
import { Mail, Phone, Linkedin, Globe, MapPin, Code, GitMerge, Star, HardDrive } from 'lucide-react';

export function DeveloperTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills, projects } = resumeData;

  return (
    <div className="p-8 bg-gray-900 text-gray-200 font-mono text-[10px] leading-relaxed">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-green-400">{personalInfo.name}</h1>
          <p className="text-cyan-400 text-lg">/ {personalInfo.title}</p>
        </div>
        <div className="text-right text-xs text-gray-400 space-y-1">
          <p className="flex items-center justify-end gap-2"><Mail size={12}/> {personalInfo.email}</p>
          <p className="flex items-center justify-end gap-2"><Phone size={12}/> {personalInfo.phone}</p>
          <p className="flex items-center justify-end gap-2"><Linkedin size={12}/> {personalInfo.linkedin}</p>
          <p className="flex items-center justify-end gap-2"><Globe size={12}/> {personalInfo.website}</p>
        </div>
      </header>

      <section className="mb-4">
        <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2 mb-2">
            <span className="text-green-400">&gt;</span> Summary
        </h2>
        <p className="text-gray-300 ml-4">{summary}</p>
      </section>
      
      <section className="mb-4">
        <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2 mb-2">
            <span className="text-green-400">&gt;</span> Skills
        </h2>
        <div className="flex flex-wrap gap-2 ml-4">
          {skills.map(skill => (
            <span key={skill.id} className="bg-gray-700 text-green-400 px-2 py-1 rounded-sm text-xs">
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2 mb-2">
            <span className="text-green-400">&gt;</span> Experience
        </h2>
        {experience.map(exp => (
          <div key={exp.id} className="mb-3 ml-4">
            <h3 className="text-yellow-400 font-bold text-md">{exp.title}</h3>
            <p className="text-gray-400">{exp.company} <span className="text-green-400">|</span> {exp.startDate} - {exp.endDate}</p>
            <ul className="list-disc list-inside text-gray-300 mt-1 pl-2">
                {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('-', '').trim()}</li>)}
            </ul>
          </div>
        ))}
      </section>
      
      {projects?.length > 0 && <section className="mb-4">
        <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2 mb-2">
            <span className="text-green-400">&gt;</span> Projects
        </h2>
        {projects.map(proj => (
          <div key={proj.id} className="mb-3 ml-4">
            <h3 className="text-yellow-400 font-bold text-md">{proj.name}</h3>
            <p className="text-gray-300">{proj.description}</p>
            {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">View Project &rarr;</a>}
          </div>
        ))}
      </section>}

      <section>
        <h2 className="text-lg font-bold text-cyan-400 flex items-center gap-2 mb-2">
            <span className="text-green-400">&gt;</span> Education
        </h2>
        {education.map(edu => (
          <div key={edu.id} className="ml-4">
            <h3 className="text-yellow-400 font-bold text-md">{edu.degree}</h3>
            <p className="text-gray-400">{edu.school} <span className="text-green-400">|</span> {edu.startDate} - {edu.endDate}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
