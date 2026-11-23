/**
 * Validates and normalizes an external HTTP/HTTPS URL.
 * Rejects dangerous protocols such as javascript:, data:, vbscript:, or file:.
 */
export function sanitizeHttpUrl(rawUrl) {
  if (typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.href;
    }
    return null;
  } catch {
    return null;
  }
}

const YOUTUBE_ID_RE = /^[A-Za-z0-9_-]+$/;

/**
 * Validates and normalizes an iframe video embed URL against an explicit HTTPS allowlist.
 * Returns a safe embed URL or null when the host/protocol is unsupported.
 */
export function sanitizeEmbedUrl(rawUrl) {
  if (typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }

  if (parsed.protocol !== 'https:') return null;

  const host = parsed.hostname.toLowerCase();

  if (host === 'youtube.com' || host === 'www.youtube.com' || host === 'm.youtube.com') {
    if (parsed.pathname === '/watch') {
      const videoId = parsed.searchParams.get('v');
      if (videoId && YOUTUBE_ID_RE.test(videoId)) {
        return `https://www.youtube-nocookie.com/embed/${videoId}`;
      }
      return null;
    }
    if (parsed.pathname.startsWith('/embed/') && parsed.pathname.length > '/embed/'.length) {
      parsed.hostname = 'www.youtube-nocookie.com';
      return parsed.href;
    }
    return null;
  }

  if (host === 'www.youtube-nocookie.com') {
    return parsed.pathname.startsWith('/embed/') && parsed.pathname.length > '/embed/'.length
      ? parsed.href
      : null;
  }

  if (host === 'youtu.be') {
    const videoId = parsed.pathname.replace(/^\/+|\/+$/g, '');
    return YOUTUBE_ID_RE.test(videoId)
      ? `https://www.youtube-nocookie.com/embed/${videoId}`
      : null;
  }

  if (host === 'player.vimeo.com') {
    return parsed.pathname.startsWith('/video/') && parsed.pathname.length > '/video/'.length
      ? parsed.href
      : null;
  }

  if (host === 'vimeo.com') {
    const match = parsed.pathname.match(/^\/(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}` : null;
  }

  if (host === 'www.loom.com' || host === 'loom.com') {
    if (parsed.pathname.startsWith('/embed/') && parsed.pathname.length > '/embed/'.length) {
      parsed.hostname = 'www.loom.com';
      return parsed.href;
    }
    const shareMatch = parsed.pathname.match(/^\/share\/([A-Za-z0-9_-]+)/);
    return shareMatch ? `https://www.loom.com/embed/${shareMatch[1]}` : null;
  }

  if (host === 'res.cloudinary.com') {
    return parsed.href;
  }

  return null;
}
