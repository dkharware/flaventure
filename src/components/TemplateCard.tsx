import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import type { Template } from '@/lib/types';

export function TemplateCard({ id, name, category, imageUrl, hint }: Template) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 rounded-lg">
      <CardContent className="p-0">
        <div className="relative">
          <div className="absolute top-0 left-0 z-10">
            <div className="relative py-1 px-4 bg-primary text-primary-foreground text-sm font-semibold rounded-br-lg shadow-md">
              {name}
            </div>
          </div>
          <Link href={`/editor/${id}`} aria-label={`Use ${name} template`}>
            <Image
              src={imageUrl}
              data-ai-hint={hint}
              alt={`Resume template ${name}`}
              width={400}
              height={565}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button>
                <Eye className="mr-2 h-4 w-4" /> Use Template
              </Button>
            </div>
          </Link>
        </div>
        <div className="p-4 bg-card">
          <p className="text-sm text-primary font-semibold">{category}</p>
          <h3 className="font-headline font-semibold text-lg">{name}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
