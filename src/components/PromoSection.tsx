
import Link from 'next/link';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function PromoSection() {
    return (
        <section className="w-full py-12 md:py-16">
            <div className="container px-4 md:px-6">
                <Card className="overflow-hidden bg-background/50 backdrop-blur-lg">
                    <div className="grid md:grid-cols-2 items-center gap-8">
                        <div className="relative h-64 md:h-full w-full">
                            <Image 
                                src="https://picsum.photos/seed/promo-section/800/600"
                                alt="Promotional offer banner"
                                fill
                                className="object-cover"
                                data-ai-hint="promotional banner"
                            />
                        </div>
                        <div className="p-8 space-y-4 text-center md:text-left">
                            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Exclusive Offer Just For You</h2>
                            <p className="text-muted-foreground md:text-xl/relaxed">
                                Discover a curated selection of unique products and unmissable deals. Click the link to explore our partner's exclusive collection and find something special today.
                            </p>
                            <Button asChild size="lg" className="mt-4">
                                <Link href="https://otieu.com/4/10313318" target="_blank" rel="noopener sponsored">
                                    Explore Now <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
}
