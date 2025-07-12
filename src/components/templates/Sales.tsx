'use client';
import { useResume } from '@/components/Editor';
import { Mail, Phone, Linkedin, Globe, MapPin, Award, BarChart, Target } from 'lucide-react';

export function SalesTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills, achievements } = resumeData;

  return (
    <div className="p-8 bg-white text-gray-800 font-sans text-[10px] leading-snug">
      <header className="text-center mb-6 border-b-4 border-primary pb-4">
        <h1 className="text-3xl font-bold font-serif text-gray-800 tracking-wider">{personalInfo.name}</h1>
        <h2 className="text-lg font-semibold text-primary tracking-widest">{personalInfo.title}</h2>
         <div className="flex justify-center items-center gap-x-4 gap-y-1 text-[9px] text-gray-600 mt-2 flex-wrap">
          <span className="flex items-center gap-1"><MapPin size={10} /> {personalInfo.location}</span>
          <span className="flex items-center gap-1"><Phone size={10} /> {personalInfo.phone}</span>
          <span className="flex items-center gap-1"><Mail size={10} /> {personalInfo.email}</span>
          <span className="flex items-center gap-1"><Linkedin size={10} /> {personalInfo.linkedin}</span>
        </div>
      </header>

      <section>
        <h3 className="text-sm font-bold text-primary uppercase mb-2 tracking-wider">Professional Profile</h3>
        <p className="text-gray-700">{summary}</p>
      </section>

      <div className="grid grid-cols-3 gap-6 mt-4">
        <div className="col-span-2">
           <section className="mt-4">
            <h3 className="text-sm font-bold text-primary uppercase mb-2 tracking-wider">Professional Experience</h3>
            {experience.map(exp => (
              <div key={exp.id} className="mb-3">
                <h4 className="text-[11px] font-bold">{exp.title}, <span className="text-primary font-semibold">{exp.company}</span></h4>
                <p className="text-[9px] font-medium text-gray-600">{exp.location} | {exp.startDate} - {exp.endDate}</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-1">
                  {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('-', '').trim()}</li>)}
                </ul>
              </div>
            ))}
          </section>
        </div>
        <div className="col-span-1">
           {achievements?.length > 0 && <section className="mt-4">
            <h3 className="text-sm font-bold text-primary uppercase mb-2 tracking-wider flex items-center gap-2"><Target size={12} /> Key Achievements</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {achievements.map(ach => (
                <li key={ach.id}>{ach.details}</li>
              ))}
            </ul>
          </section>}

          <section className="mt-4">
            <h3 className="text-sm font-bold text-primary uppercase mb-2 tracking-wider">Skills</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
            </ul>
          </section>

          <section className="mt-4">
            <h3 className="text-sm font-bold text-primary uppercase mb-2 tracking-wider">Education</h3>
            {education.map(edu => (
              <div key={edu.id} className="mb-2">
                  <h4 className="text-[11px] font-bold">{edu.degree}</h4>
                  <p className="text-primary font-semibold">{edu.school}</p>
                  <p className="text-[9px] font-medium text-gray-600">{edu.endDate}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
