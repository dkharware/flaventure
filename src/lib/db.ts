import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data/db.json');
const ADMIN_DB_PATH = path.join(process.cwd(), 'data/admin.json');

async function readDb(filePath: string) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, create it with default structure
      const defaultData = { resumes: [], cover_letters: [], aboutContent: {} };
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
