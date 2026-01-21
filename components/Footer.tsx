import { BookOpen, Code2, FileText, Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mx-4 my-8 pb-28 lg:pb-0">
      {/* Main Container */}
      <div className="bg-[#111111] text-white p-6 md:p-12 rounded-3xl border border-white/10 max-w-7xl mx-auto">
        
        {/* Responsive Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-4">
          
          {/* Section: Brand & Headline */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-2xl md:text-3xl font-medium leading-snug max-w-xs md:max-w-md">
              Delivering <span className="text-cyan-400">Precision</span> and <br className="hidden md:block" />
              <span className="text-purple-500"> Performance</span> in Tech
            </h2>
            {/* Desktop-only copyright info (appears inside the box in your desktop screenshot) */}
            <div className="hidden md:block text-gray-400 text-sm mt-10">
              <p>Bengalore, India</p>
              <p>Mukesh Murugiayan © 2025</p>
            </div>
          </div>

          {/* Section: Explore More */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Explore More</h3>
            <div className="flex flex-row md:flex-col gap-4 md:gap-3 text-lg md:text-base font-medium md:font-normal">
              <a href="#" className="hover:text-white transition-colors">Home</a>
              <a href="#" className="hover:text-white transition-colors">Experience</a>
              <a href="#" className="hover:text-white transition-colors">Projects</a>
            </div>
          </div>

          {/* Section: Socials */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-green-400 font-semibold text-sm uppercase tracking-wider">Socials</h3>
            <div className="flex flex-wrap md:flex-col gap-x-6 gap-y-4">
              <a href="#" className="flex items-center gap-2 hover:text-white text-gray-300">
                <Linkedin size={18} className="text-[#0077b5]" /> <span>LinkedIn</span>
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-white text-gray-300">
                <BookOpen size={18} className="text-white" /> <span>Medium</span>
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-white text-gray-300">
                <Github size={18} /> <span>GitHub</span>
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-white text-gray-300">
                <Code2 size={18} className="text-[#f59e0b]" /> <span>LeetCode</span>
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-white text-gray-300">
                <Twitter size={18} /> <span>Twitter</span>
              </a>
            </div>
          </div>

          {/* Section: Others */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Others</h3>
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-3 group">
                <div className="bg-white p-2 rounded-full transition-transform group-hover:scale-105">
                  <FileText size={20} className="text-black" />
                </div>
                <span className="text-gray-300 group-hover:text-white font-medium">Resume</span>
              </a>
              <a href="mailto:contact@themukesh.com" className="flex items-center gap-3 group">
                <div className="bg-white p-2 rounded-full transition-transform group-hover:scale-105">
                  <Mail size={20} className="text-black" />
                </div>
                <span className="text-gray-300 group-hover:text-white font-medium truncate">contact@themukesh.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only Bottom Footer (outside the box as per your mobile screenshot) */}
      <div className="md:hidden flex justify-between items-center px-4 mt-4 text-xs text-gray-400 font-medium">
        <span>Mukesh Murugaiyan © 2025</span>
        <span>Bengalore, India</span>
      </div>
    </footer>
  );
};

export default Footer;