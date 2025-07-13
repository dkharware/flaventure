import CoverLetterEditor from '@/components/CoverLetterEditor';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const availableTemplates = [
  'cover-letter-professional', 
  'cover-letter-modern', 
  'cover-letter-creative'
];

export async function generateMetadata({ params }: { params: { templateId: string } }): Promise<Metadata> {
  const templateName = params.templateId.replace('cover-letter-', '').replace('-', ' ');
  const titleCasedTemplateName = templateName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    title: `CV Letter Builder - ${titleCasedTemplateName} Template | easyfreecv`,
    description: `Create a professional CV letter for free using our ${titleCasedTemplateName} example template with the easyfreecv resume builder.`,
  };
}

export default function CoverLetterEditorPage({ params }: { params: { templateId: string } }) {
  if (!availableTemplates.includes(params.templateId)) {
    notFound();
  }

  return <CoverLetterEditor templateId={params.templateId} />;
}
