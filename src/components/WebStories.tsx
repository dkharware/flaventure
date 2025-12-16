
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const stories = [
    { title: "Intro to Headless", imageUrl: "https://picsum.photos/seed/story1/300/500", href: "#", dataAiHint: "code interface" },
    { title: "Shopify API Tricks", imageUrl: "https://picsum.photos/seed/story2/300/500", href: "#", dataAiHint: "data diagram" },
    { title: "Performance Wins", imageUrl: "https://picsum.photos/seed/story3/300/500", href: "#", dataAiHint: "speed dashboard" },
    { title: "Liquid Cheatsheet", imageUrl: "https://picsum.photos/seed/story4/300/500", href: "#", dataAiHint: "code snippet" },
    { title: "AI in E-commerce", imageUrl: "https://picsum.photos/seed/story5/300/500", href: "#", dataAiHint: "robot shopping" },
    { title: "Styling with Tailwind", imageUrl: "https://picsum.photos/seed/story6/300/500", href: "#", dataAiHint: "design palette" },
    { title: "Next.js & Shopify", imageUrl: "https://picsum.photos/seed/story7/300/500", href: "#", dataAiHint: "framework logo" },
];

export function WebStories() {
    return (
        <section className="w-full py-12 md:py-16">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Web Stories</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                            Quick, visual guides and insights into the world of e-commerce development.
                        </p>
                    </div>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        slidesToScroll: 2,
                    }}
                    className="w-full max-w-6xl mx-auto pt-8"
                >
                    <CarouselContent>
                        {stories.map((story, index) => (
                            <CarouselItem key={index} className="sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                                <Link href={story.href} className="block group">
                                    <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                                        <Image
                                            src={story.imageUrl}
                                            alt={story.title}
                                            fill
                                            className="object-cover"
                                            data-ai-hint={story.dataAiHint}
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <h3 className="font-semibold text-white text-base leading-tight drop-shadow-md">{story.title}</h3>
                                        </div>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
    
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>
            </div>
        </section>
    );
}
