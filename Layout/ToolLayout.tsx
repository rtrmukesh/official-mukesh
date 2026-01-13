import Image from "next/image";
import { ReactNode } from "react";
import {
  FaDownload,
  FaFilePdf,
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
      color: "text-gray-800",
    },
    {
      icon: <FaInstagram />,
      label: "Instagram",
      url: "https://www.instagram.com/rtr_mukesh_/",
      color: "text-pink-600",
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/mukesh-murugaiyan",
      color: "text-blue-700",
    },
    {
      icon: <FaTwitter />,
      label: "Twitter",
      url: "https://twitter.com/username",
      color: "text-blue-400",
    },
  ];

  // PDF List Data
  const pdfList = [
    {
      id: 1,
      title: "Complete Guide to Modern Web Development",
      description:
        "A comprehensive guide covering React, Next.js, Tailwind CSS, and best practices for 2024.",
      size: "4.2 MB",
      pages: 42,
      downloads: 1247,
      rating: 4.8,
      category: "Web Development",
      date: "2024-01-15",
      featured: true,
    },
    {
      id: 2,
      title: "React TypeScript Best Practices",
      description:
        "Learn how to write clean, type-safe React code with TypeScript.",
      size: "2.8 MB",
      pages: 28,
      downloads: 892,
      rating: 4.7,
      category: "React",
      date: "2024-01-10",
      featured: false,
    },
    {
      id: 3,
      title: "Next.js 14 Complete Reference",
      description:
        "Master server components, app router, and new features in Next.js 14.",
      size: "3.5 MB",
      pages: 35,
      downloads: 1563,
      rating: 4.9,
      category: "Next.js",
      date: "2024-01-05",
      featured: true,
    },
    {
      id: 4,
      title: "Tailwind CSS Pro Tips",
      description:
        "Advanced techniques and patterns for professional Tailwind CSS usage.",
      size: "1.9 MB",
      pages: 19,
      downloads: 743,
      rating: 4.6,
      category: "CSS",
      date: "2024-01-01",
      featured: false,
    },
    {
      id: 5,
      title: "Full Stack Authentication Guide",
      description:
        "Implement secure authentication in Next.js with Auth.js and Prisma.",
      size: "3.2 MB",
      pages: 32,
      downloads: 1124,
      rating: 4.8,
      category: "Security",
      date: "2023-12-28",
      featured: true,
    },
    {
      id: 6,
      title: "Mobile App Development with React Native",
      description:
        "Build cross-platform mobile apps using React Native and Expo.",
      size: "4.8 MB",
      pages: 48,
      downloads: 967,
      rating: 4.7,
      category: "Mobile",
      date: "2023-12-25",
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <FaFilePdf className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Mukesh&apos;s Resources
                </h1>
                <p className="text-sm text-gray-600">
                  Download premium development guides
                </p>
              </div>
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-all hover:shadow-lg hover:scale-105">
              <span className="flex items-center gap-2">
                <FaDownload />
                Upload PDF
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Profile */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8 border">
              {/* Profile Image */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
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
                  <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {userProfile.name}
                </h2>
                <p className="text-gray-600 mt-1">{userProfile.title}</p>
                <p className="text-gray-500 text-sm mt-3 px-2">
                  {userProfile.bio}
                </p>

                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <MdEmail className="text-blue-500" />
                    <a
                      href={`mailto:${userProfile.email}`}
                      className="hover:underline"
                    >
                      {userProfile.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <MdLocationOn className="text-red-500" />
                    <span>{userProfile.location}</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Connect With Me
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className={`flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg border hover:shadow-md transition-all hover:scale-105 ${link.color}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span className="font-medium">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {pdfList
                      .reduce((sum, pdf) => sum + pdf.downloads, 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {pdfList.length}
                  </div>
                  <div className="text-sm text-gray-600">PDFs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {(
                      pdfList.reduce((sum, pdf) => sum + pdf.rating, 0) /
                      pdfList.length
                    ).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - PDF List */}
          <div className="lg:w-2/3">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default ToolLayout;
