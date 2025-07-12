import type { ResumeData } from './types';

export const initialData: ResumeData = {
  personalInfo: {
    name: 'John Doe',
    title: 'Software Engineer',
    phone: '(123) 456-7890',
    email: 'john.doe@email.com',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    website: 'johndoe.com',
  },
  summary:
    'Innovative and deadline-driven Software Engineer with 5+ years of experience designing and developing user-centered digital products from initial concept to final, polished deliverable.',
  experience: [
    {
      id: 'exp1',
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description:
        '- Led a team of 5 engineers to develop a new flagship product, resulting in a 30% increase in user engagement.\n- Architected and implemented a scalable microservices-based backend using Node.js and AWS.\n- Optimized application performance, reducing page load times by 40%.',
    },
    {
      id: 'exp2',
      title: 'Software Engineer',
      company: 'Innovate Co.',
      location: 'Palo Alto, CA',
      startDate: 'Jun 2019',
      endDate: 'Dec 2021',
      description:
        '- Developed and maintained front-end features for a high-traffic e-commerce platform using React and Redux.\n- Collaborated with UX/UI designers to create responsive and accessible user interfaces.\n- Wrote unit and integration tests to ensure code quality and reliability.',
    },
  ],
  education: [
    {
      id: 'edu1',
      school: 'Stanford University',
      degree: 'M.S. in Computer Science',
      location: 'Stanford, CA',
      startDate: '2017',
      endDate: '2019',
    },
  ],
  skills: [
    { id: 'skill1', name: 'React' },
    { id: 'skill2', name: 'TypeScript' },
    { id: 'skill3', name: 'Node.js' },
    { id: 'skill4', name: 'SQL' },
    { id: 'skill5', name: 'AWS' },
  ],
  hobbies: [
    { id: 'hobby1', name: 'Hiking' },
    { id: 'hobby2', name: 'Photography' },
    { id: 'hobby3', name: 'Playing Guitar' },
  ],
};
