'use server';

import { compare } from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

type AuthState = {
  error?: string;
  success?: boolean;
} | null;

export async function adminLogin(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const password = formData.get('password') as string;

  if (!password) {
    return { error: 'Password is required.' };
  }
  
  try {
    const passwordHash = await db.getAdminPasswordHash();
    if (!passwordHash) {
      return { error: 'Admin password not set.' };
    }
    
    const passwordMatch = await compare(password, passwordHash);

    if (!passwordMatch) {
      return { error: 'Invalid password.' };
    }

    const cookieStore = cookies();
    cookieStore.set('admin-auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });
    
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred.' };
  }
  
  redirect('/admin');
}
