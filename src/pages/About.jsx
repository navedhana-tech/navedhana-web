import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-lime-50">
            {/* Hero Section */}
            <div className="relative pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden min-h-[70vh] flex items-center bg-gradient-to-br from-lime-50 via-white to-blue-50">
                {/* Abstract Background Shapes */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-30"
                            style={{
                                background: [
                                    'linear-gradient(to right, #84cc16, #3b82f6)', // lime-500 to blue-500
                                    'linear-gradient(to right, #65a30d, #2563eb)', // lime-600 to blue-600
                                    'linear-gradient(to right, #a3e635, #60a5fa)'  // lime-400 to blue-400
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
                        <span className="inline-block py-1 px-3 rounded-full bg-lime-100 text-lime-700 text-sm font-semibold mb-6 tracking-wide uppercase">
                            Our Story
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                            Driving Innovation, <br />
                            <span className="bg-gradient-to-r from-lime-600 to-blue-600 bg-clip-text text-transparent">
                                Delivering Excellence
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Navedhana is a multi-faceted company dedicated to bridging the gap between traditional values and modern technology. From fresh produce to cutting-edge software, we deliver quality in everything we do.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="py-16 md:py-24 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 md:p-12 bg-white rounded-3xl shadow-xl border border-lime-50 hover:shadow-2xl transition-all"
                        >
                            <div className="w-16 h-16 bg-lime-100 rounded-2xl flex items-center justify-center mb-6">
                                <div className="w-8 h-8 bg-lime-600 rounded-lg"></div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                To empower businesses and communities by providing sustainable solutions, whether it's through organic agriculture, robust software systems, or celebrating cultural traditions. We aim to be a trusted partner in growth and well-being.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 md:p-12 bg-white rounded-3xl shadow-xl border border-blue-50 hover:shadow-2xl transition-all"
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                                <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                To create a future where technology and nature coexist harmoniously. We envision a world where digital innovation enhances our connection to the earth and to each other, fostering a healthier, more connected society.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Core Values Section */}
            <div className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-gray-600 text-lg">The principles that guide every decision we make</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Integrity", desc: "Honesty and transparency in all our dealings.", color: "bg-blue-500" },
                            { title: "Innovation", desc: "Constantly pushing boundaries to find better solutions.", color: "bg-lime-500" },
                            { title: "Quality", desc: "Uncompromising standards in products and services.", color: "bg-emerald-500" },
                            { title: "Customer Focus", desc: "Your success and satisfaction are our top priority.", color: "bg-orange-500" }
                        ].map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all"
                            >
                                <div className={`w-12 h-12 ${value.color} rounded-xl mx-auto mb-6 shadow-md transform rotate-3`}></div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-lime-600 to-blue-600 text-center py-16 px-8 shadow-2xl"
                    >
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Work With Us?</h2>
                            <p className="text-lime-100 text-lg mb-8 max-w-2xl mx-auto">
                                Whether you need fresh organic produce, custom software solutions, or seasonal festival supplies, Navedhana is here to serve you.
                            </p>
                            <button className="px-8 py-4 bg-white text-lime-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-lg transform hover:scale-105">
                                Contact Us Today
                            </button>
                        </div>
                        {/* Decorative Circles */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-1/2 translate-y-1/2"></div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
