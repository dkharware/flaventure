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
  objective: 'To obtain an entry-level software engineering position where I can utilize my skills in web development and problem-solving to contribute to a dynamic team.',
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
     {
      id: 'edu2',
      school: 'University of California, Berkeley',
      degree: 'B.S. in Electrical Engineering & Computer Sciences',
      location: 'Berkeley, CA',
      startDate: '2013',
      endDate: '2017',
    },
  ],
  skills: [
    { id: 'skill1', name: 'React' },
    { id: 'skill2', name: 'TypeScript' },
    { id: 'skill3', name: 'Node.js' },
    { id: 'skill4', name: 'SQL' },
    { id: 'skill5', name: 'AWS' },
    { id: 'skill6', name: 'Project Management' },
    { id: 'skill7', name: 'Agile Methodologies' },
    { id: 'skill8', name: 'Data Analysis' },
  ],
  hobbies: [
    { id: 'hobby1', name: 'Hiking' },
    { id: 'hobby2', name: 'Photography' },
    { id: 'hobby3', name: 'Playing Guitar' },
  ],
  projects: [
    {
      id: 'proj1',
      name: 'Personal Portfolio Website',
      description: 'Designed and developed a responsive personal portfolio website using Next.js and Tailwind CSS to showcase my projects and skills.',
      link: 'https://johndoe.com',
    },
    {
      id: 'proj2',
      name: 'E-commerce Store',
      description: 'Built a full-stack e-commerce application with features like product catalog, shopping cart, and user authentication using the MERN stack.',
      link: '',
    },
  ],
  publications: [
    { id: 'pub1', details: 'Doe, J. (2020). The Future of Machine Learning. Journal of Advanced AI, 15(2), 123-145.' },
    { id: 'pub2', details: 'Doe, J., & Smith, A. (2019). A Novel Approach to Natural Language Processing. Proceedings of the International Conference on Computational Linguistics.' },
  ],
  presentations: [
    { id: 'pres1', details: 'Keynote Speaker, "AI and Society", AI Summit 2021, Virtual.' },
    { id: 'pres2', details: 'Presenter, "Deep Learning for Beginners", Tech Conference 2019, New York, NY.' },
  ],
  awards: [
    { id: 'award1', details: 'Best Paper Award, International Conference on Machine Learning (2020)' },
    { id: 'award2', details: 'Graduate Research Fellowship, National Science Foundation (2017-2019)' },
  ],
  languages: [
    { id: 'lang1', name: 'English', level: 100 },
    { id: 'lang2', name: 'Spanish', level: 75 },
  ],
  leadership: [
    { id: 'lead1', details: 'Board Member, AI Ethics Council (2021-Present)' },
    { id: 'lead2', details: 'President, University Coding Club (2016-2017)' },
  ],
  achievements: [
    { id: 'achieve1', details: 'Exceeded sales targets by 150% in Q4 2022.' },
    { id: 'achieve2', details: 'Secured a $1M+ contract with a key enterprise client.' },
    { id: 'achieve3', details: 'Named "Salesperson of the Year" for 2021.' },
  ]
};
