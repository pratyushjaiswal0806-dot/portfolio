import path from 'path';
import { execSync } from 'child_process';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeShiki from '@shikijs/rehype';

/** Short commit sha shown in the hero status panel, footer and colophon.
 *  Vercel exposes the full sha as an env var; locally we ask git. */
const buildSha = (): string => {
  const fromEnv = process.env.VERCEL_GIT_COMMIT_SHA;
  if (fromEnv) return fromEnv.slice(0, 7);
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return 'dev';
  }
};

/* Notes are compiled by MDX, except `?raw` imports (lib/notes.ts reads
   frontmatter from the raw text), which must reach Vite untouched. */
const mdxPlugin = mdx({
  remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
  rehypePlugins: [[rehypeShiki, { theme: 'github-dark-dimmed' }]],
});
const notesPlugin = {
  ...mdxPlugin,
  enforce: 'pre',
  transform(this: unknown, code: string, id: string) {
    if (id.includes('?')) return null;
    return (mdxPlugin.transform as Function).call(this, code, id);
  },
} as Plugin;

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [
    notesPlugin,
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    tailwindcss(),
  ],
  define: {
    __BUILD_SHA__: JSON.stringify(buildSha()),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  optimizeDeps: {
    // cmdk is only imported lazily (first ⌘K); pre-bundle it so dev doesn't reload mid-session.
    include: ['cmdk'],
  },
  build: {
    rollupOptions: {
      output: {
        // Long-lived vendor chunks: app deploys don't bust the framework cache.
        manualChunks: {
          react: ['react', 'react-dom', 'react-dom/client', 'react-router', 'react-router/dom'],
          motion: ['framer-motion'],
          spring: ['@react-spring/web', '@use-gesture/react'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
