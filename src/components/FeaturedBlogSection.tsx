
import { getArticles } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export async function FeaturedBlogSection() {
    const { articles } = await getArticles(6);

    if (!articles || articles.length < 6) {
        return null; // Don't render if we don't have enough articles
    }

    const featuredArticle = articles[0];
    const sideArticles = articles.slice(1);

    return (
        <section className="w-full py-12 md:py-16 promo-gradient-bg">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Featured Article on the Left */}
                    <div className="group">
                        <Link href={`/blog/${featuredArticle.handle}`}>
                            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-4 shadow-lg transition-transform duration-300 group-hover:scale-105">
                                <Image
                                    src={featuredArticle.image?.url || `https://picsum.photos/seed/featured/800/450`}
                                    alt={featuredArticle.image?.altText || featuredArticle.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                                <div className="absolute top-4 left-4">
                                     {featuredArticle.tags?.slice(0, 1).map((tag: string) => (
                                        <Badge key={tag} variant="secondary" className="shadow-md">{tag}</Badge>
                                    ))}
                                </div>
                            </div>
                        </Link>
                        <div className="space-y-2">
                            <h2 className="text-2xl md:text-3xl font-bold font-headline group-hover:text-primary transition-colors line-clamp-3">
                                <Link href={`/blog/${featuredArticle.handle}`}>{featuredArticle.title}</Link>
                            </h2>
                             <p className="text-muted-foreground line-clamp-3" dangerouslySetInnerHTML={{ __html: featuredArticle.excerptHtml }} />
                             <p className="text-sm text-muted-foreground pt-2">
                                {new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                             </p>
                             <Button asChild variant="link" className="p-0 h-auto">
                                <Link href={`/blog/${featuredArticle.handle}`}>Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        </div>
                    </div>

                    {/* Side Articles on the Right */}
                    <div className="space-y-6">
                        {sideArticles.map((article, index) => (
                             <Link key={article.id} href={`/blog/${article.handle}`} className={cn("group block", index >= 2 ? 'hidden md:block' : 'block')}>
                                <div className="flex items-start gap-4">
                                    <div className="relative h-24 w-24 flex-shrink-0 rounded-xl overflow-hidden">
                                        <Image
                                            src={article.image?.url || `https://picsum.photos/seed/${article.handle}/100`}
                                            alt={article.image?.altText || article.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            sizes="100px"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold font-headline group-hover:text-primary transition-colors line-clamp-2 leading-snug">{article.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                             </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
