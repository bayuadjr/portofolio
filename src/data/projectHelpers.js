import fallbackProjects from './projects';

export const WORK_CATEGORIES = [
  'All',
  'Research',
  'Software & Tools',
  'Product & Business',
];

export const FIELDNOTES_DEFAULTS = {
  slug: 'fieldnotes-ai-ethnographic-assistant',
  liveUrl: 'https://fieldnotes-ivory.vercel.app/',
  repoUrl: 'https://github.com/bayuadjr/fieldnotes',
  featured: true,
  category: 'Software & Tools',
  projectType: 'Web App',
  role: 'Creator & Product Developer',
  status: 'Active development',
  year: '2026',
  summary:
    'An AI-assisted ethnographic fieldwork companion built local-first so qualitative researchers keep interpretive authority.',
  highlights: ['Team Digest', 'Theme Detector', 'Perspective Drift', 'Tension Log'],
  demoCredentials: {
    email: 'bayu@fieldnotes.id',
    password: 'password123',
  },
  tags: ['Fieldwork', 'React', 'Dexie.js', 'Supabase'],
};

const LEGACY_TAG_MAP = {
  anthropology: 'Anthropology',
  'data science': 'Data Analysis',
  ethnography: 'Fieldwork',
  hustler: 'Operations',
};

const VALID_CATEGORIES = new Set(WORK_CATEGORIES.filter((c) => c !== 'All'));

const FALLBACK_BY_ID = new Map(fallbackProjects.map((p) => [p._id, p]));
const FALLBACK_BY_SLUG = new Map(
  fallbackProjects.map((p) => [p.slug?.current || p.slug, p]).filter(([s]) => Boolean(s))
);

export function normalizeTag(tag) {
  if (typeof tag !== 'string') return '';
  const trimmed = tag.trim();
  if (!trimmed) return '';
  const mapped = LEGACY_TAG_MAP[trimmed.toLowerCase()];
  return mapped || trimmed;
}

export function getProjectTags(project) {
  if (!project) return [];
  const raw =
    Array.isArray(project.tags) && project.tags.length > 0
      ? project.tags
      : project.tag;

  const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
  const seen = new Set();
  const result = [];

  for (const item of list) {
    const normalized = normalizeTag(item);
    if (!normalized) continue;
    const key = normalized.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(normalized);
    }
  }

  return result;
}

export function isFieldnotesProject(project) {
  if (!project) return false;
  const slug = project.slug?.current || project.slug;
  return (
    project._id === 'project-fieldnotes' ||
    slug === FIELDNOTES_DEFAULTS.slug
  );
}

export function getProjectCategory(project) {
  if (!project) return 'Research';
  if (project.category && VALID_CATEGORIES.has(project.category)) {
    return project.category;
  }

  const slug = project.slug?.current || project.slug || '';
  const typeText = `${project.projectType || ''} ${project.title || ''} ${slug}`.toLowerCase();

  if (
    /harmoko|business|operations|inisian|digitalization|product|company profile|brand/i.test(
      typeText
    )
  ) {
    return 'Product & Business';
  }

  if (
    /web app|fieldnotes|maintenance|software|tool|website|portofolio|portfolio|php|mysql/i.test(
      typeText
    )
  ) {
    return 'Software & Tools';
  }

  return 'Research';
}

