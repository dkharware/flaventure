import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DB_PATH = path.join(process.cwd(), 'data/db.json');
const ADMIN_DB_PATH = path.join(process.cwd(), 'data/admin.json');

async function readDb(filePath: string) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, create it with default structure
      const defaultData: any = { users: [], resumes: [], cover_letters: [] };
      if (filePath === ADMIN_DB_PATH) {
        defaultData.aboutContent = {};
      }
      await writeDb(filePath, defaultData);
      return defaultData;
    }
    throw error;
  }
}

async function writeDb(filePath: string, data: any) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export const db = {
  // User methods
  getUsers: async () => {
    const data = await readDb(DB_PATH);
    return data.users || [];
  },
  getUserById: async (id: string) => {
    const data = await readDb(DB_PATH);
    return (data.users || []).find((user: any) => user.id === id);
  },
  getUserByEmail: async (email: string) => {
    const data = await readDb(DB_PATH);
    return (data.users || []).find((user: any) => user.email === email);
  },
  createUser: async (userData: { fullName: string; email: string; passwordHash: string }) => {
    const data = await readDb(DB_PATH);
    if (!data.users) data.users = [];
    const newUser = { id: uuidv4(), ...userData };
    data.users.push(newUser);
    await writeDb(DB_PATH, data);
    return newUser;
  },

  // Resume methods
  getResumes: async () => {
    const data = await readDb(DB_PATH);
    return data.resumes || [];
  },
  addResume: async (resume: { url: string; name: string; createdAt: Date }) => {
    const data = await readDb(DB_PATH);
    if (!data.resumes) data.resumes = [];
    data.resumes.push(resume);
    await writeDb(DB_PATH, data);
  },
  
  // Cover Letter methods
  getCoverLetters: async () => {
    const data = await readDb(DB_PATH);
    return data.cover_letters || [];
  },
  addCoverLetter: async (coverLetter: { url: string; name: string; createdAt: Date }) => {
    const data = await readDb(DB_PATH);
    if (!data.cover_letters) data.cover_letters = [];
    data.cover_letters.push(coverLetter);
    await writeDb(DB_PATH, data);
  },

  // Admin methods
  getAboutContent: async () => {
    const data = await readDb(ADMIN_DB_PATH);
    return data.aboutContent;
  },
  updateAboutContent: async (newContent: any) => {
    const data = await readDb(ADMIN_DB_PATH);
    data.aboutContent = newContent;
    await writeDb(ADMIN_DB_PATH, data);
  }
};
