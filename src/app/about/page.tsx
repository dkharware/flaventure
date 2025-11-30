
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Twitter, Github } from 'lucide-react';
import Link from 'next/link';

export default async function AboutPage() {
  const authorName = "Deepak Kharware";
  const authorTitle = "Front-End Developer | Shopify Specialist | Headless Commerce Expert | Team Lead";
  const authorEmail = "dkharware@gmail.com";

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/10">
            <AvatarImage src="https://picsum.photos/seed/dk/200" alt={authorName} />
            <AvatarFallback>{authorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-headline">{authorName}</CardTitle>
          <CardDescription className="text-base text-muted-foreground">{authorTitle}</CardDescription>
          <div className="flex justify-center gap-3 pt-4">
              <Button variant="outline" size="icon" asChild>
                  <a href={`mailto:${authorEmail}`} aria-label="Email"><Mail className="h-4 w-4" /></a>
              </Button>
               <Button variant="outline" size="icon" asChild>
                  <a href="https://www.linkedin.com/in/deepak-singh-kharware/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
              </Button>
               <Button variant="outline" size="icon" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
              </Button>
               <Button variant="outline" size="icon" asChild>
                  <a href="https://github.com/DesignerDeepakR" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github className="h-4 w-4" /></a>
              </Button>
          </div>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none text-muted-foreground text-base">
            <p>
                I’m a passionate Front-End Developer with 5+ years of experience building modern, high-performance, and user-friendly digital products. Over the last 3+ years, I’ve specialized deeply in Shopify and Headless Commerce, helping e-commerce brands create blazing-fast, scalable, and visually engaging online stores.
            </p>
            <p>
                I bring a strong mix of creativity, technical expertise, and strategic thinking to every project I work on.
            </p>
            
            <h3>🔥 Core Technical Skills</h3>
            <ul>
                <li><strong>Frontend:</strong> HTML, CSS, JavaScript, React, Next.js</li>
                <li><strong>Shopify:</strong> Liquid, Custom Themes, Shopify Apps, Storefront API</li>
                <li><strong>Headless Commerce:</strong> Headless Shopify with React/Next.js, Hydrogen, Oxygen</li>
                <li><strong>APIs & Integrations:</strong> GraphQL, REST APIs</li>
                <li><strong>Other Strengths:</strong> UI/UX best practices, Performance Optimization, Responsive Design</li>
            </ul>

            <h3>🧩 What I Do</h3>
            <p>
                With hands-on experience in headless Shopify architecture, Hydrogen storefronts, and advanced theme development, I help businesses create flexible e-commerce experiences that perform exceptionally well across all devices.
            </p>
            
            <h3>👨‍💼 Leadership</h3>
            <p>
                As a Front-End Team Lead, I’ve managed projects end-to-end, mentored developers, and ensured smooth and timely delivery—while maintaining clean, scalable, and maintainable code standards.
            </p>

            <h3>✍️ Knowledge Sharing</h3>
            <p>
                I also share Shopify, React, and headless development guides on my blog: <a href="https://storedevguide.com" target="_blank" rel="noopener noreferrer">storedevguide.com</a>
            </p>

            <h3>🚀 My Goal</h3>
            <p>
                I thrive on solving complex problems, improving performance, and transforming ideas into real digital experiences. I aim to collaborate on impactful projects, work with innovative teams, and continuously grow in the world of front-end and e-commerce development.
            </p>

            <div className="text-center border-t pt-6 mt-8">
                <h3 className="font-headline text-xl text-foreground">📩 Let’s Connect</h3>
                <p className="mt-2">
                    If you’re looking for someone who blends technical expertise with creative problem-solving to bring your digital vision to life—I’d love to collaborate!
                </p>
                <Button asChild className="mt-4" variant="outline" size="lg">
                    <a href={`mailto:${authorEmail}`}>Get in Touch</a>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
