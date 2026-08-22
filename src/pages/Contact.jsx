import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Phone, Mail, Clock } from 'lucide-react';
import SectionKicker from '../components/ui/SectionKicker';
import Button from '../components/ui/Button';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

// Replaces the old decorative leaf-art image — real contact info instead of
// empty decoration, and it absorbs the separate phone/email/availability
// strip that used to sit below the form, so that fact isn't stated twice.
// "Response Time" replaces the old "Availability" slot — reachability and
// reply speed are what a first-time visitor actually needs to know, not a
// generic "remote-first" line.
const CONTACT_POINTS = [
  { icon: Phone, label: 'Phone', value: '+91 63053 04978', href: 'tel:+916305304978' },
  { icon: Mail, label: 'Email', value: 'contact@navedhana.com', href: 'mailto:contact@navedhana.com' },
  { icon: Clock, label: 'Response Time', value: 'Within one business day', href: null },
];

const labelClasses = 'block text-[12.5px] font-semibold text-ink/80 mb-1.5';
const inputClasses =
  'w-full px-4 py-3.5 rounded-xl bg-card border border-ink/12 text-ink placeholder:text-muted/50 text-[14.5px] transition-all outline-none hover:border-ink/25 focus:border-electric focus:ring-2 focus:ring-electric/20';

// Local, self-contained page effect (scroll progress) — not a shared
// component, this is the one page in the design that has it.
function useScrollProgress(ref) {
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${pct})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);
}

const Contact = () => {
  useDocumentMeta({
    title: 'Contact Navedhana — Software Development & AI Consulting',
    description:
      "Tell us the problem — you don't need to know whether you need AI, automation, or custom software. Get in touch with Navedhana's software and AI engineering team.",
  });

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const progressRef = useRef(null);
  useScrollProgress(progressRef);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        subject: 'Website Contact Form',
        message: formData.message,
        to_email: 'contact@navedhana.com',
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setIsSubmitting(false);
      setFormSent(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Email sending failed: ', error);
      setIsSubmitting(false);
      alert('Failed to send message. Please try again or contact us directly at contact@navedhana.com');
    }
  };

  return (
    <div className="bg-primary relative">
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[70] bg-ink/5">
        <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-electric to-royal" />
      </div>

      {/* Compact hero, tuned so navbar + hero + the full form all land in one
          1440x900 viewport without scrolling — every margin below is sized
          against that budget, not just "smaller than before". */}
      <section className="pt-[88px] sm:pt-[112px] pb-0 px-4 sm:px-8 max-w-7xl mx-auto text-center">
        <SectionKicker centered className="mb-4">Contact Us</SectionKicker>
        <h1 className="font-display text-[28px] sm:text-[44px] font-bold tracking-tight text-ink mb-5">
          Tell us the problem.
        </h1>
        <p className="text-[15px] sm:text-base leading-relaxed text-muted max-w-xl mx-auto">
          You don't need to know whether you need AI, automation, or custom software. Tell us what you're trying to
          solve, build, or improve. We'll help you figure out the right approach.
        </p>
      </section>

      {/* Very low-opacity dot grid (.contact-dot-grid, index.css) — the one
          brand detail on this page, a nod to "engineering/systems" without
          competing with the text sitting on top of it. */}
      <section className="relative pt-8 pb-10 px-4 sm:px-8 max-w-[1180px] mx-auto">
        <div className="contact-dot-grid absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden="true" />
        <div className="relative grid md:grid-cols-5 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2"
          >
            <SectionKicker className="mb-[18px]">Get in Touch</SectionKicker>
            <h2 className="font-display text-2xl sm:text-[28px] font-bold tracking-tight text-ink mb-3">
              Let's talk about the problem.
            </h2>
            <p className="text-[14.5px] font-semibold text-electric mb-[18px]">We usually reply within one business day.</p>
            <p className="text-[14.5px] leading-relaxed text-muted mb-7 max-w-md">
              Tell us what you're building, what isn't working, or what you're trying to improve. No obligation, no
              sales pitch. If custom software isn't the right answer, we'll tell you.
            </p>
            <div className="flex flex-col gap-3.5">
              {CONTACT_POINTS.map((c) => {
                const Tag = c.href ? 'a' : 'div';
                return (
                  <Tag key={c.label} href={c.href ?? undefined} className="group flex items-center gap-3.5">
                    <span className="w-11 h-11 rounded-xl bg-electric/[0.08] border border-electric/20 flex items-center justify-center text-electric flex-shrink-0">
                      <c.icon size={18} />
                    </span>
                    <span>
                      <span className="block font-display text-[10.5px] font-bold uppercase tracking-wide text-muted">{c.label}</span>
                      <span className="block text-[14.5px] font-semibold text-ink group-hover:text-electric transition-colors break-words">
                        {c.value}
                      </span>
                    </span>
                  </Tag>
                );
              })}
            </div>
          </motion.div>

          <div className="md:col-span-3">
            <AnimatePresence mode="wait">
              {formSent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 sm:p-8 rounded-2xl bg-card border border-ink/12 shadow-sm text-center"
                >
                  <div className="font-display text-xl font-semibold text-ink mb-2">Thanks — message received.</div>
                  <p className="text-sm text-muted">We'll get back to you shortly at the email you provided.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3.5 px-7 py-6 sm:px-9 sm:py-6 rounded-2xl bg-card border border-ink/12 shadow-sm"
                >
                  <div>
                    <label htmlFor="name" className={labelClasses}>Name</label>
                    <input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClasses}>Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClasses}>
                      Phone number <span className="text-muted font-normal">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className={labelClasses}>Tell us about the problem</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Briefly describe what you're trying to solve, build, or improve."
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputClasses} min-h-[100px] resize-y`}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <Button type="submit" disabled={isSubmitting} className="disabled:opacity-50">
                      {isSubmitting ? 'Sending…' : 'Start the Conversation →'}
                    </Button>
                    <p className="text-[12.5px] text-muted">
                      We'll review your message and get back to you within one business day.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
