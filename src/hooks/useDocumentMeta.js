import { useEffect } from 'react';

const SITE_NAME = 'Bayu Adji Ramadhan';
const SITE_ORIGIN = 'https://bayuadjr.vercel.app';
const DEFAULT_DESCRIPTION =
  'Portfolio and personal notebook of Bayu Adji Ramadhan, an anthropology student exploring people, systems, data, and software tools.';

function setMetaTag(selector, attrName, attrValue, content) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonicalLink(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Syncs per-route document title, description, Open Graph tags, and canonical URL.
 */
export function useDocumentMeta({ title, description, path = '/' } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const metaDescription = description || DEFAULT_DESCRIPTION;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${SITE_ORIGIN}${normalizedPath}`;

    document.title = fullTitle;
    setMetaTag('meta[name="description"]', 'name', 'description', metaDescription);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', metaDescription);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setCanonicalLink(canonicalUrl);
  }, [title, description, path]);
}
