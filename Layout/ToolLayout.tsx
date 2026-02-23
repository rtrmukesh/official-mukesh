import Image from "next/image";
import { ReactNode } from "react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

type ToolLayoutProps = {
  children: ReactNode;
};

const ToolLayout = ({ children }: ToolLayoutProps) => {
  const userProfile = {
    name: "Mukesh Murugaiyan",
    title: "Full Stack Developer",
    bio: "I build Web, Android, iOS & Desktop applications with modern tech stacks.",
    email: "contact@themukesh.com",
    location: "Bangalore, India",
  };

  const socialLinks = [
    {
      icon: <FaGithub />,
      label: "GitHub",
      url: "https://github.com/rtrmukesh",
      color: "text-white group-hover:text-gray-300",
    },
    {
      icon: <FaInstagram />,
      label: "Instagram",
      url: "https://www.instagram.com/rtr_mukesh_/",
      color: "text-pink-500 group-hover:text-pink-400",
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/mukesh-murugaiyan",
      color: "text-blue-500 group-hover:text-blue-400",
    },
    {
      icon: <FaTwitter />,
      label: "Twitter",
      url: "https://twitter.com/username",
      color: "text-blue-400 group-hover:text-blue-300",
    },
  ];

  // PDF List Data
  const pdfList = [
    { id: 1, downloads: 1247, rating: 4.8 },
    { id: 2, downloads: 892, rating: 4.7 },
    { id: 3, downloads: 1563, rating: 4.9 },
    { id: 4, downloads: 743, rating: 4.6 },
    { id: 5, downloads: 1124, rating: 4.8 },
    { id: 6, downloads: 967, rating: 4.7 },
  ];

  const cardBaseClass = "rounded-3xl border border-white/10 backdrop-blur-sm bg-[#111111] p-6 flex flex-col gap-4";

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column - Profile */}
          <div className="lg:w-1/3">
            <div className={`${cardBaseClass} sticky top-8`}>
              
              {/* Profile Image */}
              <div className="flex justify-center mb-2">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-1">
                    <div className="w-full h-full rounded-full bg-[#111111] flex items-center justify-center overflow-hidden">
                      <Image
                        src="/icon1.png"
                        alt="Profile"
                        width={128}
                        height={128}
                        className="rounded-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-[#111111] flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">✓</span>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white">
                  {userProfile.name}
                </h2>
                <p className="text-indigo-400 font-medium mt-1">{userProfile.title}</p>
                <p className="text-gray-400 text-sm mt-3 px-2 leading-relaxed">
                  {userProfile.bio}
                </p>

                <div className="flex flex-col gap-3 mt-6">
                  <div className="flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors group">
                    <MdEmail className="text-gray-500 group-hover:text-indigo-400 transition-colors" />
                    <a href={`mailto:${userProfile.email}`} className="text-sm">
                      {userProfile.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <MdLocationOn className="text-gray-500" />
                    <span className="text-sm">{userProfile.location}</span>
                  </div>
                </div>
              </div>

              <hr className="border-white/10 my-2" />

              {/* Social Links */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider text-center">
                  Connect With Me
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="group flex flex-col items-center justify-center gap-2 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className={`text-2xl transition-colors ${link.color}`}>{link.icon}</span>
                      <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 mt-2 border-t border-white/10">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">
                    {pdfList.reduce((sum, pdf) => sum + pdf.downloads, 0).toLocaleString()}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">
                    {pdfList.length}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">
                    {(
                      pdfList.reduce((sum, pdf) => sum + pdf.rating, 0) /
                      pdfList.length
                    ).toFixed(1)}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">Rating</div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Tool Content */}
          <div className="lg:w-2/3">
            {children}
          </div>

        </div>
      </main>
    </div>
  );
};

export default ToolLayout;
