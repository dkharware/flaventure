'use client';
import { useResume } from '@/components/Editor';

export function CompactTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills } = resumeData;

  return (
    <div className="p-6 bg-white text-gray-800 font-sans text-[9px] leading-normal">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold font-headline">{personalInfo.name}</h1>
        <p className="text-sm text-primary">{personalInfo.title}</p>
        <p className="text-[8px] text-gray-500 mt-1">
          {personalInfo.location} | {personalInfo.phone} | {personalInfo.email} | {personalInfo.linkedin}
        </p>
      </div>

      <div className="mb-3">
        <h2 className="text-[11px] font-bold font-headline text-primary border-b mb-1 pb-0.5">SUMMARY</h2>
        <p>{summary}</p>
      </div>

      <div className="mb-3">
        <h2 className="text-[11px] font-bold font-headline text-primary border-b mb-1 pb-0.5">SKILLS</h2>
        <p className="text-center text-[8px]">{skills.map(skill => skill.name).join(' • ')}</p>
      </div>

      <div className="mb-3">
        <h2 className="text-[11px] font-bold font-headline text-primary border-b mb-1 pb-0.5">EXPERIENCE</h2>
        {experience.map(exp => (
          <div key={exp.id} className="mb-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-[10px]">{exp.title}</h3>
                <p className="font-semibold text-gray-600">{exp.company} | {exp.location}</p>
              </div>
              <p className="text-gray-500 text-right text-[8px] min-w-[80px]">{exp.startDate} - {exp.endDate}</p>
            </div>
            <ul className="list-disc list-inside mt-0.5 text-gray-700 space-y-0.5">
              {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace('-', '').trim()}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-[11px] font-bold font-headline text-primary border-b mb-1 pb-0.5">EDUCATION</h2>
        {education.map(edu => (
          <div key={edu.id} className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-[10px]">{edu.degree}</h3>
              <p className="text-gray-600">{edu.school}, {edu.location}</p>
            </div>
            <p className="text-gray-500 text-right">{edu.startDate} - {edu.endDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
