import React from 'react';
import { motion } from 'framer-motion';

const Seasonal = () => {
    const products = [
        {
            title: "Holi Colors",
            desc: "Organic, skin-friendly, and vibrant gulal for a safe and joyful Holi celebration.",
            gradient: "from-pink-500 to-purple-600",
            bgGradient: "from-pink-50 to-purple-50",
            status: "Available Now",
            statusColor: "bg-green-100 text-green-700"
        },
        {
            title: "Festival Kites",
            desc: "High-quality kites and manjha for Makar Sankranti and other celebrations.",
            gradient: "from-blue-500 to-indigo-600",
            bgGradient: "from-blue-50 to-indigo-50",
            status: "Coming Soon",
            statusColor: "bg-blue-100 text-blue-700"
        },
        {
            title: "Diwali Decor",
            desc: "Beautiful diyas, rangoli colors, and decorative items for the festival of lights.",
            gradient: "from-yellow-500 to-orange-600",
            bgGradient: "from-yellow-50 to-orange-50",
            status: "Pre-Order",
            statusColor: "bg-orange-100 text-orange-700"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 overflow-hidden min-h-[80vh] flex items-center">
                {/* Festive Confetti Animation */}
                <div className="absolute inset-0">
                    {/* Colorful Confetti Pieces */}
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                width: `${Math.random() * 15 + 5}px`,
                                height: `${Math.random() * 15 + 5}px`,
                                left: `${Math.random() * 100}%`,
                                top: `-${Math.random() * 20}%`,
                                background: [
                                    'linear-gradient(135deg, #f97316, #fb923c)',
                                    'linear-gradient(135deg, #ec4899, #f472b6)',
                                    'linear-gradient(135deg, #8b5cf6, #a78bfa)',
                                    'linear-gradient(135deg, #eab308, #fbbf24)',
                                    'linear-gradient(135deg, #06b6d4, #67e8f9)'
                                ][i % 5],
                                borderRadius: i % 3 === 0 ? '50%' : '0%',
                                opacity: 0.3
                            }}
                            animate={{
                                y: ['0vh', '120vh'],
                                rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                                x: [0, Math.random() * 100 - 50]
                            }}
                            transition={{
                                duration: Math.random() * 8 + 8,
                                repeat: Infinity,
                                ease: "linear",
                                delay: i * 0.2
                            }}
                        />
                    ))}

                    {/* Radial Bursts */}
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={`burst-${i}`}
                            className="absolute rounded-full"
                            style={{
                                width: '300px',
                                height: '300px',
                                left: `${25 * i}%`,
                                top: `${30 * (i % 2)}%`,
                                background: `radial-gradient(circle, ${['rgba(249, 115, 22, 0.1)', 'rgba(236, 72, 153, 0.1)',
                                        'rgba(139, 92, 246, 0.1)', 'rgba(234, 179, 8, 0.1)'][i]
                                    } 0%, transparent 70%)`
                            }}
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5
                            }}
                        />
                    ))}
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
                                <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold tracking-wide uppercase">
                                    Celebrate Every Festival
                                </span>
                            </motion.div>

                            <motion.h1
                                className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                                    Seasonal
                                </span>
                                Products
                            </motion.h1>

                            <motion.p
                                className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Bringing joy to every festival with vibrant colors,
                                high-flying kites, and authentic seasonal products.
                            </motion.p>

                            <motion.button
                                className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Browse Products
                            </motion.button>
                        </motion.div>

                        {/* Visual Element - Festive Cards */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="relative h-96">
                                {/* Stacked Festive Cards */}
                                {[
                                    { color: 'from-pink-500 to-purple-600', rotate: -6, delay: 0 },
                                    { color: 'from-orange-500 to-amber-600', rotate: 0, delay: 0.1 },
                                    { color: 'from-yellow-400 to-orange-500', rotate: 6, delay: 0.2 }
                                ].map((card, idx) => (
                                    <motion.div
                                        key={idx}
                                        className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-3xl shadow-2xl`}
                                        style={{
                                            transformOrigin: 'center center',
                                        }}
                                        initial={{ rotate: card.rotate, scale: 0.9 - idx * 0.05 }}
                                        animate={{
                                            rotate: [card.rotate, card.rotate + 2, card.rotate],
                                            y: [0, -10, 0]
                                        }}
                                        transition={{
                                            duration: 3 + idx,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: card.delay
                                        }}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <motion.div
                                                className="text-white text-center"
                                                animate={{ scale: [1, 1.05, 1] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                            >
                                                <div className="text-5xl font-bold mb-2 opacity-90">
                                                    {['Holi', 'Diwali', 'Sankranti'][idx]}
                                                </div>
                                                <div className="text-lg opacity-70">Festival Joy</div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Products Showcase */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Celebrate Every <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Festival</span>
                        </h2>
                        <p className="text-lg text-gray-600">Premium products for your special occasions</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {products.map((product, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group relative"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity`}></div>

                                <div className={`relative bg-gradient-to-br ${product.bgGradient} rounded-3xl p-8 border border-white shadow-xl hover:shadow-2xl transition-all h-full flex flex-col`}>
                                    <div className={`w-20 h-20 bg-gradient-to-br ${product.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                                        <div className="w-10 h-10 bg-white/30 rounded"></div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.title}</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                                        {product.desc}
                                    </p>

                                    <div className="mt-auto">
                                        <span className={`inline-block px-4 py-2 ${product.statusColor} rounded-full text-sm font-semibold`}>
                                            {product.status}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { title: "Vibrant Colors", desc: "Safe and eco-friendly" },
                            { title: "Premium Quality", desc: "Handpicked products" },
                            { title: "Festive Joy", desc: "Celebrate with happiness" }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-6"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <div className="w-8 h-8 bg-white/30 rounded"></div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600"></div>
                        <div className="relative px-8 py-16 text-center">
                            <h2 className="text-4xl font-bold text-white mb-4">Never Miss a Festival</h2>
                            <p className="text-orange-100 text-lg mb-8">Get notified when seasonal products are back in stock</p>
                            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-6 py-4 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30 font-medium"
                                />
                                <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-2xl transform hover:scale-105">
                                    Notify Me
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Seasonal;
