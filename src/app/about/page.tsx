
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github, Download } from 'lucide-react';
import Link from 'next/link';

export default async function AboutPage() {
  const authorName = "Alex Doe";
  const authorTitle = "Founder, Lead Writer & Chief Explorer";
  const authorEmail = "hello@flaventure.com";
  const resumeUrl = "#";

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 md:px-6 space-y-12">
      <Card className="max-w-4xl mx-auto bg-background/50 backdrop-blur-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-headline">About Flaventure</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
            Your trusted guide to the world's most delicious destinations and exciting adventures.
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none text-muted-foreground text-base">
            <p>
                Flaventure is a celebration of global cultures, told through the universal languages of food and travel. We believe that the best way to understand a place is to taste it, and the greatest adventures often begin with a single bite. Our mission is to inspire you to explore the world, one delicious meal at a time.
            </p>
            <p>
                From hidden street food stalls in bustling cities to serene culinary retreats, we bring you authentic stories, practical travel tips, and mouth-watering recipes to fuel your wanderlust.
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
                    To inspire curious travelers to connect with the world through authentic food experiences. We provide the stories, guides, and encouragement to help you embark on your own flavorful adventures, responsibly and respectfully.
                </p>
            </div>
            <div>
                <h3 className="text-xl font-headline text-foreground mt-0">Our Vision</h3>
                <p className="text-muted-foreground">
                   To build a global community of food-loving adventurers who share a passion for exploration and cultural understanding. We envision a world where travel is a gateway to connection, and every meal tells a story.
                </p>
            </div>
        </CardContent>
      </Card>

      <Card className="max-w-4xl mx-auto bg-background/50 backdrop-blur-lg">
        <CardHeader className="text-center">
           <CardTitle className="text-3xl font-headline">About the Author</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center text-center">
            <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/10">
                <AvatarImage src="https://picsum.photos/seed/author/200/200" alt={authorName} />
                <AvatarFallback>{authorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <h3 className="text-2xl font-headline">{authorName}</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">{authorTitle}</p>
            <div className="flex justify-center gap-3 pt-4">
                <Button variant="outline" size="icon" asChild>
                    <a href={`mailto:${authorEmail}`} aria-label="Email"><Mail className="h-4 w-4" /></a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github className="h-4 w-4" /></a>
                </Button>
            </div>
            <div className="prose dark:prose-invert max-w-2xl mx-auto text-left text-base text-muted-foreground mt-8">
                <p>
                    I’m a lifelong traveler with an insatiable appetite for discovery. I created Flaventure to share my passion for exploring the world's cultures through food and to help others find their own unforgettable adventures.
                </p>
                <ul>
                    <li><strong>Passions:</strong> Street Food, Landscape Photography, Cultural History</li>
                    <li><strong>Favorite Destinations:</strong> Southeast Asia, the Mediterranean Coast, and anywhere with a bustling morning market.</li>
                </ul>
                <p>
                    Through this platform, I aim to provide the practical insights and inspiration I wish I had when I first started exploring the world.
                </p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
