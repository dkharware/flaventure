
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Logo } from './Logo';

export default function Footer() {
  return (
    <footer className="bg-background text-muted-foreground border-t">
      <div className="container mx-auto py-12 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" aria-label="easyfreecv Home">
              <Logo />
            </Link>
            <p className="text-sm">
              Discover insightful articles, tutorials, and the latest trends in our industry.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms-and-conditions" className="text-sm hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/site-map" className="text-sm hover:text-primary transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="GitHub" className="hover:text-primary transition-all hover:-translate-y-1 block"><Github size={20} /></Link>
              <Link href="#" aria-label="Twitter" className="hover:text-primary transition-all hover:-translate-y-1 block"><Twitter size={20} /></Link>
              <Link href="#" aria-label="LinkedIn" className="hover:text-primary transition-all hover:-translate-y-1 block"><Linkedin size={20} /></Link>
              <Link href="https://in.pinterest.com/easyfreecv/" aria-label="Pinterest" className="hover:text-primary transition-all hover:-translate-y-1 block">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                  <path d="M12.017 1.023c-5.48 0-9.91 4.43-9.91 9.91 0 4.194 2.582 7.85 6.22 9.25.04.07-.02.5-.03.55-.07.31-.4.32-.4.32-.21 0-.6-.2-1.02-.45-1.57-.93-2.1-2.9-2.2-3.8-.2-1.4-.7-2.9-.7-2.9S3.2 12.3 3.2 11c0-1.7.9-3 2.1-3 1.5 0 2.2 1.1 2.2 2.5 0 1.5-1 3.7-1.5 5.7-.4 1.6 1 2.8 2.6 2.8 3.1 0 4.6-3.8 4.6-7.2 0-3-2.2-5.1-5.3-5.1-3.6 0-5.8 2.7-5.8 5.4 0 .7.2 1.4.6 1.8.2.2.3.2.2.1-.1-.3-.2-1.1-.2-1.3 0-.5-.1-1-.4-1.3-.5-.6-1.2-.8-1.8-.8-1.5 0-2.8 1.5-2.8 3.4 0 1.3.5 2.6 1.1 3.3.1.1.1.2 0 .3-.2.3-.6.8-.7.9-.1.1-.2.2-.4.1-1.3-.3-2.2-2-2.2-3.5 0-3 2.3-6.2 6.8-6.2 3.6 0 6.5 2.5 6.5 5.9 0 3.7-2.2 6.5-5.3 6.5-1.1 0-2.2-.6-2.5-1.2 0 0-.5 2-.7 2.5-.3 1-1 2.2-1.5 2.8-.7.8-1.9.3-1.9.3a9.8 9.8 0 0 1-3.4-7.8c0-5.48 4.43-9.91 9.91-9.91z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} easyfreecv. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
