
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Fragment } from 'react';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center space-x-1 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            <li>
              {item.href ? (
                <Link href={item.href} className="hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-foreground">{item.label}</span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
