import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const links = [
  { href: '/', label: 'Home' },
  { href: '/templates', label: 'Resume Templates' },
  { href: '/editor/professional', label: 'Create Resume' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-and-conditions', label: 'Terms & Conditions' },
];

export default function SitemapPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Sitemap</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc list-inside">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-primary hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
