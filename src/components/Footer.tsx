
import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import { Logo } from './Logo';

const QuoraIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 12.5a5 5 0 0 1-5 5A5 5 0 0 1 5 13a5 5 0 0 1 5-5h1.5" />
    <path d="M14.5 12.5a2.5 2.5 0 0 1 0-5h4a2.5 2.5 0 0 1 0 5h-4Z" />
    <path d="m19 12.5 2 4.5" />
    <path d="m9.5 7.5-1 4" />
  </svg>
);

const ShopifyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.33 5.432a2.394 2.394 0 00-2.3-2.16H6.97c-1.28.005-2.313.9-2.33 2.16l-.33 13.065a.65.65 0 00.65.663h14.08a.65.65 0 00.65-.663l-.36-13.065zM9.03 14.868c-.03.22-.18.39-.4.43h-.04a.43.43 0 01-.43-.47l.45-6.918a.42.42 0 01.42-.4h.04c.22.04.38.21.4.43l-.44 6.928zm3.62-4.146c-1.34 0-2.43 1-2.43 2.227 0 1.226 1.09 2.226 2.43 2.226s2.43-1 2.43-2.226c0-1.226-1.09-2.227-2.43-2.227zm5.61 4.146c-.03.22-.18.39-.4.43h-.04a.43.43 0 01-.43-.47l.45-6.918a.42.42 0 01.42-.4h.04c.22.04.38.21.4.43l-.44 6.928z" />
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
