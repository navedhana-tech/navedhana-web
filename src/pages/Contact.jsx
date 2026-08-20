import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import SectionKicker from '../components/ui/SectionKicker';
import Button from '../components/ui/Button';
import { canHover } from '../lib/canHover';

const inputClasses =
  'w-full px-4 py-3.5 rounded-xl bg-ink/[0.035] border border-ink/15 text-ink placeholder:text-muted/50 text-[14.5px] focus:ring-2 focus:ring-electric focus:border-transparent transition-all outline-none';

// Local, self-contained page effects (scroll progress + cursor glow) — not
// shared components, this is the one page in the design that has them.
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

function useCursorGlow(ref) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Bail on touch too: the glow follows a cursor that doesn't exist there,
    // and the rAF loop below would otherwise run forever for nothing.
    if (reduced || !canHover()) return undefined;
    const target = { x: -9999, y: -9999 };
    const current = { x: -9999, y: -9999 };
    const onMove = (e) => { target.x = e.clientX; target.y = e.clientY; };
    window.addEventListener('mousemove', onMove, { passive: true });
    let raf;
    const loop = () => {
      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;
      if (ref.current) ref.current.style.transform = `translate3d(${current.x - 230}px, ${current.y - 230}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
}

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const progressRef = useRef(null);
  const glowRef = useRef(null);
  useScrollProgress(progressRef);
  useCursorGlow(glowRef);

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
        to_email: 'navedhanaprofitamplifier@gmail.com',
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setIsSubmitting(false);
      setFormSent(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Email sending failed: ', error);
      setIsSubmitting(false);
      alert('Failed to send message. Please try again or contact us directly at navedhanaprofitamplifier@gmail.com');
    }
  };

  return (
    <div className="bg-primary relative">
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[70] bg-ink/5">
        <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-electric to-royal" />
      </div>
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[460px] h-[460px] rounded-full pointer-events-none z-[1] hidden lg:block"
        style={{ background: 'radial-gradient(circle, oklch(55% 0.19 232 / 0.16), transparent 70%)', filter: 'blur(10px)' }}
      />

      <section className="pt-[104px] sm:pt-[168px] pb-6 px-4 sm:px-8 max-w-7xl mx-auto text-center">
        <SectionKicker centered className="mb-3.5">Contact Us</SectionKicker>
        <h1 className="font-display text-[28px] sm:text-[44px] font-bold tracking-tight text-ink">Tell us your goals</h1>
      </section>

      <section className="py-6 pb-14 px-4 sm:px-8 max-w-[1180px] mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 1.05, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center order-2 md:order-1"
          >
            <img
              src="/assets/redesign/leaf-binary-art.png"
              alt="Navedhana"
              className="w-full max-w-[340px] h-auto rounded-2xl"
              style={{ filter: 'drop-shadow(0 0 40px oklch(55% 0.19 232 / 0.25))' }}
            />
          </motion.div>

          <div className="order-1 md:order-2">
            <AnimatePresence mode="wait">
              {formSent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-5 sm:p-8 rounded-2xl bg-ink/[0.04] border border-ink/15 text-center"
                >
                  <div className="font-display text-xl font-semibold text-ink mb-2">Thanks — message received.</div>
                  <p className="text-sm text-muted">We'll get back to you shortly at the email you provided.</p>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  <input name="name" placeholder="Name" required value={formData.name} onChange={handleChange} className={inputClasses} />
                  <input name="email" type="email" placeholder="Your email" required value={formData.email} onChange={handleChange} className={inputClasses} />
                  <input name="phone" type="tel" placeholder="Mobile number" value={formData.phone} onChange={handleChange} className={inputClasses} />
                  <textarea
                    name="message"
                    placeholder="Additional message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClasses} resize-y rounded-xl`}
                  />
                  <Button type="submit" disabled={isSubmitting} className="self-start mt-1 disabled:opacity-50">
                    {isSubmitting ? 'Sending…' : 'Submit ↗'}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="py-6 px-4 sm:px-8 border-y border-ink/15">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-9 text-[13.5px] text-muted">
          <span>Phone: <span className="text-ink">+91 63053 04978</span></span>
          <span>Email: <span className="text-ink">navedhanaprofitamplifier@gmail.com</span></span>
          <span>Remote-First · Serving Clients Worldwide</span>
        </div>
      </section>
    </div>
  );
};

export default Contact;
