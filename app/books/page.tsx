import { ArrowLeft, ArrowRight, BookOpen, Calendar, Download, Eye, Star } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Free PDF Downloads | Public Domain Books",
  description: "Download free public domain PDF books with images, descriptions, and download counts.",
};

// 1️⃣ Types for a Book
type Book = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  downloads: number;
  pdf: string;
};

// 2️⃣ Type for API Response
type BooksApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  page: number;
  pageSize: number;
  books: Book[];
};

// 3️⃣ Helper to fetch books for a given page
async function getBooks(page = 1): Promise<BooksApiResponse> {
  const res = await fetch(`http://localhost:3000/api/books?page=${page}`, { cache: "no-store" });
  return res.json();
}

// 4️⃣ Props type for Home Page
type HomeProps = {
  searchParams?: { page?: string };
};

export default async function Home({ searchParams }: HomeProps) {
  const page = Number(searchParams?.page) || 1;
  const data = await getBooks(page);
  const { books, count } = data;
  const totalPages = Math.ceil(count / 20);

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              Discover <span className="text-yellow-300">Free</span> Public Domain Treasures
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Thousands of classic books available as free PDF downloads. No signup required.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <BookOpen size={20} />
                <span>{count.toLocaleString()} Books</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Download size={20} />
                <span>Free Downloads</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Eye size={20} />
                <span>HD Quality</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Books Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Featured <span className="text-blue-600">Books</span>
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>Page {page} of {totalPages}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {books.map((book: Book) => (
            <article
              key={book.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
            >
              {/* Popular Badge */}
              {book.downloads > 10000 && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-1 bg-linear-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    <Star size={12} />
                    <span>POPULAR</span>
                  </div>
                </div>
              )}

              {/* Book Cover */}
              <div className="relative h-64 md:h-72 overflow-hidden bg-linear-to-br from-blue-50 to-purple-50">
                <Link href={`/books/${book.slug}`}>
                  <div className="relative w-full h-full">
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </div>

              {/* Book Info */}
              <div className="p-5 md:p-6">
                <Link href={`/books/${book.slug}`}>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {book.description}
                </p>
                
                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Download size={16} />
                    <span className="font-semibold text-gray-700">{book.downloads.toLocaleString()}</span>
                  </div>
                  <Link
                    href={`/books/${book.slug}`}
                    className="inline-flex items-center gap-2 bg-linear-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-semibold"
                  >
                    <BookOpen size={16} />
                    Read Now
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Enhanced Pagination */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing {(page - 1) * 20 + 1} - {Math.min(page * 20, count)} of {count.toLocaleString()} books
            </div>
            
            <div className="flex items-center gap-2">
              <Link
                href={`/books?page=${page - 1}`}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${
                  page <= 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg border border-gray-200'
                }`}
                aria-disabled={page <= 1}
              >
                <ArrowLeft size={18} />
                <span className="font-semibold">Previous</span>
              </Link>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  if (pageNum > totalPages) return null;

                  return (
                    <Link
                      key={pageNum}
                      href={`/books?page=${pageNum}`}
                      className={`w-12 h-12 flex items-center justify-center rounded-xl font-semibold transition-all duration-300 ${
                        page === pageNum
                          ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-200'
                      }`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
              </div>

              <Link
                href={`/books?page=${page + 1}`}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${
                  page >= totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg border border-gray-200'
                }`}
                aria-disabled={page >= totalPages}
              >
                <span className="font-semibold">Next</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-blue-50 via-white to-purple-50 border-t border-gray-200">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Start Your Reading Journey Today
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            All books are in the public domain and completely free to download. No subscriptions, no fees.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/books?page=1"
              className="inline-flex items-center gap-3 bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 text-lg font-semibold"
            >
              <BookOpen size={22} />
              Browse All Books
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 text-lg font-semibold border border-gray-300"
            >
              <Download size={22} />
              How to Download
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}