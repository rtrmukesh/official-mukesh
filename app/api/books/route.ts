import { NextRequest, NextResponse } from "next/server";

// 1️⃣ Book type for frontend
type Book = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  downloads: number;
  pdf: string;
};

// 2️⃣ API response type
type BooksApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  page: number;
  pageSize: number;
  books: Book[];
};

// 3️⃣ Gutendex API raw book type
type GutendexBook = {
  id: number;
  title: string;
  summaries?: string[];
  bookshelves?: string[];
  formats: { [key: string]: string };
  download_count: number;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1); // default page 1
  const pageSize = 20;

  const res = await fetch(
    `https://gutendex.com/books/?page=${page}&page_size=${pageSize}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }

  const data = await res.json();

  // Map Gutendex results to simplified Book structure
  const books: Book[] = (data.results as GutendexBook[]).map((book) => {
    const id = book.id;
    const slug = id + "-" + book.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    return {
      id,
      slug,
      title: book.title,
      description: book.summaries?.[0] || book.bookshelves?.[0] || "Free public domain book",
      image: book.formats["image/jpeg"] || "/favicon.ico",
      downloads: book.download_count,
      pdf:
        book.formats["application/epub+zip"] ||
        book.formats["application/octet-stream"] ||
        "",
    };
  });

  const response: BooksApiResponse = {
    count: data.count,
    next: data.next,
    previous: data.previous,
    page,
    pageSize,
    books,
  };

  return NextResponse.json(response);
}
