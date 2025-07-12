'use client';
import { useResume } from '@/components/Editor';
import { Mail, Phone, Linkedin, Globe, MapPin, Briefcase, GraduationCap, Star } from 'lucide-react';

export function TwoColumnTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills, hobbies } = resumeData;

  return (
    <div className="p-8 bg-white text-gray-800 font-sans text-[10px] leading-snug">
      <header className="mb-6">
        <h1 className="text-3xl font-bold font-headline text-primary">{personalInfo.name}</h1>
        <h2 className="text-lg text-foreground/80">{personalInfo.title}</h2>
        <p className="mt-2 text-gray-600">{summary}</p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-4 space-y-6">
          <div>
            <h3 className="font-bold text-sm text-primary border-b-2 border-primary/20 mb-2 pb-1">CONTACT</h3>
            <div className="space-y-1 text-xs">
              <p className="flex items-center gap-2"><MapPin size={12}/> {personalInfo.location}</p>
              <p className="flex items-center gap-2"><Phone size={12}/> {personalInfo.phone}</p>
              <p className="flex items-center gap-2"><Mail size={12}/> {personalInfo.email}</p>
              <p className="flex items-center gap-2"><Linkedin size={12}/> {personalInfo.linkedin}</p>
              <p className="flex items-center gap-2"><Globe size={12}/> {personalInfo.website}</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-sm text-primary border-b-2 border-primary/20 mb-2 pb-1">SKILLS</h3>
            <ul className="space-y-1">
              {skills.map(skill => <li key={skill.id} className="bg-primary/10 text-primary text-center px-2 py-0.5 rounded">{skill.name}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm text-primary border-b-2 border-primary/20 mb-2 pb-1">EDUCATION</h3>
            {education.map(edu => (
              <div key={edu.id} className="mb-2">
                <h4 className="font-bold">{edu.degree}</h4>
                <p className="font-semibold text-gray-600">{edu.school}</p>
                <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-8">
          <section>
            <h3 className="font-bold text-sm text-primary border-b-2 border-primary/20 mb-2 pb-1">WORK EXPERIENCE</h3>
            {experience.map(exp => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-[11px]">{exp.title}</h4>
                  <span className="text-[9px] font-medium text-gray-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="font-semibold text-gray-600">{exp.company} - {exp.location}</p>
                <ul className="list-disc list-inside text-gray-700 mt-1 text-[9px] space-y-0.5">
                  {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('-', '').trim()}</li>)}
                </ul>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
