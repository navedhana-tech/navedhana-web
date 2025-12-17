import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
const vegImage = '/assets/other/Vegetables.webp';
const softImage = '/assets/other/Software.webp';
const companyImage = '/assets/logo/NPA_Logo_WithoutText.png';
const whitecompanyImage = '/assets/logo/NPA_Logo_whiteWithoutText.png';

const Home = () => {
    const services = [
        {
            title: "Vegetables Supply",
            description: "Farm-fresh, organic vegetables delivered with love and care to your doorstep.",
            gradient: "from-lime-500 to-lime-600",
            bgGradient: "from-lime-50 to-lime-100",
            link: "/vegetables",
            features: ["100% Organic", "Farm Fresh", "Growing"],
            image: vegImage
        },
        {
            title: "Software Solutions",
            description: "Innovative digital solutions and AI agents that transform businesses and drive growth.",
            gradient: "from-blue-500 to-cyan-600",
            bgGradient: "from-blue-50 to-cyan-50",
            link: "/software",
            features: ["AI Solutions", "Innovative", "Scalable"],
            image: softImage
        },
        {
            title: "Seasonal Products",
            description: "Coming soon! Celebrate every festival with authentic, vibrant seasonal products.",
            gradient: "from-orange-500 to-amber-600",
            bgGradient: "from-orange-50 to-amber-50",
            link: "/seasonal",
            features: ["Launching Soon", "Premium Quality", "Authentic"],
            image: companyImage
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-lime-50">
            {/* Hero Section - CloudFuze Inspired with Original Content */}
            <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-lime-50 via-white to-blue-50">
                {/* Organic Green Shape Background */}
                <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full">
                    <svg
                        viewBox="0 0 800 600"
                        className="absolute top-0 right-0 w-full h-full"
                        preserveAspectRatio="xMaxYMid slice"
                    >
                        <defs>
                            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#84BD00" />
                                <stop offset="100%" stopColor="#a3d900" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M 400,0 
                               C 200,50 150,150 200,300
                               C 250,450 350,500 500,550
                               C 650,600 750,550 800,400
                               L 800,0 Z"
                            fill="url(#greenGradient)"
                            opacity="0.95"
                        />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-left"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block mb-6"
                            >
                                <span className="px-4 py-2 bg-lime-100 text-lime-700 rounded-full text-sm font-semibold tracking-wide uppercase">
                                    Starting Our Journey in 2023
                                </span>
                            </motion.div>

                            <motion.h1
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                <span className="block mb-2 sm:mb-3 text-gray-900">Welcome to</span>
                                <span className="block text-white lg:text-transparent lg:bg-gradient-to-r lg:from-lime-600 lg:via-lime-500 lg:to-lime-600 lg:bg-clip-text">
                                    Navedhana
                                </span>
                            </motion.h1>

                            <motion.p
                                className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed max-w-xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                <span className="text-white lg:text-gray-600">Building the Future of </span>
                                <span className="font-semibold text-white lg:text-lime-600">Fresh Produce</span>
                                <span className="text-white lg:text-gray-600">, </span>
                                <span className="font-semibold text-white lg:text-blue-700">Digital Solutions</span>
                                <span className="text-white lg:text-gray-600">,<br /> and </span>
                                <span className="font-semibold text-white lg:text-orange-700">Festive Joy</span>
                                <span className="text-white lg:text-gray-600">.</span>
                            </motion.p>

                            <motion.div
                                className="mb-8 sm:mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            >
                                <a
                                    href="#services"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="group relative inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white lg:bg-gradient-to-r lg:from-lime-600 lg:to-lime-500 text-lime-700 lg:text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all border-2 border-white lg:border-0"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Explore Services
                                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                                    </span>
                                </a>
                            </motion.div>

                            {/* Stats Row */}
                            <motion.div
                                className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 items-center justify-center sm:justify-start"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                {[
                                    { value: "200+", label: "Happy Customers" },
                                    { value: "3", label: "Services" },
                                    { value: "2023", label: "Founded" }
                                ].map((stat, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="text-center min-w-[80px]"
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white lg:text-transparent lg:bg-gradient-to-r lg:from-lime-600 lg:to-lime-500 lg:bg-clip-text mb-1 sm:mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs sm:text-sm md:text-base text-white lg:text-gray-600 font-medium">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right Column - Illustration/Visual */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative w-full h-[500px] flex items-center justify-center">
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <img
                                        src={whitecompanyImage}
                                        alt="Navedhana Services"
                                        className="w-3/4 h-auto object-contain drop-shadow-2xl"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-16 md:py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-12 md:mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Our <span className="bg-gradient-to-r from-lime-600 to-lime-500 bg-clip-text text-transparent">Services</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600">Diverse solutions for modern needs</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group relative overflow-hidden rounded-3xl h-[400px] md:h-[450px]"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 bg-gray-900">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-500`}></div>
                                    {/* Dark gradient at bottom for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                </div>

                                <div className="relative p-6 md:p-8 h-full flex flex-col border border-white/10 rounded-3xl">
                                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                        <div className="w-7 h-7 md:w-8 md:h-8 bg-white/40 rounded-lg"></div>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{service.title}</h3>
                                    <p className="text-gray-100 mb-6 leading-relaxed text-sm md:text-base line-clamp-3">
                                        {service.description}
                                    </p>

                                    <div className="space-y-2 mb-6 mt-auto">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-100">
                                                <div className="w-1.5 h-1.5 bg-lime-400 rounded-full shadow-[0_0_8px_rgba(163,217,0,0.8)]"></div>
                                                <span className="font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link
                                        to={service.link}
                                        className="inline-flex items-center font-bold text-white group-hover:gap-3 transition-all text-sm md:text-base"
                                    >
                                        Discover More
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzIyMiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                                Why Choose <span className="bg-gradient-to-r from-lime-400 to-lime-500 bg-clip-text text-transparent">Navedhana</span>?
                            </h2>
                            <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
                                As a passionate startup launching in 2023, we're committed to excellence in everything we do.
                                From the freshness of our vegetables to the reliability of our software solutions,
                                we're building trust one customer at a time.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { text: 'Customer-First Approach', desc: 'Building relationships from day one' },
                                    { text: 'Quality Assurance', desc: 'Premium standards in every delivery' },
                                    { text: 'Growing Together', desc: 'Your success is our success' }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors border border-white/5"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-lime-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-lime-900/20">
                                            <div className="w-6 h-6 bg-white/30 rounded"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg mb-1 text-white">{item.text}</h4>
                                            <p className="text-gray-400 text-sm">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative mt-8 lg:mt-0"
                        >
                            <div className="grid grid-cols-2 gap-4 md:gap-6">
                                {[
                                    { label: 'Quality Service', value: '100%' },
                                    { label: 'Customers', value: '200+' },
                                    { label: 'Services', value: '3' },
                                    { label: 'Founded', value: '2023' }
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all border border-white/5 shadow-xl"
                                    >
                                        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-lime-400 to-lime-500 bg-clip-text text-transparent mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
