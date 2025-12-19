
import placeholderArticles from '@/lib/placeholder-articles.json';
import placeholderTags from '@/lib/placeholder-tags.json';

const getDeterministicViewCount = (handle: string) => {
    let hash = 0;
    for (let i = 0; i < handle.length; i++) {
        const char = handle.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return Math.abs(hash % 4000) + 250;
};

const getDeterministicReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content ? content.split(/\s+/).length : 0;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return Math.max(1, readTime);
}

const processArticleNode = (node: any) => {
  if (!node) return null;
  return {
    ...node,
    tags: node.tags || [],
    viewCount: getDeterministicViewCount(node.handle),
    readTime: getDeterministicReadTime(node.content || node.contentHtml || node.excerptHtml || '')
  };
};

const allArticles = placeholderArticles.map(article => processArticleNode({
    ...article,
    authorV2: { name: 'Alex Doe' }, // Add a default author
    content: article.excerptHtml, // Use excerpt as content for now
}));


export async function getArticles(
    count: number = 12, 
    query?: string, 
    pagination: { after?: string | null } = {},
    reverse: boolean = true
) {
    let filteredArticles = [...allArticles];

    if (query) {
        const lowerQuery = query.toLowerCase();
        
        if (lowerQuery.startsWith('tag:')) {
            const tag = lowerQuery.replace("tag:'", "").replace("'", "");
            filteredArticles = allArticles.filter(a => a.tags.some((t: string) => t.toLowerCase() === tag));
        } else if (lowerQuery.includes('title:') || lowerQuery.includes('body:')) {
            const searchTerm = lowerQuery.replace('title:*', '').replace('body:*', '').replace(/\*/g, '');
            filteredArticles = allArticles.filter(a => a.title.toLowerCase().includes(searchTerm) || a.excerptHtml.toLowerCase().includes(searchTerm));
        }
    }

    if(reverse) {
        filteredArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else {
         filteredArticles.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    }

    const startIndex = pagination.after ? filteredArticles.findIndex(a => a.id === pagination.after) + 1 : 0;
    const endIndex = startIndex + count;

    const articles = filteredArticles.slice(startIndex, endIndex);

    const pageInfo = {
        hasNextPage: endIndex < filteredArticles.length,
        hasPreviousPage: startIndex > 0,
        startCursor: articles.length > 0 ? articles[0].id : null,
        endCursor: articles.length > 0 ? articles[articles.length - 1].id : null,
    };

    return { articles, pageInfo };
}

export async function getArticleByHandle(handle: string) {
    const article = allArticles.find(p => p.handle === handle);
    
    if (!article) {
        return null;
    }
    
    return {
        ...article, 
        contentHtml: `<p>${article.excerptHtml}</p><p>This is some more placeholder content for the full article. In a real application, this would be the complete blog post body fetched from a CMS.</p>`,
        pdf: null, 
        faq: null
    };
}

export async function getAllTags() {
    return placeholderTags;
}

export async function getRelatedArticles(currentArticleHandle: string, tags: string[]) {
    let relatedArticles: any[] = [];
    const articlesToFetch = 5;

    if (tags && tags.length > 0) {
        relatedArticles = allArticles.filter(article => 
            article.handle !== currentArticleHandle &&
            article.tags.some((tag: string) => tags.includes(tag))
        );
    } 
    
    if (relatedArticles.length < articlesToFetch) {
        const additionalArticles = allArticles.filter(article => 
            article.handle !== currentArticleHandle &&
            !relatedArticles.some(ra => ra.id === article.id)
        );
        relatedArticles.push(...additionalArticles);
    }
    
    return relatedArticles.slice(0, 4);
}


export async function getArticleSuggestions(searchTerm: string) {
    if (!searchTerm) {
        return [];
    }
    return allArticles
        .filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(a => ({ title: a.title, handle: a.handle }))
        .slice(0, 5);
}
