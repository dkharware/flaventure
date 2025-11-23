
const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_ENDPOINT;
const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyFetch(query: string, variables: Record<string, any> = {}) {
  if (!endpoint || !accessToken) {
    console.warn("Shopify API credentials are not configured. Blog posts will not be fetched.");
    return { data: null, errors: null }; // Return a shape that won't break the app
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Shopify API request failed with status ${response.status}:`, errorBody);
      // Don't throw, just return an empty-like response
      return { data: null, errors: [{ message: `Shopify API request failed with status ${response.status}` }] };
    }

    const jsonResponse = await response.json();
    if (jsonResponse.errors) {
      console.error("Shopify API returned errors:", jsonResponse.errors);
      // Don't throw, just return what we have
      return { data: jsonResponse.data, errors: jsonResponse.errors };
    }

    return jsonResponse;
  } catch (error) {
    console.error("Failed to fetch from Shopify:", error);
    return { data: null, errors: [{ message: error instanceof Error ? error.message : "Unknown fetch error" }] };
  }
}


const gql = String.raw;

const ARTICLES_QUERY = gql`
  query GetArticles($first: Int!) {
    articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
      edges {
        node {
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
        }
      }
    }
  }
`;

const ARTICLE_QUERY = gql`
  query GetArticleByHandle($handle: String!) {
    blog(handle: "news") { # You might need to make 'news' dynamic if you have multiple blogs
      articleByHandle(handle: $handle) {
        id
        title
        contentHtml
        publishedAt
        image {
          url
          altText
        }
        authorV2 {
          name
        }
      }
    }
  }
`;

export async function getArticles(count: number = 10) {
    const response = await shopifyFetch(ARTICLES_QUERY, { first: count });
    if (!response.data || !response.data.articles) {
        return [];
    }
    return response.data.articles.edges.map((edge: any) => edge.node) || [];
}

export async function getArticleByHandle(handle: string) {
    const response = await shopifyFetch(ARTICLE_QUERY, { handle });
    if (!response.data) {
        return null;
    }
    return response.data.blog?.articleByHandle;
}
