"use client";
import { usePDF } from "@/hooks/usePDF";
import { formatDateTime } from "@/lib/DateTime";
import { useState } from "react";
import {
  FaCalendar,
  FaDownload,
  FaEdit,
  FaEye,
  FaFilePdf,
  FaFilter,
  FaPlus,
  FaSort,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import PdfDrawerForm from "./components/PdfDrawerForm";

type PDF = {
  id: number;
  title: string;
  date: string;
  description: string;
  category: string;
  downloads: number;
  status: string;
  size: string;
};

type PdfDataType = {
  id: string;
  name: string;
  description: string;
  category: string;
  size: string;
  file_path: string;
  object_name: string;
  owner_id: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

const PDFManageTab = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data, isLoading, error, refetch } = usePDF();
  console.log("isLoading>>>------------------------> ", isLoading);
  console.log("data>>>------------------------> ", data);
  const pdfs = [
    {
      id: 1,
      title: "Complete React Guide",
      category: "React",
      downloads: 1247,
      status: "published",
      size: "4.2 MB",
      date: "2024-01-15",
      featured: true,
      description: "A comprehensive guide to React development",
    },
    {
      id: 2,
      title: "Next.js 14 Tutorial",
      category: "Next.js",
      downloads: 892,
      status: "published",
      size: "3.8 MB",
      date: "2024-01-14",
      featured: true,
      description: "Learn Next.js 14 features and best practices",
    },
    {
      id: 3,
      title: "TypeScript Handbook",
      category: "TypeScript",
      downloads: 745,
      status: "published",
      size: "2.9 MB",
      date: "2024-01-13",
      featured: false,
      description: "Master TypeScript from basics to advanced",
    },
    {
      id: 4,
      title: "Tailwind CSS Pro",
      category: "CSS",
      downloads: 1563,
      status: "draft",
      size: "1.9 MB",
      date: "2024-01-12",
      featured: true,
      description: "Advanced Tailwind CSS techniques",
    },
    {
      id: 5,
      title: "Node.js Backend",
      category: "Node.js",
      downloads: 1124,
      status: "published",
      size: "5.1 MB",
      date: "2024-01-11",
      featured: false,
      description: "Build scalable backend APIs with Node.js",
    },
    {
      id: 6,
      title: "Database Design",
      category: "Database",
      downloads: 638,
      status: "archived",
      size: "3.2 MB",
      date: "2024-01-10",
      featured: false,
      description: "Database design principles and patterns",
    },
    {
      id: 7,
      title: "Mobile Development",
      category: "Mobile",
      downloads: 432,
      status: "published",
      size: "4.8 MB",
      date: "2024-01-09",
      featured: true,
      description: "Cross-platform mobile app development",
    },
    {
      id: 8,
      title: "DevOps Guide",
      category: "DevOps",
      downloads: 321,
      status: "draft",
      size: "6.2 MB",
      date: "2024-01-08",
      featured: false,
      description: "DevOps practices and tools",
    },
  ];

  const categories = [
    { name: "ReactJS", count: 0, color: "bg-sky-100 text-sky-800" },
    { name: "NodeJS", count: 0, color: "bg-green-100 text-green-800" },
    { name: "NextJS", count: 0, color: "bg-gray-100 text-gray-900" },
    { name: "ExpressJS", count: 0, color: "bg-lime-100 text-lime-800" },

    { name: "JavaScript", count: 0, color: "bg-yellow-100 text-yellow-800" },
    { name: "TypeScript", count: 0, color: "bg-blue-100 text-blue-800" },

    { name: "HTML", count: 0, color: "bg-orange-100 text-orange-800" },
    { name: "CSS", count: 0, color: "bg-purple-100 text-purple-800" },
    { name: "TailwindCSS", count: 0, color: "bg-cyan-100 text-cyan-800" },

    { name: "MongoDB", count: 0, color: "bg-emerald-100 text-emerald-800" },
    { name: "MySQL", count: 0, color: "bg-indigo-100 text-indigo-800" },
    { name: "PostgreSQL", count: 0, color: "bg-blue-100 text-blue-900" },
    { name: "Firebase", count: 0, color: "bg-amber-100 text-amber-800" },

    { name: "RESTAPI", count: 0, color: "bg-rose-100 text-rose-800" },
    { name: "Authentication", count: 0, color: "bg-red-100 text-red-800" },
    { name: "SystemDesign", count: 0, color: "bg-violet-100 text-violet-800" },
    { name: "Deployment", count: 0, color: "bg-slate-100 text-slate-800" },
  ];

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "active",
      downloads: 142,
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      role: "User",
      status: "active",
      downloads: 89,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Premium",
      status: "active",
      downloads: 256,
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@example.com",
      role: "User",
      status: "inactive",
      downloads: 34,
    },
    {
      id: 5,
      name: "Alex Brown",
      email: "alex@example.com",
      role: "Premium",
      status: "active",
      downloads: 178,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800";
      case "Premium":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  // Mobile PDF Card Component
  const MobilePDFCard = ({ pdf }: { pdf: PDF }) => (
    <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FaFilePdf className="text-red-500" />
            <h3 className="font-bold text-gray-800 text-lg">{pdf.title}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaCalendar className="text-gray-400" />
            {pdf.date}
          </div>
        </div>
        <button
          onClick={() =>
            setIsMobileMenuOpen(
              isMobileMenuOpen === pdf.id.toString() ? null : pdf.id.toString()
            )
          }
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <MdMoreVert className="text-gray-500" />
        </button>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isMobileMenuOpen === pdf.id.toString() && (
        <div className="absolute right-4 mt-2 w-40 bg-white rounded-lg shadow-lg border z-10">
          <div className="py-1">
            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <FaEdit className="text-blue-600" />
              Edit
            </button>
            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <FaEye className="text-green-600" />
              View
            </button>
            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <FaDownload className="text-purple-600" />
              Download
            </button>
            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50">
              <FaTrash className="text-red-600" />
              Delete
            </button>
          </div>
        </div>
      )}

      <div className="mb-3">
        <p className="text-gray-600 text-sm">{pdf.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 p-2 rounded-lg">
          <div className="text-xs text-gray-500">Category</div>
          <div className="font-medium text-gray-800">{pdf.category}</div>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg">
          <div className="text-xs text-gray-500">Size</div>
          <div className="font-medium text-gray-800">{pdf.size}</div>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg">
          <div className="text-xs text-gray-500">Downloads</div>
          <div className="font-medium text-gray-800">
            {pdf.downloads.toLocaleString()}
          </div>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg">
          <div className="text-xs text-gray-500">Status</div>
          <div>
            <span
              className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                pdf.status
              )}`}
            >
              {pdf.status.charAt(0).toUpperCase() + pdf.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm">
          <div className="flex items-center justify-center gap-2">
            <FaEdit />
            Edit
          </div>
        </button>
        <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-sm">
          <div className="flex items-center justify-center gap-2">
            <FaEye />
            View
          </div>
        </button>
      </div>
    </div>
  );

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  const pdfData: PdfDataType[] = data?.data || [];

  return (
    <>
      <PdfDrawerForm
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        refetch={refetch}
      />

      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">PDF Management</h1>
            <p className="text-gray-600 mt-1">Manage all your PDF resources</p>
          </div>
          <button
            className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2 w-full sm:w-auto"
            onClick={() => setIsDrawerOpen(true)}
          >
            <FaPlus />
            Add New PDF
          </button>
        </div>

        {/* Filter Controls - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search PDFs..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <button className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition flex items-center justify-center">
              <FaFilter />
            </button>
          </div>
        </div>

        {/* Stats Cards - Mobile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-sm text-gray-600 mb-1">Total PDFs</div>
            <div className="text-2xl font-bold text-gray-800">
              {data?.data?.length || 0}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-sm text-gray-600 mb-1">Published</div>
            <div className="text-2xl font-bold text-green-600">
              {pdfs.filter((p) => p.status === "published").length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-sm text-gray-600 mb-1">Total Size</div>
            <div className="text-2xl font-bold text-blue-600">48.2 MB</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-sm text-gray-600 mb-1">Downloads</div>
            <div className="text-2xl font-bold text-purple-600">6,567</div>
          </div>
        </div>
      </div>

      {/* PDF Management Section */}
      <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6 mb-6">
        {/* Desktop Table - Hidden on Mobile */}
        <div className="hidden md:block">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">PDF List</h2>
              <p className="text-gray-600 text-sm">
                Showing {data?.data?.length || 0} PDFs
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">
                    <button className="flex items-center gap-1 font-semibold text-gray-700">
                      Title <FaSort className="text-gray-400" />
                    </button>
                  </th>
                  <th className="text-left py-3 px-4">
                    <button className="flex items-center gap-1 font-semibold text-gray-700">
                      Category <FaSort className="text-gray-400" />
                    </button>
                  </th>
                  {/* <th className="text-left py-3 px-4">
                    <button className="flex items-center gap-1 font-semibold text-gray-700">
                      Downloads <FaSort className="text-gray-400" />
                    </button>
                  </th> */}
                  {/* <th className="text-left py-3 px-4">
                    <button className="flex items-center gap-1 font-semibold text-gray-700">
                      Status <FaSort className="text-gray-400" />
                    </button>
                  </th> */}
                  <th className="text-left py-3 px-4 text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pdfData.map((pdf) => (
                  <tr
                    key={pdf.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-800 flex items-center gap-2">
                          <FaFilePdf className="text-red-500" />
                          {pdf.name}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                          <FaCalendar className="text-gray-400" />
                          {formatDateTime(pdf.createdAt)} • {pdf.size}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          categories.find((c) => c.name === pdf.category)
                            ?.color || "bg-gray-100"
                        }`}
                      >
                        {pdf.category}
                      </span>
                    </td>
                    {/* <td className="py-4 px-4">
                      <div className="font-medium flex items-center gap-2">
                        <FaDownload className="text-gray-400" />
                        {pdf.downloads.toLocaleString()}
                      </div>
                    </td> */}
                    {/* <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          pdf.status
                        )}`}
                      >
                        {pdf.status.charAt(0).toUpperCase() +
                          pdf.status.slice(1)}
                      </span>
                    </td> */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards - Hidden on Desktop */}
        <div className="md:hidden">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800">PDF List</h2>
            <p className="text-gray-600 text-sm">Showing {pdfs.length} PDFs</p>
          </div>
          <div className="space-y-4">
            {pdfs.map((pdf) => (
              <MobilePDFCard key={pdf.id} pdf={pdf} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Stats - Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Categories - Mobile Friendly */}
        <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Categories</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      category.color.split(" ")[0]
                    }`}
                  ></div>
                  <span className="font-medium">{category.name}</span>
                </div>
                <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded text-sm">
                  {category.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Upload - Mobile Optimized */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100 p-4 md:p-6">
          <h3 className="font-bold text-gray-800 mb-4">Quick Upload</h3>
          <div className="border-2 border-dashed border-blue-200 rounded-xl p-6 md:p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUpload className="text-2xl md:text-3xl text-blue-500" />
            </div>
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              Drag & drop your PDF files here
            </p>
            <button className="px-4 py-2 md:px-6 md:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition text-sm md:text-base">
              Browse Files
            </button>
            <p className="text-sm text-gray-500 mt-4">Max file size: 50MB</p>
          </div>
        </div>

        {/* User Management - Mobile Friendly */}
        <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Recent Users</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {users.slice(0, 3).map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="font-bold text-blue-600">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm md:text-base">
                      {user.name}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 truncate max-w-[120px]">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2 py-1 rounded text-xs ${getRoleColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                  <p className="text-xs text-gray-600 mt-1">
                    {user.downloads} downloads
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center text-blue-600">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FaFilePdf />
            </div>
            <span className="text-xs mt-1">PDFs</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <div className="p-2 bg-gray-50 rounded-lg">
              <FaFilter />
            </div>
            <span className="text-xs mt-1">Filter</span>
          </button>
          <button className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full -mt-6 shadow-lg">
            <FaPlus className="text-xl" />
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <div className="p-2 bg-gray-50 rounded-lg">
              <FaUpload />
            </div>
            <span className="text-xs mt-1">Upload</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <div className="p-2 bg-gray-50 rounded-lg">
              <FaEye />
            </div>
            <span className="text-xs mt-1">View</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default PDFManageTab;
