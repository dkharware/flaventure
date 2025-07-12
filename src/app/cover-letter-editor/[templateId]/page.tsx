
import CoverLetterEditor from '@/components/CoverLetterEditor';
import { notFound } from 'next/navigation';

const availableTemplates = [
  'cover-letter-professional', 
  'cover-letter-modern', 
  'cover-letter-creative'
];

export default function CoverLetterEditorPage({ params }: { params: { templateId: string } }) {
  if (!availableTemplates.includes(params.templateId)) {
    notFound();
  }

  return <CoverLetterEditor templateId={params.templateId} />;
}
