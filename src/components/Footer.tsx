
import Link from 'next/link';
import { Logo } from './Logo';

const socialLinks = [
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/company/storedevguide/?viewAsMember=true',
    },
    {
        name: 'Quora',
        url: 'https://www.quora.com/profile/StoreDevGuide',
    },
    {
        name: 'Shopify Community',
        url: 'https://community.shopify.com/u/dkharware/',
    }
];

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
        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-muted-foreground mb-4 md:mb-0">&copy; {new Date().getFullYear()} storedevguide. All rights reserved.</p>
             <div className="flex flex-wrap gap-x-4 gap-y-2">
                {socialLinks.map(link => (
                     <a 
                        key={link.name}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label={link.name} 
                        className="text-sm hover:text-primary transition-colors font-medium"
                    >
                        {link.name}
                    </a>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
}
