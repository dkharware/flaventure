
import Link from 'next/link';
import { Logo } from './Logo';

const socialLinks = [
    {
        name: 'Instagram',
        url: '#',
    },
    {
        name: 'Facebook',
        url: '#',
    },
    {
        name: 'Pinterest',
        url: '#',
    }
];

export default function Footer() {
  return (
    <footer className="bg-background/95 backdrop-blur-lg border-t">
      <div className="container mx-auto py-8 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" aria-label="Flaventure Home">
              <Logo width={136} height={51} />
            </Link>
            <p className="text-sm text-muted-foreground">
              Your passport to the world's most exciting flavors and adventures.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

           <div>
            <h3 className="font-bold text-foreground mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="/blog?tag=travel%20guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">Travel Guide</Link></li>
              <li><Link href="/blog?tag=Adventure" className="text-sm text-muted-foreground hover:text-primary transition-colors">Adventure</Link></li>
              <li><Link href="/blog?tag=Famous%20Food" className="text-sm text-muted-foreground hover:text-primary transition-colors">Famous Food</Link></li>
              <li><Link href="/blog?tag=Must-Visit%20Places" className="text-sm text-muted-foreground hover:text-primary transition-colors">Must-Visit Places</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms-and-conditions" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Disclaimer</Link></li>
              <li><Link href="/site-map" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/10 flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-muted-foreground mb-4 md:mb-0">&copy; {new Date().getFullYear()} Flaventure. All rights reserved.</p>
             <div className="flex flex-wrap gap-x-4 gap-y-2">
                {socialLinks.map(link => (
                     <a 
                        key={link.name}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label={link.name} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
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
