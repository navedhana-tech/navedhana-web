import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzIyMiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-2xl">N</span>
                            </div>
                            <span className="font-bold text-3xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Navedhana</span>
                        </div>
                        <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-md">
                            Empowering growth through fresh produce, innovative software solutions,
                            and seasonal joy. Your trusted partner for quality and excellence.
                        </p>
                        <div className="flex gap-4">
                            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                                >
                                    <span className="sr-only">{social}</span>
                                    <div className="w-5 h-5 bg-gray-400 rounded"></div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                            Our Services
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'Vegetables Supply', path: '/vegetables' },
                                { name: 'Software Services', path: '/software' },
                                { name: 'Seasonal Products', path: '/seasonal' }
                            ].map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <Mail className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>info@navedhana.com</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-400">
                                <Phone className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>+91 123 456 7890</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-400">
                                <MapPin className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Hyderabad, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} Navedhana. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-gray-500">
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
