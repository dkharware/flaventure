export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    phone: string;
    email: string;
    location: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  objective?: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  hobbies?: Hobby[];
  projects?: Project[];
  publications?: Publication[];
  presentations?: Presentation[];
  awards?: Award[];
  languages?: Language[];
  leadership?: Leadership[];
  achievements?: Achievement[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Hobby {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
}

export interface Publication {
  id: string;
  details: string;
}
export interface Presentation {
  id: string;
  details: string;
}
export interface Award {
  id: string;
  details: string;
}
export interface Language {
  id: string;
  name: string;
  level: number;
}
export interface Leadership {
  id: string;
  details: string;
}
export interface Achievement {
  id: string;
  details: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  hint: string;
}
