import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import LogoMark from './intro/LogoMark';
import TypingText from './ui/TypingText';

const siteLinks = [
 { name: 'Home', path: '/' },
 { name: 'Services', path: '/services' },
 { name: 'About', path: '/about' },
 { name: 'Contact', path: '/contact' },
];

const otherVentures = [
 { name: 'Vegetables Supply', path: '/vegetables' },
 { name: 'Seasonal Products', path: '/seasonal' },
];

const Footer = () => {
 return (
 <footer id="footer" className="bg-surface text-ink relative overflow-hidden border-t border-white/5">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 relative z-10">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-6 sm:mb-8 md:mb-12">
 {/* Brand */}
 <div className="col-span-2 md:col-span-2 flex flex-col items-center md:items-start">
 <div className="flex items-center gap-3 mb-4 sm:mb-6">
 <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
 <LogoMark size={48} className="w-full h-full object-contain" />
 </div>
 <span className="font-display font-bold text-xl sm:text-2xl text-ink block">Navedhana</span>
 </div>
 <p className="text-muted text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 max-w-md text-center md:text-left">
 <TypingText
 text="A software engineering and AI company building intelligent digital products — web, mobile, desktop, cloud, and AI."
 speed={12}
 />
 </p>
 <div className="flex gap-4 justify-center md:justify-start">
 {[
 { name: 'Instagram', icon: FaInstagram, link: 'https://www.instagram.com/navedhana.pvt.ltd/', color: 'hover:text-pink-400' },
 { name: 'LinkedIn', icon: FaLinkedin, link: 'https://www.linkedin.com/search/results/all/?heroEntityKey=urn%3Ali%3Aorganization%3A107910599&keywords=Navedhana%20Profit%20Amplifier%20Private%20Limited&origin=ENTITY_SEARCH_HOME_HISTORY&sid=wLX', color: 'hover:text-electric' },
 { name: 'WhatsApp', icon: FaWhatsapp, link: 'https://wa.me/', color: 'hover:text-green' },
 { name: 'Email', icon: FaEnvelope, link: 'mailto:navedhanaprofitamplifier@gmail.com', color: 'hover:text-orange' },
 ].map((social) => {
 const IconComponent = social.icon;
 return (
 <a
 key={social.name}
 href={social.link}
 target="_blank"
 rel="noopener noreferrer"
 className={`w-10 h-10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110 text-muted ${social.color}`}
 title={social.name}
 >
 <IconComponent size={22} />
 </a>
 );
 })}
 </div>
 </div>

 {/* Site links */}
 <div>
 <h3 className="text-base sm:text-lg font-display font-bold mb-3 sm:mb-6 text-electric">
 <TypingText text="Navigate" speed={40} />
 </h3>
 <ul className="space-y-2 sm:space-y-3">
 {siteLinks.map((item) => (
 <li key={item.path}>
 <Link
 to={item.path}
 className="text-muted hover:text-ink transition-colors text-xs sm:text-sm md:text-base"
 >
 <TypingText text={item.name} speed={28} />
 </Link>
 </li>
 ))}
 </ul>
 </div>

 {/* Contact */}
 <div>
 <h3 className="text-base sm:text-lg font-display font-bold mb-3 sm:mb-6 text-electric">
 <TypingText text="Contact Us" speed={40} />
 </h3>
 <ul className="space-y-2 sm:space-y-4">
 <li className="flex items-start gap-2 sm:gap-3 text-muted text-xs sm:text-sm md:text-base">
 <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-electric mt-0.5 flex-shrink-0" />
 <span className="break-all">
 <TypingText text="navedhanaprofitamplifier@gmail.com" speed={18} />
 </span>
 </li>
 <li className="flex items-start gap-2 sm:gap-3 text-muted text-xs sm:text-sm md:text-base">
 <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-electric mt-0.5 flex-shrink-0" />
 <span>
 <TypingText text="+91 6305304978" speed={28} />
 </span>
 </li>
 <li className="flex items-start gap-2 sm:gap-3 text-muted text-xs sm:text-sm md:text-base">
 <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-electric mt-0.5 flex-shrink-0" />
 <span className="break-words">
 <TypingText text="Hyderabad, India" speed={28} />
 </span>
 </li>
 </ul>
 </div>
 </div>

 {/* Bottom Bar */}
 <div className="pt-4 sm:pt-6 md:pt-8 border-t border-white/10">
 <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
 <p className="text-muted/70 text-xs sm:text-sm text-center md:text-left">
 &copy; {new Date().getFullYear()} Navedhana. All rights reserved.
 <span className="hidden md:inline"> | </span>
 <span className="block md:inline mt-1 md:mt-0 md:ml-1">
 Developed &amp; maintained by Navedhana Profit Amplifier Private Limited
 </span>
 </p>
 <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted/70">
 <span className="text-muted/50">Other Ventures:</span>
 {otherVentures.map((v, i) => (
 <React.Fragment key={v.path}>
 <Link to={v.path} className="hover:text-ink transition-colors">{v.name}</Link>
 {i < otherVentures.length - 1 && <span className="text-muted/30">·</span>}
 </React.Fragment>
 ))}
 </div>
 </div>
 </div>
 </div>
 </footer>
 );
};

export default Footer;
