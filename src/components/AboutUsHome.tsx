
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export function AboutUsHome() {

    return (
        <section className="w-full py-12 md:py-16">
            <div className="container px-4 md:px-6">
                <Card className="promo-gradient-bg border-border/20">
                    <div className="grid md:grid-cols-5 items-center">
                        <div className="md:col-span-2 p-8 flex justify-center">
                           <div className="relative w-48 h-48">
                                <Image 
                                    src="https://5lgivccarqkvddiv.public.blob.vercel-storage.com/newlogo.webp"
                                    alt="storedevguide Logo"
                                    fill
                                    className="object-contain"
                                    sizes="200px"
                                />
                           </div>
                        </div>
                        <div className="md:col-span-3 p-8 text-center md:text-left">
                            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">What is storedevguide?</h2>
                            <p className="mt-4 text-muted-foreground text-lg">
                                storedevguide is a dedicated resource hub for Shopify developers, agencies, and merchants. Our mission is to provide high-quality tutorials, in-depth guides, and free tools to help you build better, faster, and more scalable e-commerce experiences.
                            </p>
                            <p className="mt-2 text-muted-foreground text-lg">
                                Whether you're working with themes, diving into headless commerce, or exploring AI, we've got you covered.
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
