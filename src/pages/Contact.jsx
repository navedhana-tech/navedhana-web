import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // EmailJS configuration
            // You'll need to set these up in your EmailJS account
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

            // Prepare email template parameters
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone || 'Not provided',
                subject: formData.subject,
                message: formData.message,
                to_email: 'navedhanaprofitamplifier@gmail.com',
            };

            // Send email using EmailJS
            await emailjs.send(serviceId, templateId, templateParams, publicKey);

            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            
            // Reset status message after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            console.error('Email sending failed:', error);
            setIsSubmitting(false);
            setSubmitStatus('error');
            
            // Reset error message after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email Us',
            content: 'navedhanaprofitamplifier@gmail.com',
            link: 'mailto:navedhanaprofitamplifier@gmail.com',
            color: 'bg-blue-500'
        },
        {
            icon: Phone,
            title: 'Call Us',
            content: '+91 6305304978',
            link: 'tel:+916305304978',
            color: 'bg-green-500'
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            content: 'Hyderabad, India',
            link: '#',
            color: 'bg-orange-500'
        },
        {
            icon: Clock,
            title: 'Business Hours',
            content: 'Mon - Sat: 9:00 AM - 6:00 PM',
            link: '#',
            color: 'bg-purple-500'
        }
    ];

    const socialLinks = [
        { name: 'Instagram', icon: FaInstagram, link: 'https://www.instagram.com/navedhana.pvt.ltd/', color: 'hover:text-pink-500' },
        { name: 'LinkedIn', icon: FaLinkedin, link: 'https://www.linkedin.com/search/results/all/?heroEntityKey=urn%3Ali%3Aorganization%3A107910599&keywords=Navedhana%20Profit%20Amplifier%20Private%20Limited&origin=ENTITY_SEARCH_HOME_HISTORY&sid=wLX', color: 'hover:text-blue-500' },
        { name: 'WhatsApp', icon: FaWhatsapp, link: 'https://wa.me/916305304978', color: 'hover:text-green-500' },
        { name: 'Email', icon: FaEnvelope, link: 'mailto:navedhanaprofitamplifier@gmail.com', color: 'hover:text-orange-500' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-lime-50">
            {/* Hero Section */}
            <div className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden min-h-[40vh] sm:min-h-[50vh] flex items-center bg-gradient-to-br from-lime-50 via-white to-blue-50">
                {/* Abstract Background Shapes */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-30"
                            style={{
                                background: [
                                    'linear-gradient(to right, #84cc16, #3b82f6)',
                                    'linear-gradient(to right, #65a30d, #2563eb)',
                                    'linear-gradient(to right, #a3e635, #60a5fa)'
                                ][i % 3],
                                width: `${Math.random() * 400 + 200}px`,
                                height: `${Math.random() * 400 + 200}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                x: [0, Math.random() * 100 - 50, 0],
                                y: [0, Math.random() * 100 - 50, 0],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-2 sm:px-3 rounded-full bg-lime-100 text-lime-700 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 tracking-wide uppercase">
                            Get In Touch
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
                            Let's Start a <br className="hidden sm:block" />
                            <span className="bg-gradient-to-r from-lime-600 to-blue-600 bg-clip-text text-transparent">
                                Conversation
                            </span>
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                            Have a question or want to work together? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="py-8 sm:py-12 md:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 border border-gray-100"
                        >
                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-lime-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900">Send us a Message</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                                    <div>
                                        <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm rounded-lg sm:rounded-xl border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all outline-none"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm rounded-lg sm:rounded-xl border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all outline-none"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                                    <div>
                                        <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm rounded-lg sm:rounded-xl border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all outline-none"
                                            placeholder="+91 1234567890"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm rounded-lg sm:rounded-xl border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all outline-none"
                                            placeholder="How can we help?"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm rounded-lg sm:rounded-xl border border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all outline-none resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-start gap-2 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg sm:rounded-xl text-green-700 text-xs sm:text-sm"
                                    >
                                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                                        <span className="font-medium">Message sent successfully! We'll get back to you soon.</span>
                                    </motion.div>
                                )}

                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-start gap-2 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl text-red-700 text-xs sm:text-sm"
                                    >
                                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                                        <span className="font-medium">Failed to send message. Please try again or contact us directly at navedhanaprofitamplifier@gmail.com</span>
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-lime-600 to-blue-600 text-white rounded-lg sm:rounded-xl font-bold text-sm sm:text-base hover:from-lime-700 hover:to-blue-700 transition-all shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span className="text-xs sm:text-sm">Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                        {/* Contact Information */}
                        <div className="space-y-3 sm:space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Contact Information</h2>
                                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                                    Reach out to us through any of these channels. We're here to help and answer any questions you may have.
                                </p>
                            </motion.div>

                            <div className="space-y-2 sm:space-y-3">
                                {contactInfo.map((info, idx) => {
                                    const IconComponent = info.icon;
                                    return (
                                        <motion.a
                                            key={idx}
                                            href={info.link}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                            whileHover={{ x: 5 }}
                                            className="block p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all group"
                                        >
                                            <div className="flex items-start gap-2 sm:gap-3">
                                                <div className={`w-8 h-8 sm:w-10 sm:h-10 ${info.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5 sm:mb-1">{info.title}</h3>
                                                    <p className="text-xs sm:text-sm text-gray-600 break-words">{info.content}</p>
                                                </div>
                                            </div>
                                        </motion.a>
                                    );
                                })}
                            </div>

                            {/* Social Media */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="pt-3 sm:pt-4"
                            >
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">Follow Us</h3>
                                <div className="flex gap-2 sm:gap-3">
                                    {socialLinks.map((social) => {
                                        const IconComponent = social.icon;
                                        return (
                                            <a
                                                key={social.name}
                                                href={social.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`w-8 h-8 sm:w-10 sm:h-10 bg-white hover:bg-gray-50 rounded-lg flex items-center justify-center transition-all hover:scale-110 shadow-lg border border-gray-100 text-gray-700 ${social.color}`}
                                                title={social.name}
                                            >
                                                <IconComponent size={16} className="sm:w-5 sm:h-5" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Contact;

