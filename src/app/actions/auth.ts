'use server';

import { compare } from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

type AuthState = {
  error?: string;
  success?: boolean;
} | null;

const ADMIN_DB_PATH = path.join(process.cwd(), 'data/admin.json');

async function getAdminData() {
    const data = await fs.readFile(ADMIN_DB_PATH, 'utf-8');
    return JSON.parse(data);
}

export async function adminLogin(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const password = formData.get('password') as string;

  if (!password) {
    return { error: 'Password is required.' };
  }
  
  try {
    const adminData = await getAdminData();
    const passwordMatch = await compare(password, adminData.passwordHash);

    if (passwordMatch) {
      const cookieStore = cookies();
      cookieStore.set('admin-auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });
    } else {
      return { error: 'Invalid password.' };
    }
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred.' };
  }
  
  redirect('/admin');
}
