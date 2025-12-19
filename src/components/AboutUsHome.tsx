
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export function AboutUsHome() {

    return (
        <section className="w-full py-8 md:py-12">
            <div className="container px-4 md:px-6">
                <Card className="promo-gradient-bg border-border/20">
                    <div className="grid md:grid-cols-5 items-center">
                        <div className="md:col-span-2 p-8 flex justify-center">
                           <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-lg overflow-hidden">
                                <Image 
                                    src="https://picsum.photos/seed/about-us/400/400"
                                    alt="Flaventure Logo"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 256px"
                                />
                           </div>
                        </div>
                        <div className="md:col-span-3 p-8 text-center md:text-left">
                            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl text-black">What is Flaventure?</h2>
                            <p className="mt-4 text-slate-700 text-lg">
                                Flaventure is your passport to the world's most exciting flavors and adventures. Our mission is to bring you authentic stories, stunning photography, and practical guides to inspire your next journey.
                            </p>
                            <p className="mt-2 text-slate-700 text-lg">
                                Whether you're a seasoned globetrotter or a curious foodie, we've got something for you.
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
