import React from 'react';
import { motion } from 'framer-motion';

const Software = () => {
    const services = [
        {
            title: "Web Development",
            desc: "Responsive, fast, and beautiful websites that convert visitors into customers.",
            tech: ["React", "Next.js", "Tailwind"]
        },
        {
            title: "App Development",
            desc: "Native and cross-platform mobile applications for iOS and Android.",
            tech: ["React Native", "Flutter", "Swift"]
        },
        {
            title: "Cloud Solutions",
            desc: "Scalable cloud infrastructure and deployment on AWS, Azure, and GCP.",
            tech: ["AWS", "Docker", "Kubernetes"]
        },
        {
            title: "Backend Systems",
            desc: "Robust APIs and database architecture for enterprise applications.",
            tech: ["Node.js", "Python", "PostgreSQL"]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 overflow-hidden min-h-[80vh] flex items-center">
                {/* Digital Code Rain Effect */}
                <div className="absolute inset-0">
                    {/* Binary Code Background */}
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-blue-200 font-mono text-xs opacity-20"
                            style={{
                                left: `${(i * 7) % 100}%`,
                                top: '-10%',
                            }}
                            animate={{
                                y: ['0vh', '110vh'],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                ease: "linear",
                                delay: i * 0.5
                            }}
                        >
                            {Array.from({ length: 20 }, () => Math.random() > 0.5 ? '1' : '0').join('\n')}
                        </motion.div>
                    ))}

                    {/* Geometric Shapes */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={`shape-${i}`}
                            className="absolute border-2 border-blue-200"
                            style={{
                                width: `${Math.random() * 150 + 50}px`,
                                height: `${Math.random() * 150 + 50}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                borderRadius: i % 2 === 0 ? '50%' : '0%',
                                opacity: 0.1
                            }}
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: Math.random() * 20 + 15,
                                repeat: Infinity,
                                ease: "linear"
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
                                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold tracking-wide uppercase">
                                    Digital Innovation
                                </span>
                            </motion.div>

                            <motion.h1
                                className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                    Software
                                </span>
                                Services
                            </motion.h1>

                            <motion.p
                                className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Building robust, scalable, and innovative digital solutions
                                for businesses of all sizes.
                            </motion.p>

                            <motion.button
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Start Your Project
                            </motion.button>
                        </motion.div>

                        {/* Visual Element - Floating Window */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="relative">
                                {/* Code Window */}
                                <motion.div
                                    className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    {/* Window Header */}
                                    <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        <span className="ml-4 text-gray-400 text-sm font-mono">app.jsx</span>
                                    </div>

                                    {/* Code Content */}
                                    <div className="p-6 font-mono text-sm">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.8, staggerChildren: 0.1 }}
                                        >
                                            <div className="text-purple-400">const <span className="text-blue-400">buildApp</span> = () =&gt; {'{'}</div>
                                            <div className="text-gray-400 ml-4">  <span className="text-green-400">// Innovation starts here</span></div>
                                            <div className="text-blue-400 ml-4">  return <span className="text-yellow-400">&lt;Success /&gt;</span>;</div>
                                            <div className="text-purple-400">{'}'}</div>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Floating Elements */}
                                <motion.div
                                    className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-xl"
                                    animate={{
                                        rotate: [0, 10, 0],
                                        y: [0, -10, 0]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ opacity: 0.8 }}
                                />
                                <motion.div
                                    className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-xl"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        rotate: [0, -10, 0]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                    style={{ opacity: 0.6 }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                <div className="relative p-8 bg-white rounded-3xl border border-blue-100 hover:border-blue-300 shadow-xl hover:shadow-2xl transition-all">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform">
                                        <div className="w-8 h-8 bg-white/30 rounded"></div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">{item.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {item.tech.map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tech Stack Section */}
            <div className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzIyMiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Powered by <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">Modern Technologies</span>
                        </h2>
                        <p className="text-gray-400 mb-12">We use the latest and greatest tools</p>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            {['React', 'Node.js', 'Python', 'AWS', 'Docker'].map((tech, idx) => (
                                <motion.div
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                                >
                                    <div className="w-8 h-8 bg-blue-400 mx-auto mb-3 rounded"></div>
                                    <span className="text-white font-semibold text-lg">{tech}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
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
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
                        <div className="relative px-8 py-16 text-center">
                            <h2 className="text-4xl font-bold text-white mb-4">Let's Build Something Amazing</h2>
                            <p className="text-blue-100 text-lg mb-8">Transform your ideas into reality with our expert team</p>
                            <button className="px-10 py-4 bg-white text-blue-700 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl transform hover:scale-105">
                                Start Your Project
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Software;
