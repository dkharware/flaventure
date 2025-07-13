import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AdminPage() {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get('admin-auth')?.value === 'true';

  if (!isAdmin) {
    redirect('/admin/login');
  }

  return (
    <div className="container mx-auto py-8 px-4 md:py-12 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-headline">Admin Panel</CardTitle>
          <CardDescription>Welcome to the content management area.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is where you'll be able to edit your website's content. More features coming soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
