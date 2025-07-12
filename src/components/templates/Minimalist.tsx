'use client';
import { useResume } from '@/components/Editor';

export function MinimalistTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills } = resumeData;

  return (
    <div className="p-10 bg-white text-gray-700 font-serif text-[10px] leading-relaxed">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-widest">{personalInfo.name.toUpperCase()}</h1>
        <p className="text-sm tracking-wider">{personalInfo.title}</p>
        <p className="text-xs mt-2 text-gray-500">
          {personalInfo.location} &bull; {personalInfo.phone} &bull; {personalInfo.email}
        </p>
      </header>

      <section className="mb-6">
        <p className="text-center">{summary}</p>
      </section>

      <div className="h-[1px] bg-gray-200 my-6"></div>

      <section className="mb-6">
        <h2 className="text-center text-sm font-bold tracking-widest mb-4">EXPERIENCE</h2>
        {experience.map(exp => (
          <div key={exp.id} className="mb-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1 text-right">
                <p className="font-bold">{exp.company}</p>
                <p className="text-gray-500 text-[9px]">{exp.startDate} - {exp.endDate}</p>
              </div>
              <div className="col-span-3">
                <h3 className="font-bold">{exp.title}</h3>
                <ul className="list-disc list-inside text-gray-600 mt-1 text-[9px]">
                  {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('-', '').trim()}</li>)}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>
      
      <div className="h-[1px] bg-gray-200 my-6"></div>

      <section className="mb-6">
        <h2 className="text-center text-sm font-bold tracking-widest mb-4">EDUCATION</h2>
        {education.map(edu => (
          <div key={edu.id} className="text-center mb-2">
            <p className="font-bold">{edu.school} &mdash; {edu.degree}</p>
            <p className="text-gray-500 text-[9px]">{edu.startDate} - {edu.endDate}</p>
          </div>
        ))}
      </section>

      <div className="h-[1px] bg-gray-200 my-6"></div>

      <section>
        <h2 className="text-center text-sm font-bold tracking-widest mb-2">SKILLS</h2>
        <p className="text-center text-gray-600">
          {skills.map(skill => skill.name).join(' &bull; ')}
        </p>
      </section>
    </div>
  );
}
