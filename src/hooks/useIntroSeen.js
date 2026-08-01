import { useState } from 'react';

const KEY = 'navedhana-intro-seen';

// Sessionstorage flag — the intro plays once per session, not on every visit to "/".
export function useIntroSeen() {
  const [seen, setSeen] = useState(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem(KEY) === '1';
  });

  const markSeen = () => {
    sessionStorage.setItem(KEY, '1');
    setSeen(true);
  };

  return [seen, markSeen];
}
