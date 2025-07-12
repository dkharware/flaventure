import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">About ResumeFlow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Welcome to ResumeFlow, your ultimate partner in crafting the perfect professional resume. Our mission is to empower job seekers by providing them with intuitive, powerful, and beautifully designed tools to create resumes that stand out and open doors to new opportunities.
          </p>
          <p>
            We believe that everyone deserves a fair chance to showcase their skills and experience, regardless of their background or design expertise. That's why we've combined cutting-edge AI technology with a wide array of professionally designed templates. Whether you're a recent graduate, a seasoned executive, or a creative professional, ResumeFlow has the right tools to help you build a resume that truly reflects your potential.
          </p>
          <p>
            Our AI-powered content generator provides smart suggestions for skills, job descriptions, and even hobbies, tailored to your specific industry and the template you choose. This takes the guesswork out of resume writing and helps you articulate your strengths effectively.
          </p>
          <p>
            Thank you for choosing ResumeFlow. We're excited to be a part of your career journey!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
