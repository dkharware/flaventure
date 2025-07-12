'use client';
import { useResume } from '@/components/Editor';
import { Mail, Phone, Linkedin, Globe, MapPin, Briefcase, GraduationCap, Star, Award } from 'lucide-react';

export function TimelineTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills, hobbies } = resumeData;

  const TimelineItem = ({ icon, date, title, subtitle, description }: any) => (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center z-10">{icon}</div>
        <div className="w-0.5 h-full bg-primary/20 flex-grow"></div>
      </div>
      <div className="pb-8">
        <p className="text-xs text-gray-500 -mt-1 mb-1">{date}</p>
        <h4 className="font-bold">{title}</h4>
        <p className="text-sm text-gray-600">{subtitle}</p>
        {description && <ul className="list-disc list-inside text-gray-700 mt-1 text-[9px] space-y-0.5">
          {description.split('\n').map((line: string, i: number) => line && <li key={i}>{line.replace('-', '').trim()}</li>)}
        </ul>}
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-white text-gray-800 font-sans text-[10px] leading-snug">
      <div className="grid grid-cols-12 gap-8">
        {/* Left column */}
        <div className="col-span-4 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold font-headline text-primary">{personalInfo.name}</h1>
            <h2 className="text-lg text-foreground/80">{personalInfo.title}</h2>
          </div>
          <p className="text-center italic">{summary}</p>
          <div>
            <h3 className="font-bold text-sm text-primary border-b mb-2 pb-1">CONTACT</h3>
            <div className="space-y-1 text-xs">
              <p className="flex items-center gap-2"><MapPin size={12}/> {personalInfo.location}</p>
              <p className="flex items-center gap-2"><Phone size={12}/> {personalInfo.phone}</p>
              <p className="flex items-center gap-2"><Mail size={12}/> {personalInfo.email}</p>
              <p className="flex items-center gap-2"><Linkedin size={12}/> {personalInfo.linkedin}</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-sm text-primary border-b mb-2 pb-1">SKILLS</h3>
            <ul className="list-disc list-inside">
              {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
            </ul>
          </div>
          {hobbies?.length > 0 && <div>
            <h3 className="font-bold text-sm text-primary border-b mb-2 pb-1">HOBBIES</h3>
            <p>{hobbies.map(h => h.name).join(', ')}</p>
          </div>}
        </div>
        {/* Right column */}
        <div className="col-span-8">
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-primary/20"></div>
            {experience.map(exp => (
              <TimelineItem 
                key={exp.id}
                icon={<Briefcase size={14} />}
                date={`${exp.startDate} - ${exp.endDate}`}
                title={exp.title}
                subtitle={`${exp.company} | ${exp.location}`}
                description={exp.description}
              />
            ))}
            {education.map(edu => (
              <TimelineItem 
                key={edu.id}
                icon={<GraduationCap size={14} />}
                date={`${edu.startDate} - ${edu.endDate}`}
                title={edu.degree}
                subtitle={`${edu.school} | ${edu.location}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
