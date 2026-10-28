import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from './components/layout/RootLayout';
import HomePage from './pages/HomePage';
import RouteError from './pages/RouteError';

/* Pages other than home are code-split. Route-level `lazy` (rather than
   React.lazy) lets the router load the chunk before it commits the
   navigation, so view transitions never capture a loading fallback. */
const page = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({
  Component: (await load()).default,
});

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary: RouteError,
    HydrateFallback: () => <div className="min-h-screen bg-obsidian" />,
    children: [
      {
        // Pathless wrapper so page errors render inside the layout.
        ErrorBoundary: RouteError,
        children: [
          { index: true, Component: HomePage },
          { path: 'work', lazy: page(() => import('./pages/WorkPage')) },
          { path: 'work/:slug', lazy: page(() => import('./pages/CaseStudyPage')) },
          { path: 'about', lazy: page(() => import('./pages/AboutPage')) },
          { path: 'lab', lazy: page(() => import('./pages/LabPage')) },
          { path: 'notes', lazy: page(() => import('./pages/NotesPage')) },
          { path: 'notes/:slug', lazy: page(() => import('./pages/NotePage')) },
          { path: 'colophon', lazy: page(() => import('./pages/ColophonPage')) },
          { path: '*', lazy: page(() => import('./pages/NotFoundPage')) },
        ],
      },
    ],
  },
]);
