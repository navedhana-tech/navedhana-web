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
const OG_SELECTORS = [
  'meta[name="description"]',
  'meta[property="og:title"]',
  'meta[property="og:description"]',
  'meta[name="twitter:title"]',
  'meta[name="twitter:description"]',
];

// noindex: true keeps the page live for visitors but asks search engines not
// to promote it — for side-venture pages (vegetables, seasonal, solar) that
// shouldn't compete with the software/AI business in search results.
export function useDocumentMeta({ title, description, noindex }) {
  useEffect(() => {
    const prevTitle = document.title;
    const tags = OG_SELECTORS.map((sel) => document.querySelector(sel));
    const prevValues = tags.map((tag) => (tag ? tag.getAttribute('content') : null));
    const robotsTags = [document.querySelector('meta[name="robots"]'), document.querySelector('meta[name="googlebot"]')];
    const prevRobots = robotsTags.map((tag) => (tag ? tag.getAttribute('content') : null));

    if (title) {
      document.title = title;
      if (tags[1]) tags[1].setAttribute('content', title);
      if (tags[3]) tags[3].setAttribute('content', title);
    }
    if (description) {
      [tags[0], tags[2], tags[4]].forEach((tag) => tag && tag.setAttribute('content', description));
    }
    if (noindex) {
      robotsTags.forEach((tag) => tag && tag.setAttribute('content', 'noindex, follow'));
    }

    return () => {
      document.title = prevTitle;
      tags.forEach((tag, i) => tag && prevValues[i] !== null && tag.setAttribute('content', prevValues[i]));
      robotsTags.forEach((tag, i) => tag && prevRobots[i] !== null && tag.setAttribute('content', prevRobots[i]));
    };
  }, [title, description, noindex]);
}
