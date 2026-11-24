import fallbackPosts from './posts';

export const POST_CATEGORIES = [
  'All',
  'Anthropology',
  'Research Notes',
  'Data & Technology',
  'Reading Notes',
  'Reflections',
];

const CATEGORY_ALIASES = {
  anthropology: 'Anthropology',
  'book notes': 'Reading Notes',
  'reading notes': 'Reading Notes',
  'research notes': 'Research Notes',
  'social theory': 'Research Notes',
  'data science': 'Data & Technology',
  'data & technology': 'Data & Technology',
  reflection: 'Reflections',
  reflections: 'Reflections',
  personal: 'Reflections',
};

const VALID_POST_CATEGORIES = new Set(
  POST_CATEGORIES.filter((item) => item !== 'All')
);

const FALLBACK_POSTS_BY_ID = new Map(fallbackPosts.map((p) => [p._id, p]));
const FALLBACK_POSTS_BY_SLUG = new Map(
  fallbackPosts.map((p) => [p.slug?.current || p.slug, p]).filter(([s]) => Boolean(s))
);

export function normalizePostCategory(raw) {
  if (typeof raw !== 'string') return '';
  const trimmed = raw.trim();
  if (!trimmed) return '';
  const mapped = CATEGORY_ALIASES[trimmed.toLowerCase()];
  if (mapped) return mapped;
  return VALID_POST_CATEGORIES.has(trimmed) ? trimmed : trimmed;
}

export function getPostCategories(post) {
  if (!post) return [];
  const rawValues = [];

  if (post.category) {
    rawValues.push(post.category);
  }
  if (Array.isArray(post.tag)) {
    rawValues.push(...post.tag);
  } else if (post.tag) {
    rawValues.push(post.tag);
  }

  const seen = new Set();
  const result = [];

  for (const val of rawValues) {
    const normalized = normalizePostCategory(val);
    if (!normalized) continue;
    const key = normalized.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(normalized);
    }
  }

  return result;
}

export function getPrimaryPostCategory(post) {
  return getPostCategories(post)[0] || '';
}

export function stripEmDash(text) {
  if (typeof text !== 'string') return text;
  return text.replace(/\s*\u2014\s*/g, ': ');
}

export function estimateReadingTime(body, fallbackMinutes = null) {
  if (Array.isArray(body) && body.length > 0) {
    let words = 0;
    for (const node of body) {
      if (node?._type === 'block' && Array.isArray(node.children)) {
        for (const child of node.children) {
          if (typeof child?.text === 'string' && child.text.trim()) {
            words += child.text.trim().split(/\s+/).length;
          }
        }
      }
    }
    if (words > 0) {
      return Math.max(1, Math.round(words / 200));
    }
  }

  if (typeof fallbackMinutes === 'number' && Number.isFinite(fallbackMinutes) && fallbackMinutes > 0) {
    return Math.round(fallbackMinutes);
  }

  return null;
}

export function enrichPost(post) {
  if (!post) return post;
  const slug = post.slug?.current || post.slug;
  const localMatch = FALLBACK_POSTS_BY_ID.get(post._id) || FALLBACK_POSTS_BY_SLUG.get(slug);
  const categories = getPostCategories(post.category || post.tag ? post : localMatch);

  return {
    ...post,
    title: stripEmDash(post.title || localMatch?.title || ''),
    summary: stripEmDash(post.summary || localMatch?.summary || ''),
    categories,
    primaryCategory: categories[0] || localMatch?.category || '',
  };
}

export function findFallbackPostBySlug(slug) {
  if (!slug) return null;
  const match = FALLBACK_POSTS_BY_SLUG.get(slug) || FALLBACK_POSTS_BY_ID.get(slug);
  return match ? enrichPost(match) : null;
}

export function getRelatedFallbackPosts(currentSlug, limit = 2) {
  return fallbackPosts
    .filter((item) => {
      const slug = item.slug?.current || item.slug;
      return slug !== currentSlug && item._id !== currentSlug;
    })
    .slice(0, limit)
    .map(enrichPost);
}
