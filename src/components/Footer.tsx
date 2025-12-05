
import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import { Logo } from './Logo';

const QuoraIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
    >
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.302 0-9.6-4.298-9.6-9.6S6.698 2.4 12 2.4s9.6 4.298 9.6 9.6-4.298 9.6-9.6 9.6zm-1.2-5.04h2.4v-4.8H9.6v-2.4h6V14.4h-2.4v4.8h-2.4v-4.8z" />
    </svg>
);

const ShopifyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        {...props}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path d="M19.387 5.613c-2.34-2.34-5.58-3.613-8.887-3.613-7.108 0-10.5 5.76-10.5 5.76l.019.032c-.01.018-.02.035-.03.054V7.8h3v3.75s2.4-4.5 7.5-4.5c2.25 0 4.35 1.05 5.85 2.55l-2.4 2.4c-.9-1.05-2.25-1.65-3.6-1.65-3.6 0-5.25 3.3-5.25 3.3s.15-.3.3-.6c.9-1.5 2.7-2.4 4.65-2.4 1.2 0 2.25.45 3.15 1.35l2.4-2.4zM24 11.25c0-4.24-4.22-4.5-4.22-4.5-.064.04-.127.08-.19.123v-1.87c0-2.85-2.4-5.25-5.25-5.25s-5.25 2.4-5.25 5.25v2.003c-1.488 1.135-2.484 2.87-2.484 4.847 0 3.52 2.98 6.45 6.6 6.45 3.203 0 5.85-2.203 6.45-5.1h-4.05c-.45 0-.75-.3-.75-.75s.3-.75.75-.75h5.55v-1.05h-1.95c-.3 0-.6-.15-.75-.3s-.15-.45-.15-.6v-.15c.15-1.95 1.8-3.45 3.75-3.45zM12 11.25c-2.4 0-4.35 1.95-4.35 4.35s1.95 4.35 4.35 4.35 4.35-1.95 4.35-4.35-1.95-4.35-4.35-4.35z"/>
    </svg>
);


export default function Footer() {
  return (
    <footer className="bg-background text-muted-foreground border-t">
      <div className="container mx-auto py-12 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" aria-label="storedevguide Home">
              <Logo width={136} height={51} />
            </Link>
            <p className="text-sm">
              Explore in-depth articles on Shopify themes, headless commerce, and e-commerce development.
            </p>
             <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/storedevguide/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.quora.com/profile/StoreDevGuide" target="_blank" rel="noopener noreferrer" aria-label="Quora" className="hover:text-primary transition-colors">
                <QuoraIcon className="h-5 w-5" />
              </a>
              <a href="https://community.shopify.com/u/dkharware/" target="_blank" rel="noopener noreferrer" aria-label="Shopify Community" className="hover:text-primary transition-colors">
                <ShopifyIcon className="h-5 w-5" />
              </a>
            </div>
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
            <h3 className="font-bold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/shopify-liquid-cheatsheet" className="text-sm hover:text-primary transition-colors">Liquid Cheatsheet</Link></li>
              <li><Link href="/tutorials/shopify-api-guide" className="text-sm hover:text-primary transition-colors">API Guide</Link></li>
               <li><Link href="/tools/meta-tag-generator" className="text-sm hover:text-primary transition-colors">Shopify Tools</Link></li>
              <li><Link href="/blog?tag=Shopify" className="text-sm hover:text-primary transition-colors">Shopify Articles</Link></li>
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
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} storedevguide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
