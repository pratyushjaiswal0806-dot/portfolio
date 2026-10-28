import { useEffect } from 'react';
import { SITE_URL } from '../data/site';

interface PageMeta {
  title: string;
  description: string;
  path: string;
}

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/** index.html carries default tags for crawlers that don't run JS;
 *  each page updates those same tags in place instead of adding duplicates. */
export const usePageMeta = ({ title, description, path }: PageMeta) => {
  useEffect(() => {
    const url = SITE_URL + path;
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;
  }, [title, description, path]);
};
