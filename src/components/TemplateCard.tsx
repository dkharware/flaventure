import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, PenSquare, Crown } from 'lucide-react';
import type { Template } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

export function TemplateCard({ id, name, category, imageUrl, hint, isPremium, price }: Template) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-lg border">
      <CardContent className="p-4 bg-muted/30">
        <div className="relative overflow-hidden rounded-md shadow-lg">
           <div className="absolute top-3 left-3 z-10">
             <Badge variant={isPremium ? "default" : "secondary"} className="shadow-md text-xs">
              {isPremium ? <><Crown className="w-3 h-3 mr-1" /> Premium</> : 'Free'}
             </Badge>
          </div>
           {isPremium && (
            <div className="absolute top-3 right-3 z-10">
              <Badge variant="destructive" className="text-sm font-bold shadow-md">
                ₹{price}
              </Badge>
            </div>
          )}
          <Image
            src={imageUrl}
            data-ai-hint={hint}
            alt={`Resume template ${name}`}
            width={400}
            height={565}
            className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
      </CardContent>
      <div className="p-4 bg-card border-t">
          <h3 className="font-headline font-semibold text-lg truncate">{name}</h3>
          <p className="text-sm text-muted-foreground">{category}</p>
          <div className="flex gap-2 mt-4">
              <Button asChild className="w-full">
                <Link href={`/editor/${id}`}>
                  <PenSquare className="mr-2 h-4 w-4" /> Use Template
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                 <Link href="#">
                    <Eye className="mr-2 h-4 w-4" /> Preview
                </Link>
              </Button>
          </div>
        </div>
    </Card>
  );
}
