
'use server';

import { getArticles } from '@/lib/shopify';

export async function loadMoreArticles(count: number, query?: string, after?: string | null) {
  const { articles, pageInfo } = await getArticles(count, query, { after: after || undefined });
  return { articles, pageInfo };
}
