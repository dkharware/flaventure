import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Logo = () => (
    <svg width="150" height="32" viewBox="0 0 150 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.98182 2.18182H23.0182C26.062 2.18182 28.5455 4.66527 28.5455 7.70909V19.9273C28.5455 22.9711 26.062 25.4545 23.0182 25.4545H10.8L4.25455 29.8182V7.70909C4.25455 4.66527 6.738 2.18182 9.70909 2.18182" fill="hsl(var(--primary-foreground))" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M9.70909 2.18182H23.0182C26.062 2.18182 28.5455 4.66527 28.5455 7.70909V8.5H20C19.8096 4.81455 16.195 2.18182 9.70909 2.18182Z" fill="hsl(var(--primary))"/>
      <text x="8" y="18" fontFamily="Poppins, sans-serif" fontSize="10" fontWeight="bold" fill="hsl(var(--primary))">CV</text>
      <text x="36" y="22" fontFamily="Poppins, sans-serif" fontSize="14" fontWeight="bold" fill="hsl(var(--foreground))">EasyFreeCV</text>
    </svg>
  );

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto py-12 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" aria-label="EasyFreeCV Home">
              <Logo />
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
              <Link href="#" aria-label="GitHub" className="hover:text-primary transition-all hover:-translate-y-1 block"><Github size={20} /></Link>
              <Link href="#" aria-label="Twitter" className="hover:text-primary transition-all hover:-translate-y-1 block"><Twitter size={20} /></Link>
              <Link href="#" aria-label="LinkedIn" className="hover:text-primary transition-all hover:-translate-y-1 block"><Linkedin size={20} /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} EasyFreeCV. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
