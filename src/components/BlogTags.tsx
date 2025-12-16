
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Badge } from './ui/badge';
import { getAllTags } from '@/lib/shopify';
import placeholderTags from '@/lib/placeholder-tags.json';

interface Tag {
    name: string;
    count: number;
}

export async function BlogTags() {
    let tags: Tag[] = [];
    const hasApiKeys = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN && process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN && !process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN.includes('your-store-name');

    try {
        if (hasApiKeys) {
            const liveTags = await getAllTags();
            if (liveTags.length > 0) {
                tags = liveTags;
            } else {
                tags = placeholderTags;
            }
        } else {
            tags = placeholderTags;
        }
    } catch (error) {
        console.error("Failed to fetch live tags, using placeholders.", error);
        tags = placeholderTags;
    }


    if (!tags || tags.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-4 border-b bg-background">
            <div className="container px-4 md:px-6">
                <div className="mx-auto max-w-7xl">
                    <Carousel
                        opts={{
                            align: "start",
                            dragFree: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2">
                            {tags.map((tag, index) => (
                                <CarouselItem key={`${tag.name}-${index}`} className="basis-auto pl-2">
                                    <Link href={`/blog?tag=${encodeURIComponent(tag.name)}`} className="block group">
                                         <Badge variant="outline" className="text-sm px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                                            #{tag.name}
                                         </Badge>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
