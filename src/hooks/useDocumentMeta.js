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
//
// It also rewrites the JSON-LD in index.html (#structured-data) for this page:
// the WebPage node and breadcrumb describe THIS route instead of the home page,
// and `schema` (extra nodes such as Service or FAQPage) is appended. Pass
// `schema` as a module-level constant: it is an effect dependency.
const SITE = 'https://www.navedhana.com';
const crumbName = (seg) => seg.split('-').map((w) => (w === 'ai' ? 'AI' : w[0].toUpperCase() + w.slice(1))).join(' ');

export function useDocumentMeta({ title, description, noindex, schema }) {
  useEffect(() => {
    const ld = document.getElementById('structured-data');
    const prevLd = ld ? ld.textContent : null;
    if (ld && !noindex) {
      try {
        const data = JSON.parse(prevLd);
        const { pathname } = window.location;
        const url = SITE + pathname;
        const crumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE }];
        if (pathname !== '/') crumbs.push({ '@type': 'ListItem', position: 2, name: crumbName(pathname.split('/')[1]), item: url });
        data['@graph'] = data['@graph'].map((n) => {
          if (n['@type'] === 'WebPage') return { ...n, '@id': `${url}#webpage`, url, name: title || n.name, description: description || n.description, breadcrumb: { '@id': `${url}#breadcrumb` } };
          if (n['@type'] === 'BreadcrumbList') return { ...n, '@id': `${url}#breadcrumb`, itemListElement: crumbs };
          return n;
        }).concat(schema || []);
        ld.textContent = JSON.stringify(data);
      } catch {
        // Leave the sitewide defaults in place.
      }
    }

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
      if (ld) ld.textContent = prevLd;
      document.title = prevTitle;
      tags.forEach((tag, i) => tag && prevValues[i] !== null && tag.setAttribute('content', prevValues[i]));
      robotsTags.forEach((tag, i) => tag && prevRobots[i] !== null && tag.setAttribute('content', prevRobots[i]));
    };
  }, [title, description, noindex, schema]);
}
