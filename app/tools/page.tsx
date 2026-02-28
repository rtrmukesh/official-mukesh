"use client";
import { motion } from "framer-motion";
import { MdBuild, MdArrowBack } from "react-icons/md";
import Link from "next/link";
import { tools } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import ToolLayout from "@/Layout/ToolLayout";

export default function ToolsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <ToolLayout>
      <div className="flex flex-col gap-8 pb-10">
        {/* Breadcrumb / Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group"
        >
          <MdArrowBack className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
              <MdBuild className="text-xl text-cyan-400" />
            </div>
            <h1 className="text-4xl font-bold text-white uppercase tracking-tight">All Tools</h1>
          </motion.div>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="w-24 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full origin-left mb-6" 
          />
          <p className="text-gray-400 max-w-2xl leading-relaxed text-sm">
            Explore our collection of free online tools designed to speed up your workflow. 
            From image processing to developer utilities, we've got you covered.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {tools.map((tool, idx) => (
            <ToolCard key={idx} tool={tool} variants={cardVariants} />
          ))}
        </motion.div>
      </div>
    </ToolLayout>
  );
}
