
const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_ENDPOINT}/api/2023-10/graphql.json`;
const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyFetch(query: string, variables: Record<string, any> = {}) {
  // Check if credentials are set and not placeholder values.
  if (!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_ENDPOINT || 
      !accessToken ||
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_ENDPOINT === 'your-store-name.myshopify.com'
      ) {
    console.warn("Shopify API credentials are not configured. Blog posts will not be fetched.");
    return { data: null, errors: [{ message: "Shopify API credentials are not configured." }] };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Shopify API request failed with status ${response.status}:`, errorBody);
      return { data: null, errors: [{ message: `Shopify API request failed with status ${response.status}` }] };
    }

    const jsonResponse = await response.json();
    if (jsonResponse.errors) {
      console.error("Shopify API returned errors:", jsonResponse.errors);
    }

    return jsonResponse;
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
  query GetArticles($first: Int!, $query: String) {
    articles(first: $first, sortKey: PUBLISHED_AT, reverse: true, query: $query) {
      edges {
        node {
          ...ArticleFragment
        }
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

export async function getArticles(count: number = 10, query?: string) {
    const response = await shopifyFetch(ARTICLES_QUERY, { first: count, query });
    if (!response.data?.articles?.edges) {
        return [];
    }
    return response.data.articles.edges.map((edge: any) => edge.node);
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
        const articles = await getArticles(4);
        return articles.filter((a: any) => a.handle !== handle).slice(0, 3);
    }
    const query = tags.map(tag => `tag:'${tag}'`).join(' OR ');
    const articles = await getArticles(4, query);
    return articles.filter((a: any) => a.handle !== handle).slice(0, 3);
}
