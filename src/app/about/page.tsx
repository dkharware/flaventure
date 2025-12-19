
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github, Download } from 'lucide-react';
import Link from 'next/link';

export default async function AboutPage() {
  const authorName = "Deepak Kharware";
  const authorTitle = "Front-End Developer | Shopify Specialist | Headless Commerce Expert | Team Lead";
  const authorEmail = "dkharware@gmail.com";
  const resumeUrl = "https://5lgivccarqkvddiv.public.blob.vercel-storage.com/Resume.pdf";

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 space-y-12">
      <Card className="max-w-4xl mx-auto bg-background/50 backdrop-blur-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-headline">About storedevguide</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
            Your expert resource for everything Shopify and modern e-commerce development.
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none text-muted-foreground text-base">
            <p>
                storedevguide is a dedicated knowledge hub for developers, merchants, and agencies working with Shopify. Whether you're building a custom theme, diving into headless commerce with Next.js, or leveraging the latest AI tools for e-commerce, we provide comprehensive guides, in-depth tutorials, and ready-to-use resources to help you succeed.
            </p>
            <p>
                Our content covers a wide range of topics, from fundamental Liquid skills to advanced Storefront API integrations, always with a focus on best practices, performance, and scalability.
            </p>
        </CardContent>
      </Card>

       <Card className="max-w-4xl mx-auto bg-background/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-center">Our Mission & Vision</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none grid md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-xl font-headline text-foreground mt-0">Our Mission</h3>
                <p className="text-muted-foreground">
                    To empower developers and merchants by providing clear, actionable, and expert-backed content that demystifies Shopify development. We aim to be the go-to resource for building high-quality, performant, and scalable e-commerce solutions.
                </p>
            </div>
            <div>
                <h3 className="text-xl font-headline text-foreground mt-0">Our Vision</h3>
                <p className="text-muted-foreground">
                   To foster a community of skilled e-commerce developers who are equipped to build the future of online retail. We envision a world where any brand can achieve its digital potential through powerful, custom-built Shopify experiences.
                </p>
            </div>
        </CardContent>
      </Card>

      <Card className="max-w-4xl mx-auto bg-background/50 backdrop-blur-lg">
        <CardHeader className="text-center">
           <CardTitle className="text-3xl font-headline">About the Author</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 text-center">
                    <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/10">
                        <AvatarImage src="https://5lgivccarqkvddiv.public.blob.vercel-storage.com/White%20Minimalist%20Blog%20Tips%20Instagram%20Post.png" alt={authorName} />
                        <AvatarFallback>{authorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-2xl font-headline">{authorName}</h3>
                    <p className="text-sm text-muted-foreground">{authorTitle}</p>
                    <div className="flex justify-center gap-3 pt-4">
                        <Button variant="outline" size="icon" asChild>
                            <a href={`mailto:${authorEmail}`} aria-label="Email"><Mail className="h-4 w-4" /></a>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                            <a href="https://www.linkedin.com/in/deepak-singh-kharware/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                            <a href="https://github.com/dkharware" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github className="h-4 w-4" /></a>
                        </Button>
                    </div>
                </div>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground text-base">
                    <p>
                        I’m a passionate Front-End Developer with 5+ years of experience specializing in Shopify and Headless Commerce. I created storedevguide to share my knowledge and help others navigate the complexities of e-commerce development.
                    </p>
                    <ul>
                        <li><strong>Frontend:</strong> React, Next.js, HTML, CSS, JavaScript</li>
                        <li><strong>Shopify:</strong> Liquid, Custom Themes, Hydrogen, Storefront API</li>
                        <li><strong>Expertise:</strong> Headless Commerce, Performance Optimization, UI/UX</li>
                    </ul>
                    <p>
                        Through this platform, I aim to provide the practical insights and tools I wish I had when I started my journey.
                    </p>
                     <Button asChild className="mt-4 no-underline">
                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download>
                            <Download className="mr-2 h-4 w-4" />
                            Download Resume
                        </a>
                    </Button>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
