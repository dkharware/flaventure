'use client';
import { useResume } from '@/components/Editor';
import { Mail, Phone, Linkedin, Globe, MapPin, Award, BookOpen, Mic } from 'lucide-react';
import type { Publication, Presentation } from '@/lib/types';

export function AcademicTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, summary, education, experience, skills, publications, presentations, awards } = resumeData;

  return (
    <div className="p-8 bg-white text-gray-800 font-serif text-[10px] leading-relaxed">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
        <p className="text-md text-gray-600">{personalInfo.title}</p>
        <div className="flex justify-center items-center gap-x-4 gap-y-1 text-[9px] text-gray-500 mt-2 flex-wrap">
          <span className="flex items-center gap-1"><MapPin size={10} /> {personalInfo.location}</span>
          <span className="flex items-center gap-1"><Phone size={10} /> {personalInfo.phone}</span>
          <span className="flex items-center gap-1"><Mail size={10} /> {personalInfo.email}</span>
          <span className="flex items-center gap-1"><Linkedin size={10} /> {personalInfo.linkedin}</span>
          <span className="flex items-center gap-1"><Globe size={10} /> {personalInfo.website}</span>
        </div>
      </header>

      <section className="mb-4">
        <h2 className="text-sm font-bold border-b-2 border-gray-200 pb-1 mb-2 tracking-wider">RESEARCH INTERESTS</h2>
        <p>{summary}</p>
      </section>

      <section className="mb-4">
        <h2 className="text-sm font-bold border-b-2 border-gray-200 pb-1 mb-2 tracking-wider">EDUCATION</h2>
        {education.map(edu => (
          <div key={edu.id} className="mb-2">
            <div className="flex justify-between">
              <p className="font-bold">{edu.degree}</p>
              <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
            </div>
            <p className="italic">{edu.school}, {edu.location}</p>
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="text-sm font-bold border-b-2 border-gray-200 pb-1 mb-2 tracking-wider">RESEARCH EXPERIENCE</h2>
        {experience.map(exp => (
          <div key={exp.id} className="mb-3">
            <div className="flex justify-between">
                <h4 className="font-bold">{exp.title}</h4>
                <p className="text-gray-600">{exp.startDate} - {exp.endDate}</p>
            </div>
            <p className="italic">{exp.company}, {exp.location}</p>
            <ul className="list-disc list-inside text-gray-700 mt-1 space-y-0.5">
                {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('-', '').trim()}</li>)}
            </ul>
          </div>
        ))}
      </section>

      {publications?.length > 0 && <section className="mb-4">
        <h2 className="text-sm font-bold border-b-2 border-gray-200 pb-1 mb-2 tracking-wider flex items-center gap-2"><BookOpen size={12} /> PUBLICATIONS</h2>
        <ul className="list-decimal list-inside space-y-1">
          {publications.map((pub: Publication) => (
            <li key={pub.id}>{pub.details}</li>
          ))}
        </ul>
      </section>}
      
      {presentations?.length > 0 && <section className="mb-4">
        <h2 className="text-sm font-bold border-b-2 border-gray-200 pb-1 mb-2 tracking-wider flex items-center gap-2"><Mic size={12} /> PRESENTATIONS</h2>
        <ul className="list-decimal list-inside space-y-1">
          {presentations.map((pres: Presentation) => (
            <li key={pres.id}>{pres.details}</li>
          ))}
        </ul>
      </section>}
      
      {awards?.length > 0 && <section className="mb-4">
        <h2 className="text-sm font-bold border-b-2 border-gray-200 pb-1 mb-2 tracking-wider flex items-center gap-2"><Award size={12} /> AWARDS & HONORS</h2>
        <ul className="list-decimal list-inside space-y-1">
          {awards.map((award: Award) => (
            <li key={award.id}>{award.details}</li>
          ))}
        </ul>
      </section>}

      <section>
        <h2 className="text-sm font-bold border-b-2 border-gray-200 pb-1 mb-2 tracking-wider">SKILLS</h2>
        <p className="text-center">{skills.map(s => s.name).join(' | ')}</p>
      </section>
    </div>
  );
}
