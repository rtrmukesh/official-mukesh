"use client";
import { MdArrowOutward, MdPassword, MdGridOn, MdPublic, MdPhotoCamera, MdImage } from "react-icons/md";
import { BiBook } from "react-icons/bi";
import { motion } from "framer-motion";
import { MdBuild } from "react-icons/md"; // Keep for header

const ToolSection = ({ id }: { id?: string }) => {
  const tools = [
    {
      title: "Instagram Downloader",
      description:
        "Fast and easy way to download Instagram Reels, Stories, and Posts in high quality. No login required.",
      url: "tools/instagram-downloader",
      icon: MdPhotoCamera,
      gradient: "from-pink-500 to-orange-400",
    },
    {
      title: "Pinterest Downloader",
      description:
        "Instantly download Pinterest Videos and Images in high quality for free. Fast, secure, and no login required.",
      url: "tools/pinterest-downloader",
      icon: MdImage,
      gradient: "from-red-500 to-pink-500",
    },
    {
      title: "AI Image Background Remover",
      description:
        "Instantly remove backgrounds from your images for free using our client-side AI tool. Processing is 100% private.",
      url: "tools/image-bg-remover",
      icon: MdImage,
      gradient: "from-purple-400 to-indigo-500",
    },
    {
      title: "Free Online Book Library",
      description:
        "Explore a massive online library with 77,786+ books across multiple categories. Read, search, and access books instantly from anywhere.",
      url: "https://books.themukesh.com/",
      icon: BiBook,
      gradient: "from-orange-400 to-red-500",
    },
    {
      title: "Password Generator",
      description:
        "Create strong, secure passwords with custom length and character rules.",
      url: "tools/password-generator",
      icon: MdPassword,
      gradient: "from-green-400 to-emerald-500",
    },
    {
      title: "Grid Generator",
      description:
        "Generate responsive CSS grid layouts visually for modern web designs.",
      url: "tools/grid-generator",
      icon: MdGridOn,
      gradient: "from-blue-400 to-indigo-500",
    },
    {
      title: "World Gallery",
      description:
        "Discover a curated collection of stunning global photography and cultural stories.",
      url: "https://photos.themukesh.com/",
      icon: MdPublic,
      gradient: "from-pink-400 to-purple-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" } as const,
    },
  };

  return (
    <section id={id || "tools"} className="p-4 sm:p-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-2"
      >
        <div className="p-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
          <MdBuild className="text-xl text-cyan-400" />
        </div>
        <h2 className="text-3xl font-bold text-white">Tools</h2>
      </motion.div>

      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="w-24 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-8 origin-left" 
      />

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {tools.map((tool, idx) => (
          <motion.a
            key={idx}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            className="group relative flex flex-col bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1"
          >
            {/* Top Gradient Line */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${tool.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

            {/* Preview Area with Specific Icon */}
            <div className="relative h-48 bg-gray-900/50 overflow-hidden flex items-center justify-center p-6 group-hover:bg-gray-900/80 transition-colors">
                 
                 {/* Animated Icon */}
                 <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                    animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }}
                    transition={{
                      default: { duration: 0.5 }, // For hover
                      y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatType: "mirror"
                      },
                      scale: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatType: "mirror"
                      }
                    }}
                    className="relative z-10"
                 >
                    <tool.icon className="text-7xl text-white/20 group-hover:text-cyan-400 transition-colors duration-500" />
                 </motion.div>

                 {/* Background Glow */}
                 <div className={`absolute inset-0 bg-gradient-to-tr ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                 
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 pt-2 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {tool.title}
                </h3>
                <MdArrowOutward className="text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                {tool.description}
              </p>

              <div className="flex items-center text-xs font-medium text-cyan-500/80 uppercase tracking-wider">
                Try Tool
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default ToolSection;
