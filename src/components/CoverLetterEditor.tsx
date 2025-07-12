
'use client';

import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Download } from 'lucide-react';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';

const CoverLetterPreview = React.forwardRef<HTMLDivElement, { formData: any }>(({ formData }, ref) => {
    return (
        <div ref={ref}>
            <Card>
                <CardContent className="p-8">
                    <div className="prose prose-sm max-w-none">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="font-bold text-lg">{formData.fullName}</h2>
                            <p>{formData.email}</p>
                            <p>{formData.phone}</p>
                        </div>
                        <p>{formData.date}</p>
                    </div>
                    
                    <div className="mt-8">
                        <p className="font-semibold">{formData.hiringManager}</p>
                        <p>{formData.companyName}</p>
                        <p>{formData.companyAddress}</p>
                    </div>

                    <div className="mt-8 whitespace-pre-wrap">
                        {formData.letterBody}
                    </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
});
CoverLetterPreview.displayName = 'CoverLetterPreview';


export default function CoverLetterEditor({ templateId }: { templateId: string }) {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    hiringManager: 'Jane Smith',
    companyName: 'Tech Innovations Inc.',
    companyAddress: '123 Tech Street, Silicon Valley, CA 94000',
    letterBody: `Dear ${'Jane Smith'},\n\nI am writing to express my keen interest in the Software Engineer position at ${'Tech Innovations Inc.'}, which I saw advertised on LinkedIn. With my background in developing scalable web applications and my passion for innovative technology, I am confident that I would be a valuable asset to your team.\n\nThank you for considering my application. I have attached my resume for your review and look forward to the possibility of discussing this opportunity further.\n\nSincerely,\n${'John Doe'}`,
  });

  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'cover-letter',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-81px)]">
      <div className="p-6 border-r overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle>Cover Letter Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hiringManager">Hiring Manager Name</Label>
              <Input id="hiringManager" name="hiringManager" value={formData.hiringManager} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="companyAddress">Company Address</Label>
              <Input id="companyAddress" name="companyAddress" value={formData.companyAddress} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="letterBody">Letter Body</Label>
              <Textarea id="letterBody" name="letterBody" value={formData.letterBody} onChange={handleChange} rows={15} />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="p-4 lg:p-8 overflow-y-auto bg-gray-100">
        <div className="sticky top-0">
          <div className="flex justify-end mb-4">
            <button onClick={handlePrint} className={cn(buttonVariants())}>
                <Download className="mr-2 h-4 w-4" /> Download PDF
            </button>
          </div>
          
          {/* Hidden printable component */}
          <div className="absolute top-0 left-0 -z-10 opacity-0 pointer-events-none">
            <CoverLetterPreview ref={componentRef} formData={formData} />
          </div>

          {/* Visible preview */}
          <CoverLetterPreview formData={formData} ref={null}/>

        </div>
      </div>
    </div>
  );
}
