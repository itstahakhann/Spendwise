/**
 * Resolve a path to a public asset so it works in every environment:
 *   - Vite dev server (root: "/")
 *   - Vite preview
 *   - Electron file:// (base: "./")
 *   - Deployed on a subpath (base: "/my-app/")
 *
 * Usage: asset('logo.png')  →  '/logo.png'  or  './logo.png'
 */
export const asset = (path: string): string => {
  // Strip leading slash so we can safely prefix the base
  const clean = path.replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL ?? '/';
  // BASE_URL always ends with "/" (Vite guarantees this)
  return `${base}${clean}`;
};