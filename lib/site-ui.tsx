import { createContext, useContext } from 'react';

export interface SiteUI {
  openPalette: () => void;
  inspect: boolean;
  toggleInspect: () => void;
  replayLoader: () => void;
  notify: (message: string) => void;
}

export const SiteUIContext = createContext<SiteUI | null>(null);

export const useSiteUI = (): SiteUI => {
  const ctx = useContext(SiteUIContext);
  if (!ctx) throw new Error('useSiteUI must be used inside RootLayout');
  return ctx;
};