function cleanWrappedQuotes(text) {
  if (typeof text !== 'string') return text;
  const trimmed = text.trim();
  if (trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

export function enrichProject(project) {
  if (!project) return project;

  const slug = project.slug?.current || project.slug;
  const localMatch = FALLBACK_BY_ID.get(project._id) || FALLBACK_BY_SLUG.get(slug);
  const cleanedSummary = cleanWrappedQuotes(project.summary || project.desc);
  const isFieldnotes = isFieldnotesProject(project);

  const hasExplicitTags = Array.isArray(project.tags) && project.tags.length > 0;
  const normalizedTags = hasExplicitTags
    ? getProjectTags({ tags: project.tags })
    : isFieldnotes
      ? FIELDNOTES_DEFAULTS.tags
      : getProjectTags(project.tags || project.tag ? project : localMatch);

  const category = getProjectCategory({
    ...localMatch,
    ...project,
  });

  const baseEnriched = {
    ...project,
    category,
    role: project.role || localMatch?.role || null,
    status: project.status || localMatch?.status || null,
    sortOrder:
      typeof project.sortOrder === 'number'
        ? project.sortOrder
        : localMatch?.sortOrder ?? null,
    summary: cleanedSummary || localMatch?.summary || '',
    tags: normalizedTags,
  };

  if (!isFieldnotes) {
    return baseEnriched;
  }

  const hasDemoCreds = Boolean(
    project.demoCredentials?.email || project.demoCredentials?.password
  );

  return {
    ...baseEnriched,
    summary: baseEnriched.summary || FIELDNOTES_DEFAULTS.summary,
    liveUrl: project.liveUrl || FIELDNOTES_DEFAULTS.liveUrl,
    repoUrl: project.repoUrl || FIELDNOTES_DEFAULTS.repoUrl,
    featured:
      typeof project.featured === 'boolean'
        ? project.featured
        : FIELDNOTES_DEFAULTS.featured,
    category: VALID_CATEGORIES.has(project.category)
      ? project.category
      : FIELDNOTES_DEFAULTS.category,
    projectType:
      !project.projectType || project.projectType === 'research'
        ? FIELDNOTES_DEFAULTS.projectType
        : project.projectType,
    role: project.role || FIELDNOTES_DEFAULTS.role,
    status: project.status || FIELDNOTES_DEFAULTS.status,
    year: project.year || FIELDNOTES_DEFAULTS.year,
    highlights:
      Array.isArray(project.highlights) && project.highlights.length > 0
        ? project.highlights
        : FIELDNOTES_DEFAULTS.highlights,
    demoCredentials: hasDemoCreds
      ? project.demoCredentials
      : FIELDNOTES_DEFAULTS.demoCredentials,
    tags: normalizedTags,
  };
}

function shouldReplaceDuplicate(existing, candidate) {
  const existingBody = Number(existing.bodyCount) || 0;
  const candidateBody = Number(candidate.bodyCount) || 0;
  if (candidateBody !== existingBody) {
    return candidateBody > existingBody;
  }

  const existingCanonical = String(existing._id || '').startsWith('project-');
  const candidateCanonical = String(candidate._id || '').startsWith('project-');
  if (candidateCanonical !== existingCanonical) {
    return candidateCanonical;
  }

  return false;
}

export function prepareProjects(rawProjects) {
  if (!Array.isArray(rawProjects)) return [];

  const dedupedByKey = new Map();

  for (const item of rawProjects) {
    if (!item) continue;
    const enriched = enrichProject(item);
    const titleKey = (enriched.title || '').trim().toLowerCase();
    const dedupeKey = titleKey || enriched._id || enriched.num || Symbol('project');

    if (!dedupedByKey.has(dedupeKey)) {
      dedupedByKey.set(dedupeKey, enriched);
    } else if (shouldReplaceDuplicate(dedupedByKey.get(dedupeKey), enriched)) {
      dedupedByKey.set(dedupeKey, enriched);
    }
  }

  return Array.from(dedupedByKey.values()).sort((a, b) => {
    const featuredDiff = (b.featured === true ? 1 : 0) - (a.featured === true ? 1 : 0);
    if (featuredDiff !== 0) return featuredDiff;

    const orderA = typeof a.sortOrder === 'number' && Number.isFinite(a.sortOrder) ? a.sortOrder : null;
    const orderB = typeof b.sortOrder === 'number' && Number.isFinite(b.sortOrder) ? b.sortOrder : null;
    if (orderA !== null && orderB !== null && orderA !== orderB) {
      return orderA - orderB;
    }
    if (orderA !== null && orderB === null) return -1;
    if (orderB !== null && orderA === null) return 1;

    const numA = parseInt(a.num, 10);
    const numB = parseInt(b.num, 10);
    const safeA = Number.isNaN(numA) ? 999 : numA;
    const safeB = Number.isNaN(numB) ? 999 : numB;
    if (safeA !== safeB) return safeA - safeB;

    return (a.title || '').localeCompare(b.title || '');
  });
}

export function findFallbackProjectBySlug(slug) {
  if (!slug) return null;
  const match = FALLBACK_BY_SLUG.get(slug) || FALLBACK_BY_ID.get(slug);
  return match ? enrichProject(match) : null;
}

export function getRelatedFallbackProjects(project) {
  if (!project) return [];
  const slug = project.slug?.current || project.slug;
  const localMatch = FALLBACK_BY_ID.get(project._id) || FALLBACK_BY_SLUG.get(slug);
  const slugs = localMatch?.relatedSlugs || project.relatedSlugs || [];

  return slugs
    .map((targetSlug) => FALLBACK_BY_SLUG.get(targetSlug))
    .filter(Boolean)
    .map((item) => enrichProject(item));
}
