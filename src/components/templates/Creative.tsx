'use client';

import { useResume } from '@/components/Editor';
import { Mail, Phone, Linkedin, Globe, MapPin, Briefcase, GraduationCap, Star } from 'lucide-react';

export function CreativeTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills, hobbies } = resumeData;

  return (
    <div className="grid grid-cols-3 gap-8 p-8 bg-white text-[10px] leading-snug font-sans">
      <div className="col-span-1 bg-primary/10 p-4 rounded-lg">
        <div className="text-center mb-6">
            <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-2 flex items-center justify-center">
                 <span className="text-4xl font-bold text-primary">{personalInfo.name.charAt(0)}</span>
            </div>
            <h1 className="text-2xl font-bold font-headline text-primary">{personalInfo.name}</h1>
            <h2 className="text-md text-foreground/80">{personalInfo.title}</h2>
        </div>
        
        <div className="space-y-4 text-[9px]">
            <div>
                <h3 className="font-bold font-headline text-primary mb-1">CONTACT</h3>
                <div className="space-y-1 text-foreground/80">
                    <p className="flex items-center gap-2"><Phone size={12}/> {personalInfo.phone}</p>
                    <p className="flex items-center gap-2"><Mail size={12}/> {personalInfo.email}</p>
                    <p className="flex items-center gap-2"><MapPin size={12}/> {personalInfo.location}</p>
                    <p className="flex items-center gap-2"><Linkedin size={12}/> {personalInfo.linkedin}</p>
                    <p className="flex items-center gap-2"><Globe size={12}/> {personalInfo.website}</p>
                </div>
            </div>
            <div>
                <h3 className="font-bold font-headline text-primary mb-1">SKILLS</h3>
                <div className="flex flex-wrap gap-1">
                    {skills.map(skill => <span key={skill.id} className="bg-primary/20 text-primary text-[9px] px-2 py-0.5 rounded-full">{skill.name}</span>)}
                </div>
            </div>
            <div>
                <h3 className="font-bold font-headline text-primary mb-1">HOBBIES</h3>
                 <div className="flex flex-wrap gap-1">
                    {hobbies.map(hobby => <span key={hobby.id} className="text-foreground/80">{hobby.name}</span>).reduce((prev, curr) => [prev, ', ', curr] as any)}
                </div>
            </div>
        </div>
      </div>
      <div className="col-span-2">
        <section className="mb-6">
          <h3 className="text-lg font-bold font-headline text-primary flex items-center gap-2 mb-2"><Briefcase size={16}/> SUMMARY</h3>
          <p className="text-foreground/80">{summary}</p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-bold font-headline text-primary flex items-center gap-2 mb-2"><Briefcase size={16}/> EXPERIENCE</h3>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4 relative pl-4 border-l-2 border-primary/20">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-primary"></div>
                <p className="text-[9px] text-foreground/60">{exp.startDate} - {exp.endDate}</p>
                <h4 className="font-bold text-foreground">{exp.title}</h4>
                <p className="font-semibold text-foreground/80">{exp.company} | {exp.location}</p>
                <ul className="list-disc list-inside text-foreground/70 mt-1 text-[9px] space-y-0.5">
                    {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('-', '').trim()}</li>)}
                </ul>
            </div>
          ))}
        </section>

        <section>
          <h3 className="text-lg font-bold font-headline text-primary flex items-center gap-2 mb-2"><GraduationCap size={16}/> EDUCATION</h3>
          {education.map(edu => (
             <div key={edu.id} className="mb-3 relative pl-4 border-l-2 border-primary/20">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-primary"></div>
                <p className="text-[9px] text-foreground/60">{edu.startDate} - {edu.endDate}</p>
                <h4 className="font-bold text-foreground">{edu.degree}</h4>
                <p className="font-semibold text-foreground/80">{edu.school} | {edu.location}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
