import React from 'react';
import { motion } from 'framer-motion';

const Seasonal = () => {
    const products = [
        {
            title: "Holi Colors",
            desc: "Organic, skin-friendly, and vibrant gulal for a safe and joyful Holi celebration.",
            gradient: "from-pink-500 to-purple-600",
            bgGradient: "from-pink-50 to-purple-50",
            status: "Coming Soon",
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
            status: "Coming Soon",
            statusColor: "bg-orange-100 text-orange-700"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
            {/* Hero Section */}
            <div className="relative pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden min-h-[80vh] flex items-center">
                {/* Festive Confetti Animation */}
                {/* Static Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]"></div>

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
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
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
                                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Bringing joy to every festival with vibrant colors,
                                high-flying kites, and authentic seasonal products.
                            </motion.p>

                            <motion.div
                                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-orange-100 border-2 border-orange-400 rounded-xl sm:rounded-2xl text-orange-700 font-bold text-base sm:text-lg shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                Launching Soon
                            </motion.div>
                        </motion.div>

                        {/* Visual Element - Festive Cards */}
                        <motion.div
                            className="relative mt-12 lg:mt-0"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="relative h-80 md:h-96">
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
                                                <div className="text-4xl md:text-5xl font-bold mb-2 opacity-90">
                                                    {['Holi', 'Diwali', 'Sankranti'][idx]}
                                                </div>
                                                <div className="text-base md:text-lg opacity-70">Festival Joy</div>
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
            <div className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Celebrate Every <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Festival</span>
                        </h2>
                        <p className="text-lg text-gray-600">Premium products for your special occasions</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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

                                <div className={`relative bg-gradient-to-br ${product.bgGradient} rounded-3xl p-6 md:p-8 border border-white shadow-xl hover:shadow-2xl transition-all h-full flex flex-col`}>
                                    <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${product.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-white/30 rounded"></div>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{product.title}</h3>
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
            <div className="py-16 md:py-20 bg-white/50">
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
            <div className="py-16 md:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600"></div>
                        <div className="relative px-6 md:px-8 py-12 md:py-16 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Never Miss a Festival</h2>
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
