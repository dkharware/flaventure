import Editor from '@/components/Editor';
import { notFound } from 'next/navigation';

const availableTemplates = ['professional', 'creative', 'modern', 'minimalist'];

export default function EditorPage({ params }: { params: { templateId: string } }) {
  if (!availableTemplates.includes(params.templateId)) {
    notFound();
  }

  return <Editor templateId={params.templateId} />;
}
