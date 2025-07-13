
import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

export const db = {
  // User methods
  getUsers: async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return data;
  },
  getUserById: async (id: string) => {
    const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        throw error;
    }
    return data;
  },
  getUserByEmail: async (email: string) => {
    const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
    if (error && error.code !== 'PGRST116') {
        throw error;
    }
    return data;
  },
  createUser: async (userData: { fullName: string; email: string; passwordHash: string }) => {
    const newUser = { 
        id: uuidv4(), 
        full_name: userData.fullName, 
        email: userData.email, 
        password_hash: userData.passwordHash 
    };
    const { data, error } = await supabase.from('users').insert(newUser).select().single();
    if (error) throw error;
    // Map snake_case from db to camelCase for app consistency
    return { ...data, fullName: data.full_name, passwordHash: data.password_hash };
  },

  // Resume methods
  getResumes: async (userId: string) => {
    const { data, error } = await supabase.from('resumes').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) throw error;
    // Map snake_case to camelCase
    return data.map(r => ({...r, createdAt: r.created_at}));
  },
  addResume: async (resume: { url: string; name: string; userId: string }) => {
    const { data, error } = await supabase.from('resumes').insert({ ...resume, user_id: resume.userId });
    if (error) throw error;
    return data;
  },
  
  // Cover Letter methods
  getCoverLetters: async (userId: string) => {
    const { data, error } = await supabase.from('cover_letters').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) throw error;
    // Map snake_case to camelCase
    return data.map(cl => ({...cl, createdAt: cl.created_at}));
  },
  addCoverLetter: async (coverLetter: { url: string; name: string; userId: string }) => {
    const { data, error } = await supabase.from('cover_letters').insert({ ...coverLetter, user_id: coverLetter.userId });
    if (error) throw error;
    return data;
  },

  // Admin methods
  getAboutContent: async () => {
    const { data, error } = await supabase.from('site_content').select('content').eq('key', 'about_page').single();
    if (error) throw error;
    return data.content;
  },
  updateAboutContent: async (newContent: any) => {
    const { data, error } = await supabase.from('site_content').update({ content: newContent }).eq('key', 'about_page');
    if (error) throw error;
    return data;
  },
  
  getAdminPasswordHash: async () => {
     const { data, error } = await supabase.from('site_content').select('content').eq('key', 'admin_password').single();
     if (error) throw error;
     return data.content.passwordHash;
  }
};
