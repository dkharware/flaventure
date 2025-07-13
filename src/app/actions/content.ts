'use server';

import { db } from '@/lib/db';

export async function updateAboutContent(formData: FormData) {
  const newContent = {
    paragraph1: formData.get('paragraph1') as string,
    paragraph2: formData.get('paragraph2') as string,
    paragraph3: formData.get('paragraph3') as string,
    paragraph4: formData.get('paragraph4') as string,
  };

  try {
    await db.updateAboutContent(newContent);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to update content.' };
  }
}
