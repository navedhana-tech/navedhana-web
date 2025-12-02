import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import logo from '../../public/assets/logo/NPA_Logo_Enlarge.png';
import blueLogo from '../../public/assets/logo/blueLogo_Englarge.png';
import orangeLogo from '../../public/assets/logo/orangeLogo_Englarge.png';

const Footer = () => {
    const location = useLocation();

    // Dynamic theme based on current page
    const getThemeColors = () => {
        switch (location.pathname) {
            case '/':
                return {
                    gradient: 'from-lime-500 to-lime-600',
                    accentColor: 'text-lime-400',
                    iconColor: 'text-lime-500',
                    bgGradient: 'from-lime-900 via-gray-800 to-black'
                };
            case '/vegetables':
                return {
                    gradient: 'from-green-500 to-emerald-600',
                    accentColor: 'text-green-400',
                    iconColor: 'text-green-500',
                    bgGradient: 'from-green-900 via-gray-800 to-black'
                };
            case '/about':
                return {
                    gradient: 'from-indigo-500 to-violet-600',
                    accentColor: 'text-indigo-400',
                    iconColor: 'text-indigo-500',
                    bgGradient: 'from-indigo-900 via-gray-800 to-black'
                };
            case '/software':
                return {
                    gradient: 'from-blue-500 to-cyan-600',
                    accentColor: 'text-blue-400',
                    iconColor: 'text-blue-500',
                    bgGradient: 'from-blue-900 via-gray-800 to-black'
                };
            case '/seasonal':
                return {
                    gradient: 'from-orange-500 to-amber-600',
                    accentColor: 'text-orange-400',
                    iconColor: 'text-orange-500',
                    bgGradient: 'from-orange-900 via-gray-800 to-black'
                };
            default:
                return {
                    gradient: 'from-green-500 to-emerald-600',
                    accentColor: 'text-green-400',
                    iconColor: 'text-green-500',
                    bgGradient: 'from-gray-900 via-gray-800 to-black'
                };
        }
    };

    const theme = getThemeColors();

    // Get logo based on current route
    const getCurrentLogo = () => {
        switch (location.pathname) {
            case '/software':
                return blueLogo;
            case '/seasonal':
                return orangeLogo;
            default:
                return logo;
        }
    };

    return (
        <footer id="footer" className={`bg-gradient-to-br ${theme.bgGradient} text-white relative overflow-hidden`}>
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzIyMiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-6 sm:mb-8 md:mb-12">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center">
                                <img src={getCurrentLogo()} alt="Navedhana" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <span className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent block">Navedhana</span>
                                <span className="text-xs sm:text-sm text-gray-400">Profit Amplifier Pvt. Ltd</span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 max-w-md">
                            Empowering growth through fresh produce, innovative software solutions,
                            and seasonal joy. Your trusted partner for quality and excellence.
                        </p>
                        {/* Social Media Icons */}
                        <div className="flex gap-4">
                            {[
                                { name: 'Instagram', icon: FaInstagram, link: 'https://instagram.com', color: 'hover:text-pink-500' },
                                { name: 'LinkedIn', icon: FaLinkedin, link: 'https://linkedin.com', color: 'hover:text-blue-500' },
                                { name: 'WhatsApp', icon: FaWhatsapp, link: 'https://wa.me/', color: 'hover:text-green-500' },
                                { name: 'Email', icon: FaEnvelope, link: 'mailto:info@navedhana.com', color: 'hover:text-orange-500' }
                            ].map((social) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all hover:scale-110 text-gray-300 ${social.color}`}
                                        title={social.name}
                                    >
                                        <IconComponent size={22} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className={`text-base sm:text-lg font-bold mb-3 sm:mb-6 bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                            Our Services
                        </h3>
                        <ul className="space-y-2 sm:space-y-3">
                            {[
                                { name: 'Vegetables Supply', path: '/vegetables' },
                                { name: 'Software Services', path: '/software' },
                                { name: 'Seasonal Products', path: '/seasonal' }
                            ].map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm sm:text-base"
                                    >
                                        <span className={`w-1.5 h-1.5 ${theme.iconColor} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}></span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className={`text-base sm:text-lg font-bold mb-3 sm:mb-6 bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                            Contact Us
                        </h3>
                        <ul className="space-y-2 sm:space-y-4">
                            <li className="flex items-start gap-2 sm:gap-3 text-gray-400 text-sm sm:text-base">
                                <Mail className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.iconColor} mt-0.5 flex-shrink-0`} />
                                <span className="break-all">info@navedhana.com</span>
                            </li>
                            <li className="flex items-start gap-2 sm:gap-3 text-gray-400 text-sm sm:text-base">
                                <Phone className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.iconColor} mt-0.5 flex-shrink-0`} />
                                <span>+91 123 456 7890</span>
                            </li>
                            <li className="flex items-start gap-2 sm:gap-3 text-gray-400 text-sm sm:text-base">
                                <MapPin className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.iconColor} mt-0.5 flex-shrink-0`} />
                                <span>Hyderabad, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-4 sm:pt-6 md:pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                        <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
                            &copy; {new Date().getFullYear()} Navedhana. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
