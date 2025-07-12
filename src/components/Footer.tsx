import Link from 'next/link';
import { FileText, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto py-12 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" aria-label="ResumeFlow Home">
              <FileText className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-headline font-bold text-foreground">ResumeFlow</h1>
            </Link>
            <p className="text-sm">
              Craft your professional resume in minutes with our AI-powered builder and beautiful templates.
            </p>
          </div>
          
          <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms-and-conditions" className="text-sm hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/sitemap" className="text-sm hover:text-primary transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-semibold text-foreground mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="GitHub" className="hover:text-primary transition-colors"><Github size={20} /></Link>
              <Link href="#" aria-label="Twitter" className="hover:text-primary transition-colors"><Twitter size={20} /></Link>
              <Link href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors"><Linkedin size={20} /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ResumeFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
