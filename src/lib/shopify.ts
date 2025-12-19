
import placeholderArticles from '@/lib/placeholder-articles.json';
import placeholderTags from '@/lib/placeholder-tags.json';

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const BLOG_HANDLE = 'news';

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
};

const processArticleNode = (node: any) => {
  if (!node) return null;
  const contentForReadingTime = node.content || node.contentHtml || node.excerptHtml || '';
  return {
    ...node,
    tags: node.tags || [],
    viewCount: getDeterministicViewCount(node.handle),
    readTime: getDeterministicReadTime(contentForReadingTime),
    image: node.image || { url: `https://picsum.photos/seed/${node.handle}/600/400`, altText: `Placeholder for ${node.title}`},
    authorV2: node.authorV2 || { name: 'Raksha Rajput' },
  };
};

const fallbackArticles = placeholderArticles.map(article => processArticleNode({
    ...article,
    authorV2: { name: 'Raksha Rajput' },
    content: article.excerptHtml,
}));

async function shopifyFetch<T>(query: string, variables: Record<string, any> = {}): Promise<{ data: T } | undefined> {
    if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
        console.warn('Shopify API credentials are not set. Using placeholder data.');
        return undefined;
    }

    const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-04/graphql.json`;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
            },
            body: JSON.stringify({ query, variables }),
            cache: 'no-store', // Use 'no-store' for dynamic, real-time data
        });

        if (!response.ok) {
            throw new Error(`Shopify API request failed: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.errors) {
            console.error('Shopify API errors:', result.errors);
            throw new Error('Shopify API returned errors.');
        }

        return result;
    } catch (error) {
        console.error('Error fetching from Shopify:', error);
        return undefined; // Fallback on error
    }
}

const ArticlesQuery = `
  query getArticles(
    $first: Int!
    $query: String
    $after: String
    $reverse: Boolean
    $blogHandle: String!
  ) {
    blog(handle: $blogHandle) {
      articles(first: $first, query: $query, after: $after, reverse: $reverse) {
        edges {
          node {
            id
            handle
            title
            publishedAt
            excerptHtml
            contentHtml
            image {
              url
              altText
            }
            tags
            authorV2 {
                name
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

export async function getArticles(
    count: number = 12, 
    query?: string, 
    pagination: { after?: string | null } = {},
    reverse: boolean = true
) {
    const apiResult = await shopifyFetch<{ blog: { articles: { edges: any[], pageInfo: any } } }>(
        ArticlesQuery,
        {
            first: count,
            query: query || null,
            after: pagination.after || null,
            reverse,
            blogHandle: BLOG_HANDLE,
        }
    );

    if (apiResult && apiResult.data?.blog?.articles) {
        const articles = apiResult.data.blog.articles.edges.map(edge => processArticleNode(edge.node));
        return {
            articles,
            pageInfo: apiResult.data.blog.articles.pageInfo
        };
    }

    // Fallback logic
    let filteredArticles = [...fallbackArticles];
    if (query) {
        const lowerQuery = query.toLowerCase();
        if (lowerQuery.startsWith('tag:')) {
            const tag = lowerQuery.replace("tag:'", "").replace("'", "");
            filteredArticles = fallbackArticles.filter(a => a.tags.some((t: string) => t.toLowerCase() === tag));
        } else {
            const searchTerm = lowerQuery.replace(/title:\*|\*|body:\*/g, '');
            filteredArticles = fallbackArticles.filter(a => a.title.toLowerCase().includes(searchTerm) || a.excerptHtml.toLowerCase().includes(searchTerm));
        }
    }

    if (reverse) {
        filteredArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else {
        filteredArticles.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    }
    
    const startIndex = pagination.after ? filteredArticles.findIndex(a => a.id === pagination.after) + 1 : 0;
    const articlesSlice = filteredArticles.slice(startIndex, startIndex + count);

    return {
        articles: articlesSlice,
        pageInfo: {
            hasNextPage: startIndex + count < filteredArticles.length,
            hasPreviousPage: startIndex > 0,
            startCursor: articlesSlice.length > 0 ? articlesSlice[0].id : null,
            endCursor: articlesSlice.length > 0 ? articlesSlice[articlesSlice.length - 1].id : null,
        }
    };
}


const ArticleByHandleQuery = `
  query getArticleByHandle($handle: String!, $blogHandle: String!) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $handle) {
        id
        handle
        title
        publishedAt
        contentHtml
        image {
          url
          altText
        }
        tags
        authorV2 {
          name
        }
        seo {
          title
          description
        }
        faq: metafield(namespace: "custom", key: "faq") {
          value
        }
      }
    }
  }
