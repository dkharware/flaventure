
'use client';
import { useResume } from '@/components/Editor';
import Image from 'next/image';
import { Mail, Phone, Linkedin, Globe, MapPin, Briefcase, GraduationCap, Star, Palette } from 'lucide-react';

export function PortfolioTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills, projects } = resumeData;

  return (
    <div className="p-8 bg-white text-gray-800 font-sans text-[10px] leading-snug">
      <div className="flex items-start gap-8">
        <div className="w-1/3 text-center">
          <Image
            src="https://placehold.co/200x200.png"
            data-ai-hint="professional portrait"
            width="200"
            height="200"
            alt={personalInfo.name}
            className="rounded-full mx-auto mb-4 border-4 border-primary/20"
          />
          <h1 className="text-2xl font-bold font-headline text-primary">{personalInfo.name}</h1>
          <h2 className="text-md text-foreground/80">{personalInfo.title}</h2>
          <div className="text-xs text-gray-600 mt-4 space-y-1 text-left">
            <p className="flex items-center gap-2"><MapPin size={12}/> {personalInfo.location}</p>
            <p className="flex items-center gap-2"><Phone size={12}/> {personalInfo.phone}</p>
            <p className="flex items-center gap-2"><Mail size={12}/> {personalInfo.email}</p>
            <p className="flex items-center gap-2"><Linkedin size={12}/> {personalInfo.linkedin}</p>
            <p className="flex items-center gap-2"><Globe size={12}/> {personalInfo.website}</p>
          </div>
          <div className="mt-4 text-left">
            <h3 className="font-bold text-sm text-primary border-b mb-2 pb-1">SKILLS</h3>
            <div className="flex flex-wrap gap-1">
              {skills.map(skill => <span key={skill.id} className="bg-primary/10 text-primary text-[9px] px-2 py-0.5 rounded-full">{skill.name}</span>)}
            </div>
          </div>
        </div>
        <div className="w-2/3">
          <section className="mb-6">
            <p className="italic text-gray-600">{summary}</p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-bold font-headline text-primary flex items-center gap-2 mb-2"><Palette size={16}/> PORTFOLIO / PROJECTS</h3>
            {projects?.map(proj => (
              <div key={proj.id} className="mb-4">
                <h4 className="font-bold">{proj.name}</h4>
                <p className="text-gray-700 mt-1 text-[9px] space-y-0.5">{proj.description}</p>
                {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-primary text-xs hover:underline">View Project</a>}
              </div>
            ))}
          </section>
          
          <section className="mb-6">
            <h3 className="text-lg font-bold font-headline text-primary flex items-center gap-2 mb-2"><Briefcase size={16}/> EXPERIENCE</h3>
            {experience.map(exp => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold">{exp.title} at {exp.company}</h4>
                  <span className="text-[9px] font-medium text-gray-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                <ul className="list-disc list-inside text-gray-700 mt-1 text-[9px] space-y-0.5">
                  {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('-', '').trim()}</li>)}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-lg font-bold font-headline text-primary flex items-center gap-2 mb-2"><GraduationCap size={16}/> EDUCATION</h3>
            {education.map(edu => (
              <div key={edu.id} className="mb-3">
                <h4 className="font-bold">{edu.degree}</h4>
                <p className="font-semibold text-gray-600">{edu.school}, {edu.endDate}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
