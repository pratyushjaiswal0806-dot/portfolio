/* Browser storage can throw (private mode, blocked site data), so every
   access goes through these wrappers and the site works without it. */

export const readSession = (key: string): string | null => {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
};

export const writeSession = (key: string, value: string | null) => {
  try {
    if (value === null) window.sessionStorage.removeItem(key);
    else window.sessionStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
};

export const readLocal = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const writeLocal = (key: string, value: string | null) => {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
};
