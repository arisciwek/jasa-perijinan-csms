import type { CollectionEntry } from 'astro:content';

type ArticleEntry = CollectionEntry<'articles'>;

function articleDate(a: ArticleEntry): number {
  const value = a.data.updatedDate || a.data.pubDate;
  return new Date(value).valueOf();
}

function byDateDesc(a: ArticleEntry, b: ArticleEntry): number {
  return articleDate(b) - articleDate(a);
}

/**
 * Pilih artikel terkait, maksimal `limit` item, tanpa draft dan tanpa artikel saat ini.
 * Prioritas: (1) satu layanan/elemen → (2) satu kategori → (3) terbaru.
 */
export function pickRelatedArticles(
  articles: ArticleEntry[],
  opts: {
    currentSlug?: string;
    serviceId?: number | null;
    elementId?: number | null;
    category?: string | null;
    limit?: number;
  } = {}
): ArticleEntry[] {
  const { currentSlug, serviceId, elementId, category, limit = 3 } = opts;
  const pool = articles.filter(a => !a.data.draft && a.slug !== currentSlug);

  const picked: ArticleEntry[] = [];
  const seen = new Set<string>();
  const take = (candidates: ArticleEntry[]) => {
    for (const a of candidates) {
      if (picked.length >= limit) return;
      if (seen.has(a.slug)) continue;
      seen.add(a.slug);
      picked.push(a);
    }
  };

  const sorted = [...pool].sort(byDateDesc);
  if (serviceId != null) {
    take(sorted.filter(a => a.data.relatedService === serviceId));
  }
  if (elementId != null) {
    take(sorted.filter(a => a.data.relatedElement === elementId));
  }
  if (category) {
    take(sorted.filter(a => a.data.category === category));
  }
  take(sorted);
  return picked;
}