`;

export async function getArticleByHandle(handle: string) {
    const apiResult = await shopifyFetch<{ blog: { articleByHandle: any } }>(
        ArticleByHandleQuery,
        { handle, blogHandle: BLOG_HANDLE }
    );
    
    if (apiResult && apiResult.data?.blog?.articleByHandle) {
        return processArticleNode(apiResult.data.blog.articleByHandle);
    }

    // Fallback
    const article = fallbackArticles.find(p => p.handle === handle);
    if (!article) return null;
    return {
        ...article,
        contentHtml: `<p>${article.excerptHtml}</p><p>This is some more placeholder content for the full article. In a real application, this would be the complete blog post body fetched from a CMS.</p>`,
        faq: null,
    };
}

const AllTagsQuery = `
  query getAllTags($blogHandle: String!) {
    blog(handle: $blogHandle) {
      articles(first: 250) {
        edges {
          node {
            tags
          }
        }
      }
    }
  }
`;

export async function getAllTags() {
    const apiResult = await shopifyFetch<{ blog: { articles: { edges: { node: { tags: string[] } }[] } } }>(
        AllTagsQuery,
        { blogHandle: BLOG_HANDLE }
    );

    if (apiResult && apiResult.data?.blog?.articles) {
        const tagCounts: { [key: string]: number } = {};
        apiResult.data.blog.articles.edges.forEach(edge => {
            edge.node.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });
        return Object.entries(tagCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);
    }

    return placeholderTags;
}


const RelatedArticlesQuery = `
  query getRelatedArticles($first: Int!, $query: String, $blogHandle: String!) {
    blog(handle: $blogHandle) {
      articles(first: $first, query: $query) {
        edges {
          node {
            id
            handle
            title
            publishedAt
            image {
              url
              altText
            }
            tags
          }
        }
      }
    }
  }
`;

export async function getRelatedArticles(currentArticleHandle: string, tags: string[]) {
    if (!tags || tags.length === 0) {
      const { articles } = await getArticles(5, `-${currentArticleHandle}`); // Fetch any 5 but the current one
      return articles.slice(0,4);
    }
    
    const query = tags.map(tag => `tag:'${tag}'`).join(' OR ');

    const apiResult = await shopifyFetch<{ blog: { articles: { edges: any[] } } }>(
        RelatedArticlesQuery,
        { first: 5, query, blogHandle: BLOG_HANDLE }
    );

    if (apiResult && apiResult.data?.blog?.articles) {
      const articles = apiResult.data.blog.articles.edges
        .map(edge => processArticleNode(edge.node))
        .filter(article => article.handle !== currentArticleHandle);
      
      if(articles.length < 4) {
        const fallback = await getArticles(5, `-${currentArticleHandle}`);
        return [...articles, ...fallback.articles].slice(0, 4);
      }
      return articles.slice(0, 4);
    }

    // Fallback
    let relatedArticles = fallbackArticles.filter(article => 
        article.handle !== currentArticleHandle &&
        article.tags.some((tag: string) => tags.includes(tag))
    );
    if (relatedArticles.length < 4) {
        const additionalArticles = fallbackArticles.filter(article => 
            article.handle !== currentArticleHandle &&
            !relatedArticles.some(ra => ra.id === article.id)
        );
        relatedArticles.push(...additionalArticles);
    }
    return relatedArticles.slice(0, 4);
}

const ArticleSuggestionsQuery = `
  query getArticleSuggestions($first: Int!, $query: String, $blogHandle: String!) {
    blog(handle: $blogHandle) {
      articles(first: $first, query: $query) {
        edges {
          node {
            title
            handle
          }
        }
      }
    }
  }
`;

export async function getArticleSuggestions(searchTerm: string) {
    if (!searchTerm) return [];

    const query = `title:*${searchTerm}*`;
    const apiResult = await shopifyFetch<{ blog: { articles: { edges: { node: { title: string, handle: string } }[] } } }>(
        ArticleSuggestionsQuery,
        { first: 5, query, blogHandle: BLOG_HANDLE }
    );

    if (apiResult && apiResult.data?.blog?.articles) {
        return apiResult.data.blog.articles.edges.map(edge => edge.node);
    }

    // Fallback
    return fallbackArticles
        .filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(a => ({ title: a.title, handle: a.handle }))
        .slice(0, 5);
}

export function isUsingPlaceholderData() {
    return !SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN;
}
