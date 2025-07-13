'use server';

import { db } from '@/lib/db';
import { hash, compare } from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const signupSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
    email: z.string().email('Invalid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
  });

type SignupState = {
  errors?: {
    fullName?: string[];
    email?: string[];
    password?: string[];
    general?: string;
  };
  success?: boolean;
} | null;

export async function signup(prevState: SignupState, formData: FormData): Promise<SignupState> {
  const validatedFields = signupSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { fullName, email, password } = validatedFields.data;

  try {
    const existingUser = await db.getUserByEmail(email);
    if (existingUser) {
      return { errors: { general: 'A user with this email already exists.' } };
    }

    const passwordHash = await hash(password, 10);
    const user = await db.createUser({ fullName, email, passwordHash });

    const sessionExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    cookies().set('session', user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: sessionExpires,
        path: '/',
    });

  } catch (e) {
    console.error(e);
    return { errors: { general: 'An unexpected error occurred. Please try again.' } };
  }

  redirect('/dashboard');
}

type LoginState = {
  error?: string;
} | null;

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'Email and password are required.' };
    }

    try {
        const user = await db.getUserByEmail(email);
        if (!user || !user.password_hash) {
            return { error: 'Invalid email or password.' };
        }

        const passwordMatch = await compare(password, user.password_hash);
        if (!passwordMatch) {
            return { error: 'Invalid email or password.' };
        }
        
        const sessionExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        cookies().set('session', user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: sessionExpires,
            path: '/',
        });

    } catch (e) {
        console.error(e);
        return { error: 'An unexpected error occurred.' };
    }

    redirect('/dashboard');
}

export async function logout() {
    cookies().delete('session');
    redirect('/login');
}
