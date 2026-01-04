import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Download, Eye, Calendar, User, BookOpen, Star, Clock, Share2 } from 'lucide-react';

function getIdFromSlug(slug: string) {
  return slug.split("-")[0];
}

async function getBookById(id: string) {
  const res = await fetch(`https://gutendex.com/books/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  const book = await res.json();
  return {
    id: book.id,
    title: book.title,
    description: book.summaries?.[0] || book.bookshelves?.[0] || "Free public domain book",
    image: book.formats["image/jpeg"] || "/favicon.ico",
    downloads: book.download_count,
    pdf: book.formats["application/epub+zip"] || book.formats["application/octet-stream"] || "",
    author: book.authors?.[0]?.name || "Unknown Author",
    languages: book.languages || [],
    subjects: book.subjects || [],
    copyright: book.copyright || false
  };
}

export async function generateMetadata({ params }: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const id = getIdFromSlug(slug);
  const book = await getBookById(id);
  
  if (!book) return { 
    title: "Book Not Found",
    description: "The requested book could not be found." 
  };

  return {
    title: `${book.title} | Free PDF Download`,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      images: [book.image],
      type: 'book',
    },
    twitter: {
      card: 'summary_large_image',
      title: book.title,
      description: book.description,
      images: [book.image],
    }
  };
}

export default async function BookDetail({ params }: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const id = getIdFromSlug(slug);
  const book = await getBookById(id);
  
  if (!book) return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-white flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Book Not Found</h1>
        <p className="text-gray-600 mb-8">The book you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
        >
          <ArrowLeft size={20} />
          Back to Library
        </Link>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-semibold">Back to Library</span>
            </Link>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Book Header */}
          <div className="bg-linear-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 rounded-3xl p-6 md:p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Book Cover */}
              <div className="md:col-span-1">
                <div className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                  {book.downloads > 50000 && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 bg-linear-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        <Star size={14} fill="white" />
                        <span>BESTSELLER</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Book Info */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    {book.title}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <User size={20} />
                      <span className="font-semibold">{book.author}</span>
                    </div>
                    <div className="h-4 w-px bg-gray-300"></div>
                    <div className="flex items-center gap-2">
                      <Eye size={20} />
                      <span className="font-semibold">{book.downloads.toLocaleString()} downloads</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  {book.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Download size={18} />
                      <span className="text-sm">Downloads</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{book.downloads.toLocaleString()}</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <BookOpen size={18} />
                      <span className="text-sm">Format</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">PDF</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Calendar size={18} />
                      <span className="text-sm">Status</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">Free</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Clock size={18} />
                      <span className="text-sm">License</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">Public Domain</div>
                  </div>
                </div>

                {/* Download Button */}
                <div className="pt-6">
                  <a
                    href={book.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="group inline-flex items-center gap-3 bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 text-lg font-semibold w-full md:w-auto justify-center"
                  >
                    <Download size={24} className="group-hover:animate-bounce" />
                    <span>Download Free PDF ({Math.floor(Math.random() * 5) + 1}MB)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Subjects */}
            {book.subjects.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Subjects</h3>
                <div className="flex flex-wrap gap-2">
                  {book.subjects.slice(0, 5).map((subject: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {book.languages.map((lang: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium"
                  >
                    {lang.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Copyright Status</h3>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${book.copyright ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <span className="text-lg font-semibold">
                  {book.copyright ? 'Copyrighted' : 'Public Domain'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-2">
                {book.copyright 
                  ? 'This book is protected by copyright'
                  : 'This book is free to use, share, and modify'}
              </p>
            </div>
          </div>

          {/* Related Books Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Link
                  key={i}
                  href={`/books/${i}-sample-book`}
                  className="group bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="aspect-3/4 rounded-lg overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 mb-3"></div>
                  <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    Sample Book {i}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">Author Name</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Discover More Free Books
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Browse our entire collection of public domain books. All completely free.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-linear-to-r from-gray-900 to-black text-white px-8 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 text-lg font-semibold"
            >
              <BookOpen size={22} />
              Explore Full Library
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}