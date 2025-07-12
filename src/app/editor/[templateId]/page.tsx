import Editor from '@/components/Editor';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const availableTemplates = [
  'professional', 'creative', 'modern', 'minimalist',
  'bold', 'classic', 'tech', 'simple', 'academic', 'infographic',
  'entry-level', 'executive', 'developer', 'sales', 'portfolio',
  'two-column', 'timeline', 'compact'
];

export async function generateMetadata({ params }: { params: { templateId: string } }): Promise<Metadata> {
  const templateName = params.templateId.charAt(0).toUpperCase() + params.templateId.slice(1);
  return {
    title: `Create Free Resume - ${templateName} Template | EasyFreeCV`,
    description: `Use the ${templateName} template to build your free resume or CV. Our editor makes it easy to create a professional CV.`,
  };
}

export default function EditorPage({ params }: { params: { templateId: string } }) {
  if (!availableTemplates.includes(params.templateId)) {
    notFound();
  }

  return (
    <div className="container mx-auto py-2">
      <Editor templateId={params.templateId} />
    </div>
  );
}
