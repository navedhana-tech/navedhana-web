import { useEffect } from 'react';

// Per-route <title> and meta description. index.html carries good sitewide
// defaults but nothing varies them per page, so every route shared one title.
//
// Done with plain DOM rather than adding react-helmet: this is the only thing
// the app needs from a head manager, and scripts/prerender-routes.js drives
// real Chrome and waits for render, so whatever is set here is captured in the
// prerendered HTML for crawlers.
//
// Restores the previous values on unmount so a route that does not call this
// hook still shows the index.html defaults rather than the last page's.
export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    const prevTitle = document.title;
    const tag = document.querySelector('meta[name="description"]');
    const prevDesc = tag ? tag.getAttribute('content') : null;

    if (title) document.title = title;
    if (description && tag) tag.setAttribute('content', description);

    return () => {
      document.title = prevTitle;
      if (tag && prevDesc !== null) tag.setAttribute('content', prevDesc);
    };
  }, [title, description]);
}
