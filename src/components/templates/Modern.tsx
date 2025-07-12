'use client';
import { useResume } from '@/components/Editor';
import { Mail, Phone, Linkedin, Globe, MapPin, Briefcase, GraduationCap, Star } from 'lucide-react';

export function ModernTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills, hobbies } = resumeData;

  return (
    <div className="p-8 bg-white text-gray-800 font-sans text-[10px] leading-snug">
      <div className="grid grid-cols-[1fr_2fr] gap-8">
        <aside>
          <div className="mb-6">
            <h1 className="text-2xl font-bold font-headline text-primary">{personalInfo.name}</h1>
            <h2 className="text-md text-foreground/80">{personalInfo.title}</h2>
          </div>
          <div className="space-y-4 text-[9px]">
            <div>
              <h3 className="font-bold text-sm text-primary border-b mb-2 pb-1">CONTACT</h3>
              <div className="space-y-1 text-gray-600">
                <p className="flex items-center gap-2"><Phone size={12}/> {personalInfo.phone}</p>
                <p className="flex items-center gap-2"><Mail size={12}/> {personalInfo.email}</p>
                <p className="flex items-center gap-2"><MapPin size={12}/> {personalInfo.location}</p>
                <p className="flex items-center gap-2"><Linkedin size={12}/> {personalInfo.linkedin}</p>
                <p className="flex items-center gap-2"><Globe size={12}/> {personalInfo.website}</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-sm text-primary border-b mb-2 pb-1">SKILLS</h3>
              <ul className="space-y-1 text-gray-600">
                {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
              </ul>
            </div>
          </div>
        </aside>
        <main>
          <section className="mb-6">
            <h3 className="text-lg font-bold font-headline text-primary mb-2">PROFILE</h3>
            <p className="text-gray-700">{summary}</p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-bold font-headline text-primary mb-2">EXPERIENCE</h3>
            {experience.map(exp => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold">{exp.title}</h4>
                  <span className="text-[9px] font-medium text-gray-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="font-semibold text-gray-600">{exp.company} - {exp.location}</p>
                <ul className="list-disc list-inside text-gray-700 mt-1 text-[9px] space-y-0.5">
                  {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('-', '').trim()}</li>)}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-lg font-bold font-headline text-primary mb-2">EDUCATION</h3>
            {education.map(edu => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold">{edu.degree}</h4>
                  <span className="text-[9px] font-medium text-gray-500">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="font-semibold text-gray-600">{edu.school} - {edu.location}</p>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
