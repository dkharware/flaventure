'use server';

import { put } from '@vercel/blob';
import { db } from '@/lib/db';

export async function uploadFile(type: 'resume' | 'cover_letter', fileContent: string, fileName: string) {
  try {
    // The file content is already a base64 data URI, so we can pass it directly
    const blob = await put(fileName, Buffer.from(fileContent.split(',')[1], 'base64'), {
      access: 'public',
      contentType: 'application/pdf',
    });

    if (type === 'resume') {
      await db.addResume({ url: blob.url, name: fileName, createdAt: new Date() });
    } else {
      await db.addCoverLetter({ url: blob.url, name: fileName, createdAt: new Date() });
    }
    
    return { url: blob.url };

  } catch (error) {
    console.error('Error uploading file:', error);
    return { error: 'Failed to upload file.' };
  }
}
