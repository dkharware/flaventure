import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { updateAboutContent } from '@/app/actions/content';
import { revalidatePath } from 'next/cache';

export default async function AdminPage() {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get('admin-auth')?.value === 'true';

  if (!isAdmin) {
    redirect('/admin/login');
  }

  const content = await db.getAboutContent();

  async function handleUpdate(formData: FormData) {
    'use server';
    await updateAboutContent(formData);
    revalidatePath('/about');
    revalidatePath('/admin');
  }

  return (
    <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-headline">Admin Panel</CardTitle>
          <CardDescription>Welcome to the content management area.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleUpdate} className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Edit About Page Content</h3>
            <div className="space-y-2">
              <Label htmlFor="paragraph1">Paragraph 1</Label>
              <Textarea id="paragraph1" name="paragraph1" defaultValue={content.paragraph1} rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paragraph2">Paragraph 2</Label>
              <Textarea id="paragraph2" name="paragraph2" defaultValue={content.paragraph2} rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paragraph3">Paragraph 3</Label>
              <Textarea id="paragraph3" name="paragraph3" defaultValue={content.paragraph3} rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paragraph4">Paragraph 4</Label>
              <Textarea id="paragraph4" name="paragraph4" defaultValue={content.paragraph4} rows={4} />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
