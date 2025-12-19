
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowRight } from 'lucide-react';

export function AboutUsHome() {
    const authorName = "Deepak Kharware";
    const authorTitle = "Shopify & Headless Commerce Expert";

    return (
        <section className="w-full py-12 md:py-16">
            <div className="container px-4 md:px-6">
                <Card className="promo-gradient-bg border-border/20">
                    <div className="grid md:grid-cols-5 items-center">
                        <div className="md:col-span-2 p-8">
                            <div className="relative aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                                <Image 
                                    src="https://5lgivccarqkvddiv.public.blob.vercel-storage.com/blob-2025-11-30%20at%2013.33.48.jpg"
                                    alt={authorName}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 30vw"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-3 p-8 text-center md:text-left">
                            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">About storedevguide</h2>
                            <p className="mt-4 text-muted-foreground text-lg">
                                I’m Deepak Kharware, a passionate Front-End Developer with over 5 years of experience specializing in Shopify and Headless Commerce. My goal is to share practical guides, in-depth tutorials, and free resources to help developers build better e-commerce experiences.
                            </p>
                            <p className="mt-2 text-muted-foreground text-lg">
                                From theme development to advanced API integrations, storedevguide is your expert resource for all things Shopify.
                            </p>
                            <Button asChild className="mt-6" size="lg">
                                <Link href="/about">
                                    Learn More <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
}
