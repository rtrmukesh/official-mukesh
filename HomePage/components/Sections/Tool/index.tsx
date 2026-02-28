import { MdArrowOutward } from "react-icons/md";
import { motion } from "framer-motion";
import { MdBuild } from "react-icons/md";
import Link from "next/link";
import { tools } from "@/data/tools";
import ToolCard from "@/components/ToolCard";

const ToolSection = ({ id }: { id?: string }) => {

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
        {tools.slice(0, 4).map((tool, idx) => (
          <ToolCard key={idx} tool={tool} variants={cardVariants} />
        ))}
      </motion.div>

      {tools.length > 4 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/tools"
            className="group flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] border border-white/10 hover:border-cyan-500/50 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            <span>View More Tools</span>
            <MdArrowOutward className="text-gray-400 group-hover:text-cyan-400 transition-transform duration-300 rotate-45" />
          </Link>
        </motion.div>
      )}
    </section>
  );
};

export default ToolSection;
