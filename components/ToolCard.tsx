"use client";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { IconType } from "react-icons";

interface ToolCardProps {
  tool: {
    title: string;
    description: string;
    url: string;
    icon: IconType;
    gradient: string;
  };
  variants: any;
}

export default function ToolCard({ tool, variants }: ToolCardProps) {
  return (
    <motion.a
      href={tool.url}
      target={tool.url.startsWith("http") ? "_blank" : "_self"}
      rel={tool.url.startsWith("http") ? "noopener noreferrer" : ""}
      variants={variants}
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
                default: { duration: 0.5 },
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
  );
}
