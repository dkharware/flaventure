
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Template } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';

interface TemplatePreviewModalProps {
  template: Template;
  onClose: () => void;
}

export function TemplatePreviewModal({ template, onClose }: TemplatePreviewModalProps) {
  const { id, name, category, imageUrl, hint } = template;
  const isCoverLetter = category === 'Cover Letter';
  const editUrl = isCoverLetter ? `/cover-letter-editor/${id}` : `/editor/${id}`;

  return (
    <Dialog open={!!template} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>{category} Template</DialogDescription>
        </DialogHeader>
        <div className="my-4">
          <Image
            src={imageUrl}
            data-ai-hint={hint}
            alt={`Preview of ${name} template`}
            width={800}
            height={1130}
            className="w-full h-auto object-contain rounded-md border"
          />
        </div>
        <DialogFooter>
          <Button asChild size="lg">
            <Link href={editUrl}>
              <PenSquare className="mr-2 h-4 w-4" /> Use This Template
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
