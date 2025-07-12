import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Crown } from 'lucide-react';
import type { Template } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

export function TemplateCard({ id, name, category, imageUrl, hint, isPremium, price }: Template) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 rounded-lg">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <div className="absolute top-2 left-2 z-10">
             <Badge variant={isPremium ? "default" : "secondary"} className="shadow-md">
              {isPremium ? <><Crown className="w-3 h-3 mr-1" /> Premium</> : 'Free'}
             </Badge>
          </div>
           {isPremium && (
            <div className="absolute top-2 right-2 z-10">
              <Badge variant="destructive" className="text-lg font-bold shadow-md">
                ₹{price}
              </Badge>
            </div>
          )}
          <Link href={`/editor/${id}`} aria-label={`Use ${name} template`}>
            <Image
              src={imageUrl}
              data-ai-hint={hint}
              alt={`Resume template ${name}`}
              width={400}
              height={565}
              className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button>
                <Eye className="mr-2 h-4 w-4" /> {isPremium ? "Preview" : "Use Template"}
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
