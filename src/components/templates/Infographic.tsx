'use client';
import { useResume } from '@/components/Editor';
import { Mail, Phone, Linkedin, Globe, MapPin, Briefcase, GraduationCap, Star, User, Languages, BarChart, Code } from 'lucide-react';

export function InfographicTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills, languages, hobbies } = resumeData;

  const SkillBar = ({ name, level }: { name: string, level: number }) => (
    <div className="w-full">
      <p className="text-xs font-semibold">{name}</p>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${level}%` }}></div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-12 gap-0 p-6 bg-white text-gray-800 font-sans text-[10px]">
        {/* Left Column */}
        <div className="col-span-4 bg-primary/10 p-4 space-y-6">
            <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-2 flex items-center justify-center ring-4 ring-primary/30">
                     <User className="text-primary" size={40} />
                </div>
                <h1 className="text-2xl font-bold font-headline text-primary">{personalInfo.name}</h1>
                <h2 className="text-md">{personalInfo.title}</h2>
            </div>
            
            <div className="space-y-4">
                <div>
                    <h3 className="font-bold font-headline text-primary mb-2 text-sm">CONTACT</h3>
                    <div className="space-y-2 text-xs">
                        <p className="flex items-center gap-2"><Phone size={14}/> {personalInfo.phone}</p>
                        <p className="flex items-center gap-2"><Mail size={14}/> {personalInfo.email}</p>
                        <p className="flex items-center gap-2"><MapPin size={14}/> {personalInfo.location}</p>
                        <p className="flex items-center gap-2"><Linkedin size={14}/> {personalInfo.linkedin}</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold font-headline text-primary mb-2 text-sm flex items-center gap-2"><BarChart size={14} /> SKILLS</h3>
                    <div className="space-y-2">
                      {skills.slice(0, 5).map(skill => <SkillBar key={skill.id} name={skill.name} level={Math.floor(Math.random() * 50) + 50} />)}
                    </div>
                </div>

                {languages?.length > 0 && <div>
                    <h3 className="font-bold font-headline text-primary mb-2 text-sm flex items-center gap-2"><Languages size={14} /> LANGUAGES</h3>
                    <div className="space-y-2">
                       {languages.map(lang => <SkillBar key={lang.id} name={lang.name} level={lang.level} />)}
                    </div>
                </div>}
            </div>
        </div>

        {/* Right Column */}
        <div className="col-span-8 p-6">
            <section className="mb-6">
              <h3 className="text-lg font-bold font-headline text-primary flex items-center gap-2 mb-2"><User size={16}/> ABOUT ME</h3>
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-bold font-headline text-primary flex items-center gap-2 mb-3"><Briefcase size={16}/> EXPERIENCE</h3>
              {experience.map(exp => (
                <div key={exp.id} className="mb-4 flex gap-3">
                    <div className="w-10 text-center">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                        <Briefcase size={16} />
                      </div>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                        <h4 className="font-bold">{exp.title}</h4>
                        <p className="font-semibold text-gray-600">{exp.company} | {exp.location}</p>
                    </div>
                </div>
              ))}
            </section>

            <section>
              <h3 className="text-lg font-bold font-headline text-primary flex items-center gap-2 mb-3"><GraduationCap size={16}/> EDUCATION</h3>
              {education.map(edu => (
                 <div key={edu.id} className="mb-4 flex gap-3">
                    <div className="w-10 text-center">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                        <GraduationCap size={16} />
                      </div>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                        <h4 className="font-bold">{edu.degree}</h4>
                        <p className="font-semibold text-gray-600">{edu.school}</p>
                    </div>
                </div>
              ))}
            </section>
        </div>
    </div>
  );
}
