
import placeholderArticles from '@/lib/placeholder-articles.json';
import placeholderTags from '@/lib/placeholder-tags.json';

async function shopifyFetch(query: string, variables: Record<string, any> = {}) {
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const apiVersion = '2024-04';

  console.log('Attempting to connect to Shopify with the following credentials:');
  console.log(`- Store Domain: ${storeDomain}`);
  console.log(`- Access Token (first 8 chars): ${accessToken?.substring(0, 8)}...`);

  if (!storeDomain || !accessToken || storeDomain.includes('your-store-name') || !accessToken.trim()) {
    const errorMsg = "Shopify API credentials are not configured in environment variables.";
    console.error(errorMsg);
    // Always return a structure that won't crash the app, but log the configuration error.
    return { data: null, errors: [{ message: errorMsg }] };
  }
  
  const endpoint = `https://${storeDomain}/api/${apiVersion}/graphql.json`;
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }
    });

    const jsonResponse = await response.json();

    if (!response.ok) {
        const responseBody = jsonResponse.errors ? JSON.stringify(jsonResponse.errors, null, 2) : `Response status: ${response.status}`;
        const error = `Shopify API request failed. Status: ${response.status}. Body: ${responseBody}`;
        console.error(error);
        return { data: null, errors: [{ message: error }] };
    }
    
    if (jsonResponse.errors) {
      console.error("Shopify API returned GraphQL errors:", JSON.stringify(jsonResponse.errors, null, 2));
    }
    return jsonResponse;

  } catch (error) {
    console.error("Failed to fetch from Shopify:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown fetch error";
    return { data: null, errors: [{ message: `Failed to fetch from Shopify: ${errorMessage}` }] };
  }
}

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

const gql = String.raw;

const ArticleFragment = gql`
  fragment ArticleFragment on Article {
    id
    title
    handle
    excerptHtml
    publishedAt
    content
    image {
      url
      altText
    }
    authorV2 {
      name
    }
    tags
  }
`;

const ARTICLES_QUERY = gql`
  query GetArticles($first: Int, $last: Int, $before: String, $after: String, $query: String) {
    articles(first: $first, last: $last, before: $before, after: $after, sortKey: PUBLISHED_AT, reverse: true, query: $query) {
        edges {
          cursor
          node {
            ...ArticleFragment
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
  ${ArticleFragment}
`;

const ARTICLE_QUERY = gql`
  query GetArticleByHandle($handle: String!) {
    blog(handle: "news") {
      articleByHandle(handle: $handle) {
        ...ArticleFragment
        contentHtml
        pdf: metafield(namespace: "custom", key: "pdf_url") {
          value
        }
      }
    }
  }
  ${ArticleFragment}
`;

const ALL_TAGS_QUERY = gql`
  query GetAllTags {
    articles(first: 250) {
      edges {
        node {
          tags
        }
      }
    }
  }
`;

const ARTICLE_SUGGESTIONS_QUERY = gql`
  query GetArticleSuggestions($first: Int, $query: String) {
    articles(first: $first, sortKey: PUBLISHED_AT, reverse: true, query: $query) {
        edges {
          node {
            title
            handle
          }
        }
    }
  }
`;

const processArticleNode = (node: any) => {
  if (!node) return null;
  return {
    ...node,
    viewCount: getDeterministicViewCount(node.handle),
    readTime: getDeterministicReadTime(node.content || node.contentHtml || '')
  };
};

const getPlaceholderArticles = (count?: number) => {
    const articles = placeholderArticles.map(article => ({
        ...article,
        viewCount: getDeterministicViewCount(article.handle),
        readTime: getDeterministicReadTime(article.excerptHtml),
        authorV2: { name: 'Author' }
    }));
    return count ? articles.slice(0, count) : articles;
}

export async function getArticles(
    count: number = 12, 
    query?: string, 
    pagination: { before?: string; after?: string } = {}
) {
    const isPagingBackwards = !!pagination.before;
    const variables: Record<string, any> = { query };

    if (isPagingBackwards) {
        variables.last = count;
        variables.before = pagination.before;
    } else {
        variables.first = count;
        variables.after = pagination.after;
    }

    const response = await shopifyFetch(ARTICLES_QUERY, variables);
    
    if (!response.data?.articles?.edges || response.errors) {
        console.warn("getArticles: Shopify API call failed or returned no articles. Returning placeholder data.");
        const articles = getPlaceholderArticles(count);
        return { articles, pageInfo: { hasNextPage: articles.length >= count, hasPreviousPage: false, startCursor: null, endCursor: null } };
    }

    const articles = response.data.articles.edges.map((edge: any) => processArticleNode(edge.node)).filter(Boolean);
    const pageInfo = response.data.articles.pageInfo;
    return { articles, pageInfo };
}

export async function getArticleByHandle(handle: string) {
    const response = await shopifyFetch(ARTICLE_QUERY, { handle });
    
    const articleNode = response.data?.blog?.articleByHandle;

    if (!articleNode || response.errors) {
        console.warn(`getArticleByHandle: Shopify API call failed for handle "${handle}". Returning placeholder data.`);
        const placeholder = getPlaceholderArticles().find(p => p.handle === handle) || getPlaceholderArticles(1)[0];
        return { ...placeholder, contentHtml: placeholder.excerptHtml, pdf: null };
    }

    const processedArticle = processArticleNode(articleNode);

    return {
        ...processedArticle,
        pdf: articleNode.pdf
    };
}

export async function getAllTags() {
    const response = await shopifyFetch(ALL_TAGS_QUERY);
    if (!response.data?.articles?.edges || response.errors) {
        console.warn("getAllTags: Shopify API call failed. Returning placeholder data.");
        return placeholderTags;
    }
    const tagCounts: { [key: string]: number } = {};
    response.data.articles.edges.forEach((edge: { node: { tags: string[] } }) => {
        edge.node.tags.forEach(tag => {
            if (tagCounts[tag]) {
                tagCounts[tag]++;
            } else {
                tagCounts[tag] = 1;
            }
        });
    });

    const tags = Object.entries(tagCounts).map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return tags.length > 0 ? tags : placeholderTags;
}

export async function getRelatedArticles(handle: string, tags: string[]) {
    if (tags.length === 0) {
        const { articles } = await getArticles(5);
        return articles.filter((a: any) => a.handle !== handle).slice(0, 4);
    }
    const tagsQuery = tags.map(tag => `tag:'${tag}'`).join(' OR ');
    const { articles } = await getArticles(5, `(${tagsQuery})`);
    return articles.filter((a: any) => a.handle !== handle).slice(0, 4);
}

export async function getArticleSuggestions(searchTerm: string) {
    if (!searchTerm) {
        return [];
    }
    const searchQuery = `(title:*${searchTerm}* OR body:*${searchTerm}*)`;
    
    const response = await shopifyFetch(ARTICLE_SUGGESTIONS_QUERY, { first: 5, query: searchQuery });

    if (!response.data?.articles?.edges || response.errors) {
        console.warn("getArticleSuggestions: Shopify API call failed. Returning placeholder data.");
        return placeholderArticles
            .filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(a => ({ title: a.title, handle: a.handle }));
    }
    
    return response.data?.articles?.edges.map((edge: any) => ({
      title: edge.node.title,
      handle: edge.node.handle,
    })) || [];
}
