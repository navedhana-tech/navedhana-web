import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../lib/analytics';

const MILESTONES = [25, 50, 75, 100];

// Fires a scroll_depth event once per milestone per page view. Mounted once
// at the app root rather than per-page, so it doesn't need re-wiring as pages
// are added or changed.
export function useScrollDepth() {
  const { pathname } = useLocation();
  const firedRef = useRef(new Set());

  useEffect(() => {
    firedRef.current = new Set();

    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = (window.scrollY / scrollable) * 100;

      for (const milestone of MILESTONES) {
        if (percent >= milestone && !firedRef.current.has(milestone)) {
          firedRef.current.add(milestone);
          trackEvent('scroll_depth', { percent: milestone, path: pathname });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);
}
