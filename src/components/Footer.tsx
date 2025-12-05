
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
        <path d="M11.025 21.053C4.943 21.053 0 16.29 0 10.526C0 4.763 4.943 0 11.025 0C15.22 0 18.92 2.378 20.948 5.895C21.51 6.842 22 7.85 22 8.947C22 10.842 20.66 12.316 18.92 12.316C17.842 12.316  ओपन 12.053C16.59 11.684 15.643 11.053 14.886 10.21L14.737 10.316C14.737 10.316 14.737 10.421 14.886 10.632C15.264 11.158 15.825 11.684 16.59 12.105C17.207 12.421 17.964 12.632 18.72 12.632C19.05 12.632 19.38 12.526 19.71 12.421L21.378 17.579C21.048 17.684 20.718 17.684 20.388 17.684C19.38 17.684 18.522 17.263 17.816 16.421L14.737 12.105C13.297 14.053 12.105 15.053 10.764 15.053C10.29 15.053 9.96 14.947 9.555 14.737L8.608 18.421C8.757 18.526 8.907 18.526 9.132 18.526C10.08 18.526 11.174 18 12.254 16.947L14.364 19.684C13.518 20.526 12.326 21.053 11.025 21.053Z" />
    </svg>
);

const ShopifyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        {...props}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 48 48" 
        fill="currentColor"
    >
        <path d="M35.3,10.4c-2.7-2.6-6.4-4.1-10.3-4.1c-8.1,0-14.7,6.6-14.7,14.7c0,4.4,1.9,8.4,5,11.4c0.5,0.4,1,0.8,1.4,1.2  c-1.3,0.5-2.7,0.8-4.2,0.8c-7.2,0-13.1-5.9-13.1-13.1c0-7.2,5.9-13.1,13.1-13.1c3.9,0,7.4,1.7,9.8,4.5c0.5-2.2,2.6-3.8,5-3.8  c2.8,0,5.1,2.3,5.1,5.1C39.4,13,35.3,10.4,35.3,10.4z" />
        <path d="M37,16.5c-0.8-0.6-1.7-1-2.7-1.2c-0.1,0-0.1-0.1-0.2-0.1c-1.1-0.5-2.2-0.8-3.4-0.8c-4.1,0-7.5,3.2-7.9,7.3  c-0.1,0.7,0.4,1.3,1.1,1.4c0.7,0.1,1.3-0.4,1.4-1.1c0.3-2.9,2.8-5.2,5.7-5.2c0.9,0,1.8,0.2,2.5,0.6c0.6,0.3,1.3-0.1,1.5-0.7  C38.3,17,37.8,16.4,37,16.5z" />
        <path d="M28.4,26.2c-2.4,0-4.4,2-4.4,4.4c0,2.4,2,4.4,4.4,4.4c2.4,0,4.4-2,4.4-4.4C32.8,28.2,30.8,26.2,28.4,26.2z" />
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
                <QuoraIcon className="h-5 w-5 text-red-700" />
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
