import type { ComponentType } from 'react';

export interface NoteMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
  minutes: number;
}

type MdxModule = { default: ComponentType<{ components?: Record<string, ComponentType<any>> }> };

/* Published notes live in content/notes, drafts in content/drafts. Drafts are
   only globbed in dev, so they never reach a production bundle.
   Raw text gives frontmatter and reading time without pulling every compiled
   note into the main bundle; bodies load lazily per page. */
const rawNotes = import.meta.env.DEV
  ? import.meta.glob<string>(['/content/notes/*.mdx', '/content/drafts/*.mdx'], { query: '?raw', import: 'default', eager: true })
  : import.meta.glob<string>('/content/notes/*.mdx', { query: '?raw', import: 'default', eager: true });
const noteLoaders = import.meta.env.DEV
  ? import.meta.glob<MdxModule>(['/content/notes/*.mdx', '/content/drafts/*.mdx'])
  : import.meta.glob<MdxModule>('/content/notes/*.mdx');

const parseValue = (value: string): string | boolean | string[] => {
  const v = value.trim();
  if (v === 'true' || v === 'false') return v === 'true';
  if (v.startsWith('[') && v.endsWith(']')) {
    return v.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
  }
  return v.replace(/^["']|["']$/g, '');
};

const parse = (path: string, source: string): NoteMeta => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data: Record<string, string | boolean | string[]> = {};
  match?.[1].split(/\r?\n/).forEach((line) => {
    const i = line.indexOf(':');
    if (i > 0) data[line.slice(0, i).trim()] = parseValue(line.slice(i + 1));
  });
  const body = match ? source.slice(match[0].length) : source;
  const words = body.replace(/[#>*_`\-[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;
  const slug = path.split('/').pop()!.replace(/\.mdx$/, '');

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ''),
    summary: String(data.summary ?? ''),
    tags: Array.isArray(data.tags) ? data.tags : [],
    draft: path.startsWith('/content/drafts/'),
    minutes: Math.max(1, Math.round(words / 220)),
  };
};

export const notes: NoteMeta[] = Object.entries(rawNotes)
  .map(([path, source]) => parse(path, source))
  .sort((a, b) => b.date.localeCompare(a.date));

export const hasNotes = notes.length > 0;

export const getNote = (slug: string | undefined) => notes.find((n) => n.slug === slug);

export const loadNote = (slug: string) =>
  (noteLoaders[`/content/notes/${slug}.mdx`] ?? noteLoaders[`/content/drafts/${slug}.mdx`])?.();

export const formatNoteDate = (date: string) =>
  date
    ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';
