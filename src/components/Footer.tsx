
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Logo } from './Logo';

export default function Footer() {
  return (
    <footer className="bg-background text-muted-foreground border-t">
      <div className="container mx-auto py-12 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" aria-label="shopifydevguide Home">
              <Logo width={136} height={51} />
            </Link>
            <p className="text-sm">
              Explore in-depth articles on Shopify themes, headless commerce, and e-commerce development.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/blog?tag=Shopify" className="text-sm hover:text-primary transition-colors">Shopify</Link></li>
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
              <Link href="https://github.com/dkharware" aria-label="GitHub" className="hover:text-primary transition-all hover:-translate-y-1 block"><Github size={20} /></Link>
              <Link href="https://www.linkedin.com/in/deepak-singh-kharware/" aria-label="LinkedIn" className="hover:text-primary transition-all hover:-translate-y-1 block"><Linkedin size={20} /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} shopifydevguide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
