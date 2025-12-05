
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
