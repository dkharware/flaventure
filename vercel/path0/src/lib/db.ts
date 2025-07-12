import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data/db.json');

async function readDb() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, return default structure
      return { resumes: [], cover_letters: [] };
    }
    throw error;
  }
}

async function writeDb(data: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export const db = {
  getResumes: async () => {
    const data = await readDb();
    return data.resumes;
  },
  addResume: async (resume: { url: string; name: string; createdAt: Date }) => {
    const data = await readDb();
    data.resumes.push(resume);
    await writeDb(data);
  },
  getCoverLetters: async () => {
    const data = await readDb();
    return data.cover_letters;
  },
  addCoverLetter: async (coverLetter: { url: string; name: string; createdAt: Date }) => {
    const data = await readDb();
    data.cover_letters.push(coverLetter);
    await writeDb(data);
  },
};
