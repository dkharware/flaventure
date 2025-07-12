import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function Header() {
  return (
    <header className="py-4 px-6 md:px-10 bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2" aria-label="ResumeFlow Home">
          <FileText className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-headline font-bold text-foreground">ResumeFlow</h1>
        </Link>
      </div>
    </header>
  );
}
