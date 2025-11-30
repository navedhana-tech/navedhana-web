import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import vegImage from '../assets/other/Vegetables.webp';
import softImage from '../assets/other/Software.webp';
import companyImage from '../assets/logo/NPA_Logo_WithoutText.png';

const Home = () => {
    const services = [
        {
            title: "Vegetables Supply",
            description: "Farm-fresh, organic vegetables delivered with love and care to your doorstep.",
            gradient: "from-green-500 to-emerald-600",
            bgGradient: "from-green-50 to-emerald-50",
            link: "/vegetables",
            features: ["100% Organic", "Daily Fresh", "Farm Direct"],
            image: vegImage
        },
        {
            title: "Software Services",
            description: "Innovative digital solutions that transform businesses and drive growth.",
            gradient: "from-blue-500 to-cyan-600",
            bgGradient: "from-blue-50 to-cyan-50",
            link: "/software",
            features: ["Modern Tech", "Scalable", "Reliable"],
            image: softImage
        },
        {
            title: "Seasonal Products",
            description: "Celebrate every festival with authentic, vibrant seasonal products.",
            gradient: "from-orange-500 to-amber-600",
            bgGradient: "from-orange-50 to-amber-50",
            link: "/seasonal",
            features: ["Festive Joy", "Premium Quality", "Authentic"],
            image: companyImage // Placeholder using vegImage as no specific seasonal image was found
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
            {/* Hero Section - Beautiful Animated Design */}
            <section className="relative overflow-hidden pt-28 pb-24 lg:pt-36 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
                {/* Large Animated Gradient Meshes */}
                <motion.div
                    className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-green-400/40 via-emerald-400/30 to-teal-300/20 blur-3xl"
                    animate={{
                        x: [0, 120, 0],
                        y: [0, -60, 0],
                        scale: [1, 1.3, 1],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-20 right-0 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-400/35 via-cyan-400/25 to-sky-300/20 blur-3xl"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 80, 0],
                        scale: [1, 1.4, 1],
                        rotate: [0, -90, 0]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-0 left-1/4 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-orange-400/30 via-amber-400/25 to-yellow-300/20 blur-3xl"
                    animate={{
                        x: [0, 80, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.25, 1],
                        rotate: [0, 120, 0]
                    }}
                    transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Glowing Accent Orbs */}
                <motion.div
                    className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-green-500/50 to-emerald-500/30 blur-2xl"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/50 to-cyan-500/30 blur-2xl"
                    animate={{
                        scale: [1, 1.6, 1],
                        opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                    className="absolute bottom-1/3 left-1/2 w-36 h-36 rounded-full bg-gradient-to-br from-orange-500/50 to-amber-500/30 blur-2xl"
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0.65, 0.3]
                    }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />

                {/* Green Galaxy Stars - Uniform and Bright */}
                {[...Array(150)].map((_, i) => {
                    return (
                        <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: 5,
                                height: 5,
                                background: 'radial-gradient(circle, rgba(16,185,129,1), rgba(5,150,105,0.8))',
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                boxShadow: '0 0 12px rgba(16,185,129,0.9), 0 0 24px rgba(5,150,105,0.5)',
                            }}
                            animate={{
                                opacity: [0.6, 1, 0.6],
                                scale: [1, 1.3, 1],
                                y: [0, Math.random() * 10 - 5, 0],
                                x: [0, Math.random() * 10 - 5, 0],
                            }}
                            transition={{
                                duration: 2 + Math.random() * 3,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                ease: "easeInOut"
                            }}
                        />
                    );
                })}

                {/* Graph Paper Grid Pattern */}
                <motion.div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#10b98140_1px,transparent_1px),linear-gradient(to_bottom,#10b98140_1px,transparent_1px)] bg-[size:40px_40px]"
                    animate={{
                        opacity: [0.5, 0.7, 0.5]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Radial Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(255,255,255,0.3)_100%)]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Centered Hero Content */}
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Badge */}
                            <div className="mb-8">
                                <span className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide uppercase text-green-700 bg-green-50 border border-green-200 shadow-sm">
                                    Empowering Growth Since 2023
                                </span>
                            </div>

                            {/* Main Headline */}
                            <motion.h1
                                className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight mb-8"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <span className="block text-gray-900 mb-3">Welcome to</span>
                                <span className="block bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent">
                                    Navedhana
                                </span>
                            </motion.h1>

                            {/* Subheadline */}
                            <motion.p
                                className="mt-6 text-xl md:text-2xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                Where <span className="font-semibold text-green-600">Nature</span>,
                                <span className="font-semibold text-blue-600"> Technology</span>, and
                                <span className="font-semibold text-orange-600"> Tradition</span> Come Together
                                To Create Something Extraordinary.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            >
                                <Link
                                    to="/vegetables"
                                    className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 transition-all overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Explore Services
                                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                    </span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Link>
                                <Link
                                    to="/software"
                                    className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-lg border-2 border-gray-200 hover:border-green-500 hover:bg-gray-50 transition-all shadow-lg"
                                >
                                    Learn More
                                </Link>
                            </motion.div>

                            {/* Stats Row */}
                            <motion.div
                                className="flex flex-wrap gap-8 justify-center items-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                {[
                                    { value: "100+", label: "Happy Customers" },
                                    { value: "3", label: "Services" },
                                    { value: "24/7", label: "Support" }
                                ].map((stat, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="text-center px-6"
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 md:py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-12 md:mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Our <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Services</span>
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
                                    {/* Gradient Overlay - Reduced opacity for clarity */}
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
                                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
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
                                Why Choose <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Navedhana</span>?
                            </h2>
                            <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
                                As a passionate startup, we're committed to excellence in everything we do.
                                From the freshness of our vegetables to the reliability of our code,
                                we put our heart into every service.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { text: 'Customer-First Approach', desc: 'Your satisfaction is our priority' },
                                    { text: 'Quality Assurance', desc: 'Premium standards in every delivery' },
                                    { text: 'Innovative Solutions', desc: 'Modern approaches to traditional needs' }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors border border-white/5"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-900/20">
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
                                    { label: 'Fresh Daily', value: '100%' },
                                    { label: 'On-Time', value: '99%' },
                                    { label: 'Satisfaction', value: '98%' },
                                    { label: 'Support', value: '24/7' }
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
                                        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">
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
