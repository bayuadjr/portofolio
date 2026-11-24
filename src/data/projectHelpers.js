export const FIELDNOTES_DEFAULTS = {
  slug: 'fieldnotes-ai-ethnographic-assistant',
  liveUrl: 'https://fieldnotes-ivory.vercel.app/',
  repoUrl: 'https://github.com/bayuadjr/fieldnotes',
  featured: true,
  projectType: 'Web App',
  year: '2026',
  summary:
    'An offline-first field notebook for researchers working on slow connections. Includes team digests, theme tracking, perspective drift, and tension logs.',
  highlights: ['Team Digest', 'Theme Detector', 'Perspective Drift', 'Tension Log'],
  demoCredentials: {
    email: 'bayu@fieldnotes.id',
    password: 'password123',
  },
  tags: ['Fieldwork', 'Web app', 'Notes'],
};

const LEGACY_TAG_MAP = {
  anthropology: 'Anthropology',
  'data science': 'Data',
  ethnography: 'Fieldwork',
  hustler: 'Operations',
};

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

  const cleanedSummary = cleanWrappedQuotes(project.summary);
  const isFieldnotes = isFieldnotesProject(project);

  const hasExplicitTags = Array.isArray(project.tags) && project.tags.length > 0;
  const normalizedTags = hasExplicitTags
    ? getProjectTags({ tags: project.tags })
    : isFieldnotes
      ? FIELDNOTES_DEFAULTS.tags
      : getProjectTags(project);

  if (!isFieldnotes) {
    return {
      ...project,
      summary: cleanedSummary,
      tags: normalizedTags,
    };
  }

  const hasDemoCreds = Boolean(
    project.demoCredentials?.email || project.demoCredentials?.password
  );

  return {
    ...project,
    summary: cleanedSummary || FIELDNOTES_DEFAULTS.summary,
    liveUrl: project.liveUrl || FIELDNOTES_DEFAULTS.liveUrl,
    repoUrl: project.repoUrl || FIELDNOTES_DEFAULTS.repoUrl,
    featured:
      typeof project.featured === 'boolean'
        ? project.featured
        : FIELDNOTES_DEFAULTS.featured,
    projectType:
      !project.projectType || project.projectType === 'research'
        ? FIELDNOTES_DEFAULTS.projectType
        : project.projectType,
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

    const numA = parseInt(a.num, 10);
    const numB = parseInt(b.num, 10);
    const safeA = Number.isNaN(numA) ? 999 : numA;
    const safeB = Number.isNaN(numB) ? 999 : numB;
    if (safeA !== safeB) return safeA - safeB;

    return (a.title || '').localeCompare(b.title || '');
  });
}
