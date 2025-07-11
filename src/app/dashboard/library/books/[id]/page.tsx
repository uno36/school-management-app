"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Import useParams
import Link from "next/link";
import Image from "next/image";

// --- Mock Shadcn UI Component Mockups ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const variantClasses = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline:
        "border border-blue-400 bg-transparent text-blue-600 hover:bg-blue-50",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      link: "text-blue-600 underline-offset-4 hover:underline",
    };
    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };
    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
// --- End Shadcn UI Component Mockups ---

interface BookDetails {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  publicationYear: string;
  publisher: string;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverImageUrl: string;
  status: "Available" | "Borrowed" | "Lost" | "Reserved";
}

// Mock data
const allMockBookData: BookDetails[] = [
  {
    id: "B001",
    title: "The Great Adventures",
    author: "A.B. Author",
    isbn: "978-1234567890",
    genre: "Adventure",
    publicationYear: "2010",
    publisher: "Adventure House",
    totalCopies: 5,
    availableCopies: 3,
    description:
      "A thrilling tale of exploration and discovery across uncharted lands.",
    coverImageUrl:
      "https://placehold.co/150x200/aabbcc/ffffff?text=Book+Cover+1",
    status: "Available",
  },
  {
    id: "B002",
    title: "Science for Kids",
    author: "Dr. S. Scientist",
    isbn: "978-0987654321",
    genre: "Education",
    publicationYear: "2022",
    publisher: "Knowledge Publishers",
    totalCopies: 10,
    availableCopies: 8,
    description:
      "An engaging introduction to scientific concepts for young learners.",
    coverImageUrl:
      "https://placehold.co/150x200/ccbbaa/ffffff?text=Book+Cover+2",
    status: "Available",
  },
  {
    id: "B003",
    title: "History of the World",
    author: "H. Historian",
    isbn: "978-1122334455",
    genre: "History",
    publicationYear: "2005",
    publisher: "Ancient Texts Co.",
    totalCopies: 3,
    availableCopies: 0,
    description:
      "A comprehensive overview of global history from ancient times to the modern era.",
    coverImageUrl:
      "https://placehold.co/150x200/ccddff/ffffff?text=Book+Cover+3",
    status: "Borrowed",
  },
  {
    id: "B004",
    title: "Math Fundamentals",
    author: "M. Mathematician",
    isbn: "978-9988776655",
    genre: "Education",
    publicationYear: "2018",
    publisher: "Numeric Press",
    totalCopies: 7,
    availableCopies: 7,
    description:
      "Essential mathematical principles explained with clear examples and exercises.",
    coverImageUrl:
      "https://placehold.co/150x200/ddeeff/ffffff?text=Book+Cover+4",
    status: "Available",
  },
];

export default function BookDetailsPage() {
  const params = useParams();
  const bookId = Array.isArray(params.id) ? params.id[0] : params.id; // ✅ Get ID from route param

  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookData = async () => {
      setLoading(true);
      setError(null);

      if (!bookId) {
        setError("No Book ID provided in the URL.");
        setLoading(false);
        return;
      }

      try {
        const foundBook = allMockBookData.find((b) => b.id === bookId);
        if (foundBook) {
          setBook(foundBook);
        } else {
          setError(`Book with ID "${bookId}" not found.`);
        }
      } catch (err) {
        setError("Failed to load book data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [bookId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading book details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Book not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Book Details: {book.title}
          </h1>
          <Link href={`/dashboard/library/books/${book.id}/edit`}>
            <Button variant="outline" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit Book
            </Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <Image
            width={200}
            height={200}
            src={
              book.coverImageUrl ||
              "https://placehold.co/150x200/cccccc/333333?text=No+Cover"
            }
            alt={`${book.title} Cover`}
            className="w-36 h-48 object-cover rounded-md shadow-md flex-shrink-0"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/150x200/cccccc/333333?text=No+Cover";
            }}
          />
          <div className="text-center md:text-left flex-grow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {book.title}
            </h2>
            <p className="text-lg text-gray-700 mb-1">
              by <span className="font-medium">{book.author}</span>
            </p>
            <p className="text-md text-gray-600 mb-1">
              ISBN: <span className="font-medium">{book.isbn}</span>
            </p>
            <p className="text-md text-gray-600 mb-1">
              Genre: <span className="font-medium">{book.genre}</span>
            </p>
            <p className="text-md text-gray-600 mb-1">
              Published:{" "}
              <span className="font-medium">{book.publicationYear}</span> by{" "}
              <span className="font-medium">{book.publisher}</span>
            </p>
            <p className="text-md text-gray-600 mt-2">
              Copies:{" "}
              <span className="font-medium">{book.availableCopies}</span> /{" "}
              <span className="font-medium">{book.totalCopies}</span> available
            </p>
            <p className="text-md text-gray-600">
              Status:{" "}
              <span
                className={`font-semibold ${
                  book.status === "Available"
                    ? "text-green-700"
                    : book.status === "Borrowed"
                    ? "text-yellow-700"
                    : book.status === "Lost"
                    ? "text-red-700"
                    : "text-gray-700"
                }`}
              >
                {book.status}
              </span>
            </p>
          </div>
        </div>

        <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Description
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {book.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
}
