import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Clock, Leaf, ShieldCheck } from 'lucide-react';

const leafyImage = '/assets/other/Leafy_Vegetables.webp';
const rootImage = '/assets/other/root_vegetables.jpg';
const seasonalImage = '/assets/other/mango.jpg';
const marrowImage = '/assets/other/Bottle_Gaurd.webp';
const heroBgImage = '/assets/other/image.png';

const Vegetables = () => {
    const categories = [
        { name: 'Leafy Greens', image: leafyImage },
        { name: 'Root Vegetables', image: rootImage },
        { name: 'Vegetables', image: marrowImage },
        { name: 'Seasonal Picks', image: seasonalImage }
    ];

    const features = [
        { title: "100% Farm Fresh Daily", desc: "Sourced from certified organic farms", icon: Leaf },
        { title: "Daily Fresh", desc: "Harvested and delivered within 24 hours", icon: Clock },
        { title: "Hygiene Packed", desc: "Sanitized and packed with utmost care", icon: ShieldCheck },
        { title: "Premium Quality", desc: "Hand-picked for freshness and taste", icon: BadgeCheck }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            {/* Hero Section */}
            <div className="relative pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden min-h-[80vh] flex items-center">
                {/* Static Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block mb-6"
                            >
                                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold tracking-wide uppercase">
                                    Farm to Table
                                </span>
                            </motion.div>

                            <motion.h1
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                Fresh
                                <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    Vegetables
                                </span>
                                Supply
                            </motion.h1>

                            <motion.p
                                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Farm-fresh goodness delivered straight to your kitchen.
                                We ensure quality, hygiene, and taste in every basket.
                            </motion.p>

                            <motion.a
                                href="http://fresh.navedhana.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Order Now
                            </motion.a>
                        </motion.div>

                        {/* Visual Element */}
                        <motion.div
                            className="relative mt-12 lg:mt-0"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="relative">
                                {/* Stacked Cards Effect */}
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl transform rotate-6"
                                    animate={{ rotate: [6, 8, 6] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ opacity: 0.2 }}
                                />
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl transform rotate-3"
                                    animate={{ rotate: [3, 5, 3] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ opacity: 0.3 }}
                                />
                                <div className="relative aspect-square rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                                    {/* Background image */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center brightness-120 saturate-150"
                                        style={{ backgroundImage: `url(${heroBgImage})` }}
                                    />
                                    {/* Overlay for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-emerald-900/30 to-black/20" />
                                    <motion.div
                                        className="relative z-10 text-white text-center p-8"
                                        animate={{ scale: [1, 1.02, 1] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <div className="text-5xl md:text-6xl font-bold mb-4 opacity-90">100%</div>
                                        <div className="text-xl md:text-2xl font-semibold opacity-80">Fresh From Farm Daily</div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                <div className="relative p-8 bg-white rounded-2xl border border-green-100 hover:border-green-300 shadow-lg hover:shadow-2xl transition-all">
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
                                        <feature.icon className="w-7 h-7 text-white" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Categories */}
            <div className="py-16 md:py-20 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What We <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Offer</span>
                        </h2>
                        <p className="text-lg text-gray-600">A wide variety of fresh produce</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {categories.map((category, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl"
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${category.image})` }}
                                ></div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity"></div>

                                <div className="absolute inset-0 flex items-end justify-center pb-6">
                                    <h3 className="text-white font-bold text-lg md:text-xl text-center px-2 drop-shadow-md">{category.name}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 md:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600"></div>
                        <div className="relative px-6 md:px-8 py-12 md:py-16 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Order Fresh?</h2>
                            <p className="text-green-100 text-lg mb-8">Get farm-fresh vegetables delivered to your door</p>
                            <button className="px-8 md:px-10 py-4 bg-white text-green-700 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl transform hover:scale-105">
                                Contact Us Now
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Vegetables;
