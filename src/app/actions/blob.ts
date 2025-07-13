'use server';

import { supabase } from '@/lib/supabase';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

function dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}


export async function uploadFile(type: 'resume' | 'cover_letter', fileContent: string, fileName: string) {
  const cookieStore = cookies();
  const userId = cookieStore.get('session')?.value;

  if (!userId) {
      return { error: 'User not authenticated.' };
  }
    
  try {
    const blob = dataURItoBlob(fileContent);
    const bucket = type === 'resume' ? 'resumes' : 'cover_letters';
    const filePath = `${userId}/${fileName}`;

    const { data, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, blob, {
        cacheControl: '3600',
        upsert: true,
        contentType: 'application/pdf',
      });

    if (uploadError) {
      throw uploadError;
    }
    
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);

    if (type === 'resume') {
      await db.addResume({ url: publicUrl, name: fileName, userId });
    } else {
      await db.addCoverLetter({ url: publicUrl, name: fileName, userId });
    }
    
    return { url: publicUrl };

  } catch (error) {
    console.error('Error uploading file:', error);
    return { error: 'Failed to upload file.' };
  }
}
