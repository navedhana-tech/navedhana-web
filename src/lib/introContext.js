import { createContext, useContext } from 'react';

// Whether the opening logo intro (src/components/intro/LogoIntro.jsx) has
// finished — lets the hero's network/content gate its entrance on intro
// completion instead of firing the moment they mount underneath it.
// Defaults to true so any consumer outside the provider (or before the
// intro decides whether to run) behaves exactly as if there were no intro.
export const IntroContext = createContext(true);

export const useIntroDone = () => useContext(IntroContext);
