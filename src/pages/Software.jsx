import React from 'react';
import { motion } from 'framer-motion';

const Software = () => {
    const services = [
        {
            title: "Web Development",
            desc: "Scalable, high-performance web applications built with modern frameworks for optimal user experience.",
            tech: ["React", "Next.js", "TypeScript", "Tailwind"]
        },
        {
            title: "AI Development",
            desc: "Custom AI agents and intelligent automation solutions that streamline operations and enhance decision-making.",
            tech: ["LLMs", "RAG", "Generative AI", "Python"]
        },
        {
            title: "App Development",
            desc: "Feature-rich mobile applications for iOS and Android, delivering seamless native experiences.",
            tech: ["React Native", "Flutter", "Swift", "Kotlin"]
        },
        {
            title: "Backend Systems",
            desc: "Secure, scalable backend architectures and microservices designed for high-availability enterprise needs.",
            tech: ["Node.js", "Python", "PostgreSQL", "AWS"]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            {/* Hero Section */}
            <div className="relative pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden min-h-[80vh] flex items-center">
                {/* Digital Code Rain Effect */}
                {/* Static Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>

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
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                    Software Solutions
                                </span>
                                Services
                            </motion.h1>

                            <motion.p
                                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Building robust, scalable, and innovative digital solutions
                                for businesses of all sizes.
                            </motion.p>

                            <motion.button
                                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
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
                            className="relative mt-12 lg:mt-0"
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
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {/* Window Header */}
                                    <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        <span className="ml-4 text-gray-400 text-sm font-mono">app.jsx</span>
                                    </div>

                                    {/* Code Content */}
                                    <div className="p-6 font-mono text-sm md:text-base">
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
                                    className="absolute -top-6 -right-6 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-xl"
                                    animate={{
                                        rotate: [0, 10, 0],
                                        y: [0, -10, 0]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ opacity: 0.8 }}
                                />
                                <motion.div
                                    className="absolute -bottom-6 -left-6 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-xl"
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
            <div className="py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
                                <div className="relative p-6 md:p-8 bg-white rounded-3xl border border-blue-100 hover:border-blue-300 shadow-xl hover:shadow-2xl transition-all">
                                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform">
                                        <div className="w-7 h-7 md:w-8 md:h-8 bg-white/30 rounded"></div>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
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
            <div className="py-16 md:py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzIyMiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Powered by <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">Modern Technologies</span>
                        </h2>
                        <p className="text-gray-400 mb-12">We use the latest and greatest tools</p>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
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

            {/* Partner Section */}
            <div className="py-16 md:py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzIyMiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-12">
                            Our <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">Partner</span>
                        </h2>

                        <a
                            href="https://yugminds.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="p-8 md:p-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all max-w-md mx-auto"
                            >
                                <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
                                    Yugminds
                                </h3>
                            </motion.div>
                        </a>
                    </motion.div>
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
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
                        <div className="relative px-6 md:px-8 py-12 md:py-16 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's Build Something Amazing</h2>
                            <p className="text-blue-100 text-lg mb-8">Transform your ideas into reality with our expert team</p>
                            <button className="px-8 md:px-10 py-4 bg-white text-blue-700 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl transform hover:scale-105">
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
