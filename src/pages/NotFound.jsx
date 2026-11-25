import React from 'react';
import SectionKicker from '../components/ui/SectionKicker';
import Button from '../components/ui/Button';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

// Catch-all route. The host rewrites every path to index.html with a 200, so
// noindex is what keeps mistyped URLs out of search results.
const NotFound = () => {
  useDocumentMeta({
    title: 'Page not found — Navedhana',
    description: "The page you're looking for doesn't exist.",
    noindex: true,
  });

  return (
    <div className="bg-primary min-h-[60vh]">
      <section className="pt-[104px] sm:pt-[168px] pb-24 px-4 sm:px-8 max-w-2xl mx-auto text-center">
        <SectionKicker centered className="mb-3.5">404</SectionKicker>
        <h1 className="font-display text-[28px] sm:text-4xl font-semibold tracking-tight text-ink mb-3">Page not found</h1>
        <p className="text-[14.5px] text-muted mb-8">This page doesn't exist or has moved.</p>
        <Button to="/">Back to home</Button>
      </section>
    </div>
  );
};

export default NotFound;
