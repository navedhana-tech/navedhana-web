import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Vegetables = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            const newParticle = {
                id: Date.now() + Math.random(),
                x: e.clientX,
                y: e.clientY,
            };

            setParticles(prev => [...prev.slice(-15), newParticle]);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const features = [
        { title: "100% Organic", desc: "Sourced from certified organic farms" },
        { title: "Daily Fresh", desc: "Harvested and delivered within 24 hours" },
        { title: "Hygiene Packed", desc: "Sanitized and packed with utmost care" },
        { title: "Premium Quality", desc: "Hand-picked for freshness and taste" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 overflow-hidden min-h-[80vh] flex items-center">
                {/* Mouse-following particles */}
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute w-1 h-1 bg-green-500 rounded-full pointer-events-none"
                        initial={{
                            x: particle.x,
                            y: particle.y - window.scrollY,
                            opacity: 0.8,
                            scale: 1
                        }}
                        animate={{
                            opacity: 0,
                            scale: 0,
                            x: particle.x + (Math.random() - 0.5) * 80,
                            y: particle.y - window.scrollY + (Math.random() - 0.5) * 80
                        }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        style={{ zIndex: 50 }}
                    />
                ))}

                {/* Animated Leaves Pattern */}
                <div className="absolute inset-0">
                    {/* Interactive dots */}
                    {[...Array(40)].map((_, i) => {
                        const baseX = (i % 8) * 12.5;
                        const baseY = Math.floor(i / 8) * 20;
                        const distance = Math.sqrt(
                            Math.pow(mousePosition.x - (baseX * window.innerWidth / 100), 2) +
                            Math.pow(mousePosition.y - (baseY * window.innerHeight / 100), 2)
                        );
                        const scale = Math.max(0.5, 1 - distance / 400);

                        return (
                            <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-green-400 rounded-full"
                                style={{
                                    left: `${baseX}%`,
                                    top: `${baseY}%`,
                                    opacity: 0.25
                                }}
                                animate={{
                                    scale: scale,
                                    opacity: 0.15 + scale * 0.25,
                                    x: (mousePosition.x - window.innerWidth / 2) / 40,
                                    y: (mousePosition.y - window.innerHeight / 2) / 40
                                }}
                                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                            />
                        );
                    })}

                    {/* Organic Shapes */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: `${Math.random() * 200 + 50}px`,
                                height: `${Math.random() * 200 + 50}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                background: i % 2 === 0
                                    ? 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)'
                                    : 'radial-gradient(circle, rgba(5, 150, 105, 0.08) 0%, transparent 70%)',
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, 20, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: Math.random() * 8 + 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5
                            }}
                        />
                    ))}

                    {/* Wavy Lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                        <motion.path
                            d="M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100"
                            stroke="#10b981"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.path
                            d="M0,200 Q250,150 500,200 T1000,200 T1500,200 T2000,200"
                            stroke="#059669"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0.5 }}
                        />
                    </svg>
                </div>


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
                                className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
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
                                className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Farm-fresh goodness delivered straight to your kitchen.
                                We ensure quality, hygiene, and taste in every basket.
                            </motion.p>

                            <motion.button
                                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Order Now
                            </motion.button>
                        </motion.div>

                        {/* Visual Element */}
                        <motion.div
                            className="relative"
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
                                <div className="relative aspect-square bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                                    {/* Animated Grid */}
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                                     linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                                        backgroundSize: '40px 40px'
                                    }}></div>

                                    <motion.div
                                        className="text-white text-center p-8"
                                        animate={{ scale: [1, 1.02, 1] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <div className="text-6xl font-bold mb-4 opacity-90">100%</div>
                                        <div className="text-2xl font-semibold opacity-80">Organic & Fresh</div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-20">
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
                                        <div className="w-7 h-7 bg-white/30 rounded"></div>
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
            <div className="py-20 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            What We <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Offer</span>
                        </h2>
                        <p className="text-lg text-gray-600">A wide variety of fresh produce</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['Leafy Greens', 'Root Vegetables', 'Fresh Herbs', 'Seasonal Picks'].map((category, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-white font-bold text-xl text-center px-4">{category}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600"></div>
                        <div className="relative px-8 py-16 text-center">
                            <h2 className="text-4xl font-bold text-white mb-4">Ready to Order Fresh?</h2>
                            <p className="text-green-100 text-lg mb-8">Get farm-fresh vegetables delivered to your door</p>
                            <button className="px-10 py-4 bg-white text-green-700 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl transform hover:scale-105">
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
