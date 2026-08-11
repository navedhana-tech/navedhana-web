import React from 'react';
import SectionKicker from '../components/ui/SectionKicker';
import Button from '../components/ui/Button';

const Vegetables = () => (
  <div className="bg-primary min-h-[60vh]">
    <section className="pt-[168px] pb-20 px-4 sm:px-8 max-w-xl mx-auto">
      <SectionKicker className="mb-3.5">Other Ventures</SectionKicker>
      <h1 className="font-display text-[26px] sm:text-[34px] font-semibold tracking-tight text-ink mb-4">Vegetable Service</h1>
      <p className="text-[14.5px] leading-relaxed text-muted mb-4">
        Navedhana also runs a small vegetables and seasonal-produce supply service. It's a separate offering from our
        software and AI work — our primary focus remains custom software, AI engineering, and product development.
      </p>
      <p className="text-[14.5px] leading-relaxed text-muted mb-7">Get in touch if you'd like to know more.</p>
      <Button to="/contact" size="sm">Contact us →</Button>
    </section>
  </div>
);

export default Vegetables;
