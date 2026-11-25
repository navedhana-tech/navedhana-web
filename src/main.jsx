import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import './index.css'
import App from './App.jsx'

// GA4 only when an ID is configured — otherwise the page would request
// gtag/js?id=%VITE_GA_MEASUREMENT_ID% and track nothing.
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (GA_ID && typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(s);
}

// createRoot, not hydrateRoot: the prerendered HTML is captured with reduced
// motion and every scroll reveal finished (so crawlers see the content),
// which can never match a normal visitor's first render.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Dispatch event for prerender plugin to know when rendering is complete
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.dispatchEvent(new Event('render-complete'));
    }, 100);
  });
}
