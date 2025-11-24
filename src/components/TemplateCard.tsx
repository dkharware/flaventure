
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, PenSquare, Crown, Briefcase, Paintbrush, FileText, Sparkles, GraduationCap, Code, User, Mail, LucideProps } from 'lucide-react';
import type { Template } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import React from 'react';

interface TemplateCardProps extends Template {
  onPreview: (template: Template) => void;
}

const categoryIcons: { [key: string]: React.FC<LucideProps> } = {
  'Corporate': Briefcase,
  'Creative': Paintbrush,
  'Simple': FileText,
  'Modern': Sparkles,
  'Academic': GraduationCap,
  'Technical': Code,
  'Developer': Code,
  'Entry-Level': User,
  'Cover Letter': Mail,
};

export function TemplateCard({ onPreview, ...template }: TemplateCardProps) {
  const { id, name, category, hint, isPremium, price } = template;
  const isCoverLetter = category === 'Cover Letter';
  const editUrl = isCoverLetter ? `/cover-letter-editor/${id}` : `/editor/${id}`;
  const Icon = categoryIcons[category] || FileText;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-lg border flex flex-col">
      <CardContent className="p-4 bg-muted/30">
        <div className="relative overflow-hidden rounded-md shadow-lg aspect-[400/565] flex items-center justify-center bg-gray-50 group-hover:bg-primary/5 transition-all">
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
          <Icon className="w-24 h-24 text-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:text-primary/40" strokeWidth={1}/>
        </div>
      </CardContent>
      <div className="p-4 bg-card border-t flex-grow flex flex-col">
          <div className="flex-grow">
            <h3 className="font-headline font-semibold text-lg truncate">{name}</h3>
            <p className="text-sm text-muted-foreground">{category}</p>
          </div>
          <div className="flex gap-2 mt-4">
              <Button asChild className="w-full">
                <Link href={editUrl}>
                  <PenSquare className="mr-2 h-4 w-4" /> Use Template
                </Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={() => onPreview(template)}>
                <Eye className="mr-2 h-4 w-4" /> Preview
              </Button>
          </div>
        </div>
    </Card>
  );
}
