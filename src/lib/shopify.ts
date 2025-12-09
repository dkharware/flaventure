
async function shopifyFetch(query: string, variables: Record<string, any> = {}) {
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const apiVersion = '2024-04';

  if (!storeDomain || !accessToken) {
    console.warn("Shopify API credentials are not configured. Blog posts will not be loaded.");
    return { data: null, errors: [{ message: `Shopify API credentials are not configured. Please add NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN to your .env.local file.` }] };
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
      next: { revalidate: 60 } // Use Next.js revalidation
    });

    if (!response.ok) {
        const responseBody = await response.text();
        const error = `Shopify API request failed with status ${response.status}: ${responseBody}`;
        console.error(error);
        return { data: null, errors: [{ message: error }] };
    }
    
    const jsonResponse = await response.json();
    if (jsonResponse.errors) {
      console.error("Shopify API returned GraphQL errors:", jsonResponse.errors);
    }
    return jsonResponse;

  } catch (error) {
    console.error("Failed to fetch from Shopify:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown fetch error";
    return { data: null, errors: [{ message: `Failed to fetch from Shopify: ${errorMessage}` }] };
  }
}

// Simple deterministic hash function for generating view counts
const getDeterministicViewCount = (handle: string) => {
    let hash = 0;
    for (let i = 0; i < handle.length; i++) {
        const char = handle.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash % 4000) + 250; // Generate a number between 250 and 4250
};

// Simple deterministic hash function for generating read times
const getDeterministicReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return Math.max(1, readTime); // Ensure at least 1 minute read time
}


const gql = String.raw;

const ArticleFragment = gql`
  fragment ArticleFragment on Article {
    id
    title
    handle
    excerptHtml
    publishedAt
    content(truncateAt: 500)
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

export async function getArticles(
    count: number = 12, 
    query?: string, 
    pagination: { before?: string; after?: string } = {}
) {
    const isPagingBackwards = !!pagination.before;

    const variables: Record<string, any> = {
        query: query,
    };

    if (isPagingBackwards) {
        variables.last = count;
        variables.before = pagination.before;
    } else {
        variables.first = count;
        variables.after = pagination.after;
    }

    const response = await shopifyFetch(ARTICLES_QUERY, variables);
    
    if (!response.data?.articles?.edges) {
        return { articles: [], pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null } };
    }

    const articles = response.data.articles.edges.map((edge: any) => processArticleNode(edge.node));
    
    const pageInfo = response.data.articles.pageInfo;

    return { articles, pageInfo };
}

export async function getArticleByHandle(handle: string) {
    const response = await shopifyFetch(ARTICLE_QUERY, { handle });
    const articleNode = response.data?.blog?.articleByHandle;

    if (!articleNode) {
        return null;
    }

    const processedArticle = processArticleNode(articleNode);

    return {
        ...processedArticle,
        pdf: articleNode.pdf
    };
}

export async function getAllTags() {
    const response = await shopifyFetch(ALL_TAGS_QUERY);
    if (!response.data?.articles?.edges) {
        return [];
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

    return Object.entries(tagCounts).map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
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
    
    return response.data?.articles?.edges.map((edge: any) => ({
      title: edge.node.title,
      handle: edge.node.handle,
    })) || [];
}
