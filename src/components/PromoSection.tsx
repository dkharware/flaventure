
import Link from 'next/link';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowRight } from 'lucide-react';

export function PromoSection() {
    return (
        <section className="w-full py-12 md:py-16">
            <div className="container px-4 md:px-6">
                <Card className="overflow-hidden promo-gradient-bg border-border/20">
                    <div className="p-8 md:p-12 space-y-4 text-center">
                        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl text-foreground">Exclusive Offer Just For You</h2>
                        <p className="text-muted-foreground md:text-xl/relaxed max-w-2xl mx-auto">
                            Discover a curated selection of unique products and unmissable deals. Click the link to explore our partner's exclusive collection and find something special today.
                        </p>
                        <Button asChild size="lg" className="mt-4">
                            <Link href="https://otieu.com/4/10313318" target="_blank" rel="noopener sponsored">
                                Explore Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </Card>
            </div>
        </section>
    );
}
