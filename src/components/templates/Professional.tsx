'use client';

import { useResume } from '@/components/Editor';
import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';

export function ProfessionalTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills } = resumeData;

  return (
    <div className="p-8 bg-white text-gray-800 font-sans text-[10px] leading-snug">
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-4 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-primary tracking-tighter">{personalInfo.name}</h1>
            <h2 className="text-lg font-light text-gray-600">{personalInfo.title}</h2>
          </div>

          <div>
            <h3 className="text-sm font-bold text-primary pb-1 mb-2 tracking-wider">CONTACT</h3>
            <div className="w-10 h-px bg-gray-200 mb-2"></div>
            <div className="space-y-2 text-[9px] text-gray-600">
              <div className="flex items-center gap-2">
                <Phone size={12} className="shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={12} className="shrink-0" />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={12} className="shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin size={12} className="shrink-0" />
                <span>{personalInfo.linkedin}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={12} className="shrink-0" />
                <span>{personalInfo.website}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-primary pb-1 mb-2 tracking-wider">SKILLS</h3>
            <div className="w-10 h-px bg-gray-200 mb-2"></div>
            <ul className="space-y-1 text-gray-600">
              {skills.map(skill => (
                <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-8">
          <section className="mb-6">
            <h3 className="text-lg font-bold text-primary tracking-wider">PROFILE</h3>
            <div className="w-full h-px bg-gray-200 my-1"></div>
            <p className="text-gray-700">{summary}</p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-bold text-primary tracking-wider">EXPERIENCE</h3>
            <div className="w-full h-px bg-gray-200 my-1"></div>
            {experience.map(exp => (
              <div key={exp.id} className="mb-3 mt-2">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-[11px] font-bold">{exp.title}</h4>
                  <span className="text-[9px] font-medium text-gray-600 text-right">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="font-semibold">{exp.company} - {exp.location}</p>
                <ul className="list-disc list-inside text-gray-700 space-y-0.5 mt-1 pl-2">
                  {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('-', '').trim()}</li>)}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-lg font-bold text-primary tracking-wider">EDUCATION</h3>
            <div className="w-full h-px bg-gray-200 my-1"></div>
            {education.map(edu => (
              <div key={edu.id} className="mb-2 mt-2">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-[11px] font-bold">{edu.degree}</h4>
                  <span className="text-[9px] font-medium text-gray-600">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="font-semibold">{edu.school} - {edu.location}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
