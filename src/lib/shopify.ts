

async function shopifyFetch(query: string, variables: Record<string, any> = {}) {
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_ENDPOINT;
  const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const apiVersion = '2024-04';

  if (!storeDomain || !accessToken) {
    console.warn("Shopify API credentials are not configured. Blog posts will not be loaded.");
    return { data: null, errors: [{ message: `Shopify API credentials are not configured.` }] };
  }

  // Construct the endpoint robustly
  // 1. Remove protocol if present
  let cleanDomain = storeDomain.replace(/^https?:\/\//, '');
  // 2. Remove any trailing paths or slashes
  cleanDomain = cleanDomain.split('/')[0];
  // 3. Construct the final correct endpoint
  const endpoint = `https://${cleanDomain}/api/${apiVersion}/graphql.json`;
  
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

    const responseBody = await response.text();

    if (!response.ok) {
      if (responseBody.trim().startsWith('<!DOCTYPE html>')) {
          console.error(`Shopify API request failed with status ${response.status} and returned an HTML page. Please check your endpoint ('${storeDomain}') and access token.`);
          return { data: null, errors: [{ message: `Shopify API request returned an HTML page. Check your store domain and access token.` }] };
      }
      console.error(`Shopify API request failed with status ${response.status}:`, responseBody);
      return { data: null, errors: [{ message: `Shopify API request failed with status ${response.status}` }] };
    }
    
    try {
        const jsonResponse = JSON.parse(responseBody);
        if (jsonResponse.errors) {
          console.error("Shopify API returned GraphQL errors:", jsonResponse.errors);
        }
        return jsonResponse;
    } catch (e) {
        console.error("Failed to parse JSON response from Shopify. The endpoint might be incorrect and returned HTML instead of JSON.", responseBody);
        return { data: null, errors: [{ message: "Failed to parse JSON response from Shopify. Check the API endpoint configuration." }] };
    }

  } catch (error) {
    console.error("Failed to fetch from Shopify:", error);
    return { data: null, errors: [{ message: error instanceof Error ? error.message : "Unknown fetch error" }] };
  }
}


const gql = String.raw;

const ArticleFragment = gql`
  fragment ArticleFragment on Article {
    id
    title
    handle
    excerptHtml
    publishedAt
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

export async function getArticles(
    count: number = 10, 
    query?: string, 
    pagination: { before?: string; after?: string } = {}
) {
    const isPagingBackwards = !!pagination.before;

    const variables: Record<string, any> = {
        query: query || null,
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
        return { articles: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } };
    }

    const articles = response.data.articles.edges.map((edge: any) => edge.node);
    
    // The cursors are on the edges, but we need them for the whole page.
    const pageInfo = {
        ...response.data.articles.pageInfo,
        startCursor: response.data.articles.edges[0]?.cursor,
        endCursor: response.data.articles.edges[response.data.articles.edges.length - 1]?.cursor,
    };

    return { articles, pageInfo };
}

export async function getArticleByHandle(handle: string) {
    const response = await shopifyFetch(ARTICLE_QUERY, { handle });
    if (!response.data?.blog?.articleByHandle) {
        return null;
    }
    return response.data.blog.articleByHandle;
}

export async function getAllTags() {
    const response = await shopifyFetch(ALL_TAGS_QUERY);
    if (!response.data?.articles?.edges) {
        return [];
    }
    const allTags = new Set<string>();
    response.data.articles.edges.forEach((edge: { node: { tags: string[] } }) => {
        edge.node.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags);
}

export async function getRelatedArticles(handle: string, tags: string[]) {
    if (tags.length === 0) {
        const { articles } = await getArticles(4);
        return articles.filter((a: any) => a.handle !== handle).slice(0, 3);
    }
    const query = tags.map(tag => `tag:'${tag}'`).join(' OR ');
    const { articles } = await getArticles(4, query);
    return articles.filter((a: any) => a.handle !== handle).slice(0, 3);
}
