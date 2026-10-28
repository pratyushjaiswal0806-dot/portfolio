/* Asset, CSS and `?raw` module types come from vite/client (see tsconfig). */

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  export const frontmatter: Record<string, unknown>;
  const MDXContent: ComponentType<{ components?: Record<string, ComponentType<any>> }>;
  export default MDXContent;
}

/** Injected by vite.config.ts `define`. */
declare const __BUILD_SHA__: string;
declare const __BUILD_DATE__: string;
